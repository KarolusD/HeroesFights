import { IHero, IPowerStats, PreparationT } from '_types/types'

type SetPlayer1HeroAction = {
  type: 'SET_PLAYER_1'
  payload: {
    player1: IHero
  }
}

type SetPlayer2HeroAction = {
  type: 'SET_PLAYER_2'
  payload: {
    player2: IHero
  }
}

type SetAllHerosAction = {
  type: 'SET_ALL_HEROES'
  payload: {
    allHeros: IHero[]
  }
}

type StartHerosFightAction = {
  type: 'START_HEROES_FIGHT'
}

type EndHerosFightAction = {
  type: 'END_HEROES_FIGHT'
}

type AddHeroPointsAction = {
  type: 'ADD_HERO_POINTS'
  payload: {
    player: 'player1' | 'player2'
    points: number
  }
}

type ResetHerosPointsAction = {
  type: 'RESET_HEROES_POINTS'
}

type SaveCalculatedPowerStatsAction = {
  type: 'SAVE_CALCULATED_POWERSTATS'
  payload: {
    player: 'player1' | 'player2'
    preparation: PreparationT
    calculatedPowerStats?: IPowerStats
  }
}

type UpdateDiceCountAction = {
  type: 'UPDATE_DICE_COUNT'
  payload: {
    player: 'player1' | 'player2'
    diceCount: boolean[]
    diceBonus: number
  }
}

type UpdateRoundNumberAction = {
  type: 'UPDATE_ROUND_NUMBER'
  payload: {
    round: number
  }
}

type UpdateFightStateAction = {
  type: 'UPDATE_FIGHT_STATE'
  payload: {
    heroesFightState:
      | 'NOT READY'
      | 'START FIGHTING'
      | 'ROLLING READY'
      | 'ROLLING DICE'
      | 'SCORE READY'
      | 'WINNER SHOWN'
  }
}

export type Action =
  | SetPlayer1HeroAction
  | SetPlayer2HeroAction
  | SetAllHerosAction
  | StartHerosFightAction
  | EndHerosFightAction
  | AddHeroPointsAction
  | SaveCalculatedPowerStatsAction
  | ResetHerosPointsAction
  | UpdateDiceCountAction
  | UpdateRoundNumberAction
  | UpdateFightStateAction
