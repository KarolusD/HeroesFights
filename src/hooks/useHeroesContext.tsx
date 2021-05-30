import React, { useContext } from 'react'
import { HeroesContext } from '_context/HeroesContext'

export const useHeroesContext = () => {
  const context = useContext(HeroesContext)
  if (!context) {
    throw new Error('useHeroesContext must be used within HeroesContext')
  }

  return context
}
