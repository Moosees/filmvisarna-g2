export function formatMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) {
    return `${hours} tim`;
  } else {
    return `${hours} tim ${remainingMinutes} min`;
  }
}
