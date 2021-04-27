import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import HeroVsHeroView from '../views/HeroVsHeroView'
import TeamVsTeamView from '../views/TeamVsTeamView'

interface Props {}

const Navigation = (props: Props) => {
  return (
    <Router>
      <Switch>
        <Route path="/hero-vs-hero">
          <HeroVsHeroView />
        </Route>
        <Route path="/team-vs-team">
          <TeamVsTeamView />
        </Route>
      </Switch>
    </Router>
  )
}

export default Navigation
