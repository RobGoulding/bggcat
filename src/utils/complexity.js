export const COMPLEXITY_BANDS = ['Light', 'Medium', 'Heavy', 'Expert']

export function getComplexityLabel(value) {
  if (value < 2.0) return 'Light'
  if (value < 3.0) return 'Medium'
  if (value < 4.0) return 'Heavy'
  return 'Expert'
}

const COMPLEXITY_STYLES = {
  Light: 'bg-green-100 text-green-800',
  Medium: 'bg-amber-100 text-amber-800',
  Heavy: 'bg-orange-100 text-orange-800',
  Expert: 'bg-red-100 text-red-800',
}

export function getComplexityClasses(label) {
  return COMPLEXITY_STYLES[label] || ''
}

const STAR_COUNTS = { Light: 1, Medium: 2, Heavy: 3, Expert: 4 }

export function getComplexityStars(label) {
  return '\u2B50'.repeat(STAR_COUNTS[label] || 1)
}
