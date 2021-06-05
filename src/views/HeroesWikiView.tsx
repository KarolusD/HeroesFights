import React from 'react'
import DiceScene from '_components/DiceScene/DiceScene'
import MainTemplate from '_templates/MainTemplate'

interface Props {}

const HeroesWikiView = (props: Props) => {
  return (
    <MainTemplate>
      <DiceScene />
    </MainTemplate>
  )
}

export default HeroesWikiView
