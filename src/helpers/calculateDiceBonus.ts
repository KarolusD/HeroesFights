export const calculateDiceBonus = (
  player1Stats: number,
  player2Stats: number
) => {
  return Math.floor(Math.abs(player1Stats - player2Stats) / 25)
}
