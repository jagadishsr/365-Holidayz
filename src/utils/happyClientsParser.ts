import type { HappyClientGalleryItem } from '../types';

export const HAPPY_CLIENTS_SHEET_ID = '14M2X50ABnzcOduPfWiNxBqGq7m7FCmy7C2lMTHwy3RY';
export const HAPPY_CLIENTS_SHEET_GID = '98817809';

export const HAPPY_CLIENTS_HTMLVIEW_URL = `https://docs.google.com/spreadsheets/d/${HAPPY_CLIENTS_SHEET_ID}/htmlview/sheet?headers=false&gid=${HAPPY_CLIENTS_SHEET_GID}`;
export const HAPPY_CLIENTS_CSV_URL = `https://docs.google.com/spreadsheets/d/${HAPPY_CLIENTS_SHEET_ID}/export?format=csv&gid=${HAPPY_CLIENTS_SHEET_GID}`;

interface ParsedSheetCell {
  text: string;
  imageUrl?: string;
}

function decodeHtmlEntities(input: string): string {
  return input
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&nbsp;/gi, ' ')
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(Number(dec)))
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
}

function cleanText(value?: string): string {
  return (value || '').replace(/\s+/g, ' ').trim();
}

export function normalizeHappyClientImageUrl(raw?: string): string | undefined {
  let val = cleanText(decodeHtmlEntities(raw || ''));
  if (!val) return undefined;

  // Unwrap Google htmlview redirect links if present
  if (/^https?:\/\/(?:www\.)?google\.com\/url\?/i.test(val)) {
    try {
      const parsed = new URL(val);
      const q = parsed.searchParams.get('q') || parsed.searchParams.get('url');
      if (q) val = cleanText(q);
    } catch {
      // Keep original value if URL constructor fails
    }
  }

  if (!/^https?:\/\//i.test(val)) return undefined;

  // Upgrade Google Sheets in-cell thumbnail dimensions (e.g. =w100-h125 -> =w1600) for crisp gallery rendering
  if (/docs\.google\.com\/sheets-images-rt\//i.test(val)) {
    if (/=[ws]\d+(?:-h\d+)?$/i.test(val)) {
      return val.replace(/=[ws]\d+(?:-h\d+)?$/i, '=w1600');
    }
    return `${val}=w1600`;
  }

  // Convert Google Drive share URLs into direct embeddable thumbnail URLs
  const driveFileMatch = val.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveFileMatch?.[1]) {
    return `https://drive.google.com/thumbnail?id=${driveFileMatch[1]}&sz=w1600`;
  }
  const driveOpenMatch = val.match(/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/);
  if (driveOpenMatch?.[1]) {
    return `https://drive.google.com/thumbnail?id=${driveOpenMatch[1]}&sz=w1600`;
  }

  // Convert Pexels photo page URLs into direct CDN images
  const pexelsPhotoMatch = val.match(/pexels\.com\/photo\/(?:[^/]*-)?(\d+)\/?/i);
  if (pexelsPhotoMatch?.[1]) {
    const id = pexelsPhotoMatch[1];
    return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1400`;
  }

  return val;
}

function isImageLabel(label: string): boolean {
  const normalized = cleanText(label).toLowerCase();
  return /^(?:image\s*url|img\s*url|photo\s*url|image|photo|picture|url)$/.test(normalized);
}

function isTitleLabel(label: string): boolean {
  const normalized = cleanText(label).toLowerCase();
  return /^(?:title|client\s*title|heading|trip\s*title|tour\s*title|caption\s*title)$/.test(normalized);
}

function isDescriptionLabel(label: string): boolean {
  const normalized = cleanText(label).toLowerCase();
  return /^(?:description|desc|details|story|caption|notes|summary)$/.test(normalized);
}

function parseCellMatrixIntoItems(matrix: ParsedSheetCell[][]): HappyClientGalleryItem[] {
  if (matrix.length === 0) return [];

  const items: HappyClientGalleryItem[] = [];
  const seenKeys = new Set<string>();

  // Strategy 1: Horizontal matrix (Row 1 = slot names img1..imgN, Row 2 = Image URL, Row 3 = Title, Row 4 = Description)
  const usedRows = new Set<number>();
  for (let r = 0; r < matrix.length; r++) {
    const firstLabel = cleanText(matrix[r]?.[0]?.text);
    const hasEmbeddedImagesInRow = matrix[r].slice(1).some((cell) => Boolean(cell.imageUrl));
    if (!isImageLabel(firstLabel) && !hasEmbeddedImagesInRow) continue;

    usedRows.add(r);

    // Search nearby subsequent rows (or header/adjacent rows) for Title and Description labels
    let titleRowIdx = -1;
    let descRowIdx = -1;
    for (let look = Math.max(0, r - 1); look <= Math.min(matrix.length - 1, r + 4); look++) {
      if (look === r) continue;
      const lbl = cleanText(matrix[look]?.[0]?.text);
      if (titleRowIdx === -1 && isTitleLabel(lbl)) {
        titleRowIdx = look;
        usedRows.add(look);
      } else if (descRowIdx === -1 && isDescriptionLabel(lbl)) {
        descRowIdx = look;
        usedRows.add(look);
      }
    }

    // Fallback positional inference if labels were slightly altered (Image row -> +1 Title -> +2 Description)
    if (titleRowIdx === -1 && r + 1 < matrix.length && !isImageLabel(matrix[r + 1]?.[0]?.text || '')) {
      titleRowIdx = r + 1;
      usedRows.add(r + 1);
    }
    if (descRowIdx === -1 && r + 2 < matrix.length && !isImageLabel(matrix[r + 2]?.[0]?.text || '')) {
      descRowIdx = r + 2;
      usedRows.add(r + 2);
    }

    // Find slot header row just above Image row if present (e.g. img1, img2...)
    const headerRowIdx = r > 0 && !usedRows.has(r - 1) ? r - 1 : -1;

    const maxCols = Math.max(
      matrix[r]?.length || 0,
      titleRowIdx !== -1 ? matrix[titleRowIdx]?.length || 0 : 0,
      descRowIdx !== -1 ? matrix[descRowIdx]?.length || 0 : 0
    );

    for (let c = 1; c < maxCols; c++) {
      const imgCell = matrix[r]?.[c];
      const imageUrl = normalizeHappyClientImageUrl(imgCell?.imageUrl || imgCell?.text);
      if (!imageUrl) continue;

      const slotLabel = headerRowIdx !== -1 ? cleanText(matrix[headerRowIdx]?.[c]?.text) : '';
      const rawTitle = titleRowIdx !== -1 ? cleanText(matrix[titleRowIdx]?.[c]?.text) : '';
      const rawDesc = descRowIdx !== -1 ? cleanText(matrix[descRowIdx]?.[c]?.text) : '';

      const title = rawTitle || `Client Journey ${items.length + 1}`;
      const description = rawDesc;
      const dedupeKey = `${imageUrl}|${title}`;
      if (seenKeys.has(dedupeKey)) continue;
      seenKeys.add(dedupeKey);

      items.push({
        id: `happy-client-${items.length + 1}`,
        slotLabel: slotLabel || undefined,
        imageUrl,
        title,
        description
      });
    }
  }

  if (items.length > 0) return items;

  // Strategy 2: Vertical table fallback (Header row has Image URL | Title | Description columns)
  const headerRowIdx = matrix.findIndex((row) =>
    row.some((cell) => isImageLabel(cell.text))
  );
  if (headerRowIdx !== -1) {
    const headerRow = matrix[headerRowIdx];
    const imgCol = headerRow.findIndex((c) => isImageLabel(c.text));
    const titleCol = headerRow.findIndex((c) => isTitleLabel(c.text));
    const descCol = headerRow.findIndex((c) => isDescriptionLabel(c.text));

    if (imgCol !== -1) {
      for (let r = headerRowIdx + 1; r < matrix.length; r++) {
        const imgCell = matrix[r]?.[imgCol];
        const imageUrl = normalizeHappyClientImageUrl(imgCell?.imageUrl || imgCell?.text);
        if (!imageUrl) continue;
        const title =
          (titleCol !== -1 ? cleanText(matrix[r]?.[titleCol]?.text) : '') ||
          `Client Journey ${items.length + 1}`;
        const description = descCol !== -1 ? cleanText(matrix[r]?.[descCol]?.text) : '';
        items.push({
          id: `happy-client-${items.length + 1}`,
          imageUrl,
          title,
          description
        });
      }
    }
  }

  return items;
}

export function parseHappyClientsHtml(html: string): HappyClientGalleryItem[] {
  const tbodyMatch = html.match(/<tbody[^>]*>([\s\S]*?)<\/tbody>/i);
  const bodyHtml = tbodyMatch ? tbodyMatch[1] : html;
  const rowMatches = bodyHtml.match(/<tr\b[^>]*>[\s\S]*?<\/tr>/gi);
  if (!rowMatches || rowMatches.length === 0) return [];

  const matrix: ParsedSheetCell[][] = [];

  for (const rowHtml of rowMatches) {
    const rowCells: ParsedSheetCell[] = [];
    const tdRegex = /<td\b([^>]*)>([\s\S]*?)<\/td>/gi;
    let tdMatch: RegExpExecArray | null;

    while ((tdMatch = tdRegex.exec(rowHtml)) !== null) {
      const attrs = tdMatch[1] || '';
      const innerHtml = tdMatch[2] || '';

      const imgSrcMatch = innerHtml.match(/<img\b[^>]*\bsrc=["']([^"']+)["']/i);
      const anchorHrefMatch = innerHtml.match(/<a\b[^>]*\bhref=["']([^"']+)["']/i);

      const strippedText = cleanText(
        decodeHtmlEntities(
          innerHtml
            .replace(/<br\s*\/?>/gi, ' ')
            .replace(/<[^>]+>/g, ' ')
        )
      );

      const candidateImage =
        normalizeHappyClientImageUrl(imgSrcMatch?.[1]) ||
        normalizeHappyClientImageUrl(anchorHrefMatch?.[1]) ||
        normalizeHappyClientImageUrl(strippedText);

      const cellData: ParsedSheetCell = {
        text: strippedText,
        imageUrl: candidateImage
      };

      const colspanMatch = attrs.match(/colspan=["']?(\d+)["']?/i);
      const colspan = Math.max(1, Number(colspanMatch?.[1] || 1));

      rowCells.push(cellData);
      for (let span = 1; span < colspan; span++) {
        rowCells.push({ text: '' });
      }
    }

    if (rowCells.length > 0) {
      matrix.push(rowCells);
    }
  }

  return parseCellMatrixIntoItems(matrix);
}

function parseCsvRows(csvText: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const ch = csvText[i];
    const next = csvText[i + 1];

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        field += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        field += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ',') {
        row.push(field.trim());
        field = '';
      } else if (ch === '\r' && next === '\n') {
        row.push(field.trim());
        rows.push(row);
        row = [];
        field = '';
        i++;
      } else if (ch === '\n' || ch === '\r') {
        row.push(field.trim());
        rows.push(row);
        row = [];
        field = '';
      } else {
        field += ch;
      }
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field.trim());
    rows.push(row);
  }

  return rows;
}

export function parseHappyClientsCsv(csvText: string): HappyClientGalleryItem[] {
  const rows = parseCsvRows(csvText);
  const matrix: ParsedSheetCell[][] = rows.map((r) =>
    r.map((cell) => {
      const text = cleanText(cell);
      return {
        text,
        imageUrl: normalizeHappyClientImageUrl(text)
      };
    })
  );
  return parseCellMatrixIntoItems(matrix);
}
