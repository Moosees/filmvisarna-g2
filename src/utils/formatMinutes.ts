export function formatMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) {
    return `${hours} tim`;
  } else if (hours === 0) {
    return `${remainingMinutes} min`;
  } else {
    return `${hours} tim ${remainingMinutes} min`;
  }
}
