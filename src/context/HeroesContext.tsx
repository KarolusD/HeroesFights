import React, { createContext, ReactNode, useReducer } from 'react'
import { IHero } from '_types/types'

import heroesReducer from '../helpers/heroesReducer'
import { Action } from './heroesActions'

export type State = {
  player1?: IHero
  player2?: IHero
  allHeroes?: IHero[]
  isHeroesFighting: boolean
  heroesFightState: string
  round: number
}

type Dispatch = (action: Action) => void

const initialState: State = {
  player1: undefined,
  player2: undefined,
  allHeroes: [],
  isHeroesFighting: false,
  heroesFightState: 'NOT READY',
  round: 0,
}

export const HeroesContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined)

interface Props {
  children: ReactNode
}

export const HeroesContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(heroesReducer, initialState)

  const value = { state, dispatch }
  return (
    <HeroesContext.Provider value={value}>{children}</HeroesContext.Provider>
  )
}
