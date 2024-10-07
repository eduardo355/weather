export function formattedTime(datetime: number) {
  return datetime.toString().split(':').slice(0, 2).join(':')
}
