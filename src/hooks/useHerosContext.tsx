import React, { useContext } from 'react'
import { HerosContext } from '../context/HerosContext'

export const useHerosContext = () => {
  const context = useContext(HerosContext)
  if (!context) {
    throw new Error('useHerosContext must be used within HerosContext')
  }

  return context
}
