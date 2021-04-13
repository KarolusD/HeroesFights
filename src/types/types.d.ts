export declare interface IHero {
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
}
