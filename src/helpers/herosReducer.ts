import { Action, State } from '../context/HerosContext'

const herosReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_PLAYER_1': {
      return {
        ...state,
        player1: action.payload,
      }
    }
    case 'SET_PLAYER_2': {
      return {
        ...state,
        player2: action.payload,
      }
    }
    case 'SET_ALL_HEROS': {
      return {
        ...state,
        allHeros: action.payload,
      }
    }
    case 'START_HEROS_FIGHT': {
      return {
        ...state,
        isHerosFighting: true,
      }
    }
    case 'END_HEROS_FIGHT': {
      return {
        ...state,
        isHerosFighting: false,
      }
    }
    case 'ADD_HERO_POINTS': {
      return {
        ...state,
        playersPoints: {
          ...state.playersPoints,
          [action.payload.player]: {
            bonus: action.payload.bonus,
            points: action.payload.points,
          },
        },
      }
    }
    case 'RESET_HEROS_POINTS': {
      return {
        ...state,
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
      }
    }
    case 'SAVE_CALCULATED_POWERSTATS': {
      const { player, calculatedPowerStats, preparation } = action.payload
      console.log({
        ...state,
        [player]: {
          ...(state[player] as object),
          preparation,
          calculatedPowerStats,
        },
      })
      return {
        ...state,
        [player]: {
          ...(state[player] as object),
          preparation,
          calculatedPowerStats,
        },
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action!.type}`)
    }
  }
}

export default herosReducer
