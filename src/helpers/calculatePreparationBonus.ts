export const calculatePreparationBonus = (
  currStats: number,
  defaultStats: number
) => {
  return parseFloat(((-1 + currStats / defaultStats) * 100).toFixed(1))
}
