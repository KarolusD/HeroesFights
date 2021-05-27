import { IHero, IPowerStats, PreparationT } from '../types/types'

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
  type: 'SET_ALL_HEROS'
  payload: {
    allHeros: IHero[]
  }
}

type StartHerosFightAction = {
  type: 'START_HEROS_FIGHT'
}

type EndHerosFightAction = {
  type: 'END_HEROS_FIGHT'
}

type AddHeroPointsAction = {
  type: 'ADD_HERO_POINTS'
  payload: {
    player: 'player1' | 'player2'
    points: number
    bonus: number
  }
}

type ResetHerosPointsAction = {
  type: 'RESET_HEROS_POINTS'
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
  }
}

type UpdateRoundNumberAction = {
  type: 'UPDATE_ROUND_NUMBER'
  payload: {
    round: number
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
