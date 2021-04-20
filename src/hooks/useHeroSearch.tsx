import { useEffect, useState } from 'react'
import { IHero } from '../types/types'

export const useHeroSearch = (heros: IHero[], searchTerm: string) => {
  const [filteredHeros, setFilteredHeros] = useState<IHero[] | undefined>()

  useEffect(() => {
    if (heros && searchTerm !== '') {
      const results = heros.filter((hero) => {
        let regEx = new RegExp(`${searchTerm.trim()}`, 'gi')
        return regEx.test(hero.name)
      })
      setFilteredHeros(results)
    } else if (heros) {
      setFilteredHeros(heros)
    }
  }, [searchTerm, heros])

  return { filteredHeros, setFilteredHeros }
}
