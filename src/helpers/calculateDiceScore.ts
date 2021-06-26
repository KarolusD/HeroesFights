export const calculateDiceScore = (dice: number[] = [], bonus: number = 0) => {
  return dice.reduce((total, elem) => total + elem, 0) + bonus
}
