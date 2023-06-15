export function getNowDate(): string {
  return Intl.DateTimeFormat('pt-br', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }).format(new Date())
}
