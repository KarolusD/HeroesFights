import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import HeroVsHeroView from '_views/HeroVsHeroView'
import HeroesWikiView from '_views/HeroesWikiView'

interface Props {}

const Navigation = (props: Props) => {
  return (
    <Router>
      <Switch>
        <Route path="/hero-vs-hero">
          <HeroVsHeroView />
        </Route>
        <Route path="/heroes-wiki">
          <HeroesWikiView />
        </Route>
      </Switch>
    </Router>
  )
}

export default Navigation
