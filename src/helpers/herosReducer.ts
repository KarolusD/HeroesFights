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
    default: {
      throw new Error(`Unhandled action type: ${action!.type}`)
    }
  }
}

export default herosReducer
