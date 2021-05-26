import React, { createContext, ReactNode, useReducer } from 'react'
import { IHero } from '../types/types'

import herosReducer from '../helpers/herosReducer'
import { Action } from './herosActions'

type Dispatch = (action: Action) => void

export type State = {
  player1?: IHero
  player2?: IHero
  allHeros?: IHero[]
  isHerosFighting: boolean
  round: number
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
    round: 0,
  })

  const value = { state, dispatch }
  return <HerosContext.Provider value={value}>{children}</HerosContext.Provider>
}
