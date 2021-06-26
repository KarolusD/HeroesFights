import { State } from '_context/HeroesContext'
import { Action } from '_context/heroesActions'

const heroesReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_PLAYER_1': {
      return {
        ...state,
        player1: action.payload.player1,
      }
    }

    case 'SET_PLAYER_2': {
      return {
        ...state,
        player2: action.payload.player2,
      }
    }

    case 'SET_ALL_HEROES': {
      return {
        ...state,
        allHeros: action.payload.allHeros,
      }
    }

    case 'START_HEROES_FIGHT': {
      return {
        ...state,
        isHeroesFighting: true,
        heroesFightState: 'START FIGHTING',
      }
    }

    case 'UPDATE_FIGHT_STATE': {
      const { heroesFightState } = action.payload
      return {
        ...state,
        heroesFightState,
      }
    }

    case 'END_HEROES_FIGHT': {
      return {
        ...state,
        isHeroesFighting: false,
        heroesFightState: 'NOT READY',
      }
    }

    case 'ADD_HERO_POINTS': {
      const { player, points } = action.payload

      return {
        ...state,
        [player]: {
          ...state[player],
          dicePoints: state[player]?.dicePoints
            ? [...state[player]?.dicePoints!, points]
            : [points],
        },
      }
    }

    case 'SAVE_CALCULATED_POWERSTATS': {
      const { player, calculatedPowerStats, preparation } = action.payload
      return {
        ...state,
        [player]: {
          ...state[player],
          preparation,
          calculatedPowerStats,
        },
      }
    }

    case 'RESET_HEROES_POINTS': {
      const player1 = 'player1' as keyof State
      const player2 = 'player2' as keyof State
      return {
        ...state,
        [player1]: {
          ...(state[player1] as object),
          diceBonus: undefined,
          dicePoints: undefined,
        },
        [player2]: {
          ...(state[player2] as object),
          diceBonus: undefined,
          dicePoints: undefined,
        },
      }
    }

    case 'UPDATE_DICE_COUNT': {
      const { player, diceCount, diceBonus } = action.payload
      return {
        ...state,
        [player]: {
          ...state[player],
          diceCount,
          diceBonus,
        },
      }
    }

    case 'UPDATE_ROUND_NUMBER': {
      return {
        ...state,
        round: action.payload.round,
      }
    }

    default: {
      throw new Error(`Unhandled action type`)
    }
  }
}

export default heroesReducer
