const HEROES_API_URL =
  import.meta.env.MODE === 'development'
    ? import.meta.env.HEROES_LOCAL_API_URL
    : import.meta.env.HEROES_API_URL

export const getAllHeroes = async () => {
  try {
    const response = await fetch(`${HEROES_API_URL}/heroes`)
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}
