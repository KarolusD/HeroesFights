import React, { createContext, ReactNode, useReducer } from 'react'
import { IHero } from '../types/types'

import herosReducer from '../helpers/herosReducer'

type Player1Action = {
  type: 'SET_PLAYER_1'
  payload: IHero
}

type Player2Action = {
  type: 'SET_PLAYER_2'
  payload: IHero
}

type AllHerosAction = {
  type: 'SET_ALL_HEROS'
  payload: IHero[]
}

type StartHerosFightAction = {
  type: 'START_HEROS_FIGHT'
}

type EndHerosFightAction = {
  type: 'END_HEROS_FIGHT'
}

export type Action =
  | Player1Action
  | Player2Action
  | AllHerosAction
  | StartHerosFightAction
  | EndHerosFightAction

type Dispatch = (action: Action) => void

export type State = {
  player1?: IHero
  player2?: IHero
  allHeros?: IHero[]
  isHerosFighting: boolean
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
  })

  const value = { state, dispatch }
  return <HerosContext.Provider value={value}>{children}</HerosContext.Provider>
}
