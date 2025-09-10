export function extractDatePart(dateStr: string): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return dateStr
  }

  if (dateStr.includes('T')) {
    return dateStr.split('T')[0]
  }

  return dateStr
}
