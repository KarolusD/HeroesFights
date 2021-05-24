import { IHero, IPowerStats, PreparationT } from '../types/types'

type SetPlayer1HeroAction = {
  type: 'SET_PLAYER_1'
  payload: IHero
}

type SetPlayer2HeroAction = {
  type: 'SET_PLAYER_2'
  payload: IHero
}

type SetAllHerosAction = {
  type: 'SET_ALL_HEROS'
  payload: IHero[]
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

type SaveCalculatedPowerstatsAction = {
  type: 'SAVE_CALCULATED_POWERSTATS'
  payload: {
    player: 'player1' | 'player2'
    preparation: PreparationT
    calculatedPowerstats: IPowerStats
  }
}

export type Actions =
  | SetPlayer1HeroAction
  | SetPlayer2HeroAction
  | SetAllHerosAction
  | StartHerosFightAction
  | EndHerosFightAction
  | AddHeroPointsAction
  | ResetHerosPointsAction
  | SaveCalculatedPowerstatsAction
