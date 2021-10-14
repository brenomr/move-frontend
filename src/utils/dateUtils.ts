export const unformatDate = (date: string) => {
  if (date) {
    return date.split('T')[0];
  }
  else
    return ''
}
export const formatDate = (date: string) => {
  if (date) {
    if (date.includes('T'))
      return date
    else
      return `${date}T00:00:01.592Z`;
  }
  else
    return null
}