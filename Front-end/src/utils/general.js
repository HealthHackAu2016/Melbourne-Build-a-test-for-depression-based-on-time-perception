export function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1)
}

// abbreviate a string the first letter of the first 2 words
export function abbreviate(string) {
  if (!string) return ''
  let wordCount = string.split(' ').length
  if (wordCount < 2) {
    return string.substr(0, 2).toUpperCase()
  }
  return string.match(/\b\w/g).join('').substr(0, 2).toUpperCase()
}

export function truncateWithEllipses(n, useWordBoundary) {
  let isTooLong = this.length > n
  let s_ = isTooLong ? this.substr(0, n - 1) : this
  s_ = (useWordBoundary && isTooLong) ? s_.substr(0, s_.lastIndexOf(' ')) : s_
  return isTooLong ? s_ + '...' : s_
}
