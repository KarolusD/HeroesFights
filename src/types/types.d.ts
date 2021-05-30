interface ObjectKeys {
  [key: string]: number
}

export interface IPowerStats extends ObjectKeys {
  intelligence: number
  strength: number
  speed: number
  durability: number
  power: number
  combat: number
}

export interface IHero {
  id: number
  name: string
  slug: string
  images: {
    xs?: string
    sm?: string
    md?: string
    lg?: string
  }
  biography: {
    fullName: string
    alterEgos: string
    aliases: string[]
    placeOfBirth: string
    firstAppearance: string
    publisher: string
    alignment: string
  }
  appearance: {
    gender: string
    race: string
    height: string[]
    weight: string[]
    eyeColor: string
    hairColor: string
  }
  powerstats: IPowerStats
  preparantion: PreparationT
  calculatedPowerStats: IPowerStats
  diceBonus?: number
  diceCount: boolean[]
  points?: number
}

export type PreparationT = 'unprepared' | 'prepared' | 'fully-prepared'
