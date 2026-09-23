export function formatCount(count: number): string {
  if (count === undefined || count === null) return '0';
  if (count >= 1_000_000) {
    const millions = (count / 1_000_000).toFixed(1);
    return (millions.endsWith('.0') ? millions.slice(0, -2) : millions) + 'M';
  }
  if (count >= 10_000) {
    const thousands = (count / 1_000).toFixed(1);
    return (thousands.endsWith('.0') ? thousands.slice(0, -2) : thousands) + 'K';
  }
  return count.toLocaleString('en-US');
}

export function formatCompactNumber(count: number): string {
  if (count >= 1_000_000) {
    return (count / 1_000_000).toFixed(1) + 'M';
  }
  if (count >= 1_000) {
    return (count / 1_000).toFixed(1) + 'K';
  }
  return count.toString();
}

