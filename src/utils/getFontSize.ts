export function getFontSize(value = 0): string {
  const baseSize = 1.3;
  const decrement = 0.1;
  const length = String(value).length;
  const steps = Math.floor((length - 1) / 2);
  const newSize = baseSize - steps * decrement;

  return `${newSize}em`;
}
