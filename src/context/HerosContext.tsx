import React, { createContext, ReactNode, useReducer } from 'react'
import { IHero, IPowerStats, PreparationT } from '../types/types'

import herosReducer from '../helpers/herosReducer'

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

export type Action =
  | SetPlayer1HeroAction
  | SetPlayer2HeroAction
  | SetAllHerosAction
  | StartHerosFightAction
  | EndHerosFightAction
  | AddHeroPointsAction
  | ResetHerosPointsAction
  | SaveCalculatedPowerstatsAction

type Dispatch = (action: Action) => void

export type State = {
  player1?: IHero
  player2?: IHero
  allHeros?: IHero[]
  isHerosFighting: boolean
  playersPoints: {
    [data: string]: {
      bonus: number
      points: number
    }
  }
}

export const HerosContext =
  createContext<{ state: State; dispatch: Dispatch } | undefined>(undefined)

interface Props {
  children: ReactNode
}

export const HerosContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(herosReducer, {
    player1: undefined,
    player2: undefined,
    allHeros: [],
    isHerosFighting: false,
    playersPoints: {
      player1: {
        bonus: 0,
        points: 0,
      },
      player2: {
        bonus: 0,
        points: 0,
      },
    },
  })

  const value = { state, dispatch }
  return <HerosContext.Provider value={value}>{children}</HerosContext.Provider>
}
