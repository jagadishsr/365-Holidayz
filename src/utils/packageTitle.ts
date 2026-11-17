export interface SplitPackageTitle {
  mainTitle: string;
  subTitle?: string;
}

/**
 * Splits two-part package titles (e.g. "Maafushi Year End Special — MAAFUSHI 3 nights/4days")
 * into a bold primary heading line and a smaller regular secondary subtitle line.
 */
export function splitPackageTitle(title: string): SplitPackageTitle {
  const cleaned = (title || '').replace(/\s+/g, ' ').trim();
  if (!cleaned) return { mainTitle: '' };

  const emDashIdx = cleaned.indexOf(' — ');
  if (emDashIdx > 0) {
    const left = cleaned.slice(0, emDashIdx).trim();
    const right = cleaned.slice(emDashIdx + 3).trim();
    if (left && right) return { mainTitle: left, subTitle: right };
  }

  const enDashIdx = cleaned.indexOf(' – ');
  if (enDashIdx > 0) {
    const left = cleaned.slice(0, enDashIdx).trim();
    const right = cleaned.slice(enDashIdx + 3).trim();
    if (left && right) return { mainTitle: left, subTitle: right };
  }

  const hyphenIdx = cleaned.indexOf(' - ');
  if (hyphenIdx > 2) {
    const left = cleaned.slice(0, hyphenIdx).trim();
    const right = cleaned.slice(hyphenIdx + 3).trim();
    if (left.length >= 3 && right.length >= 3) {
      return { mainTitle: left, subTitle: right };
    }
  }

  return { mainTitle: cleaned };
}
