export const roundNum = (value: number, decimal: number): number => {
  return Math.round(value * 10 * decimal) / (10 * decimal)
}
