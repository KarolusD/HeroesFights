import { randomNumber } from './randomNumber'

export const handleDieImpulse = (player: 'player1' | 'player2') => {
  const impX =
    player === 'player1' ? randomNumber(15, 25) : randomNumber(-25, -15) // how strong are the dice rolled (left/right)
  const impY = 0
  const impZ = randomNumber(-2, 2) // direction of the roll (up/down)

  return [impX, impY, impZ] || [0, 0, 0]
}

export const handleDiePosition = (player: 'player1' | 'player2') => {
  const posX = player === 'player1' ? -10 : 10 // how far dice are on left/right
  const posY = randomNumber(3, 8) // how high the dice are
  const posZ = randomNumber(-5, 5) // how spread out the dice are
  return [posX, posY, posZ] || [0, 0, 0]
}
