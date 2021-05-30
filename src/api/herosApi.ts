const HEROS_API_URL =
  import.meta.env.MODE === 'development'
    ? import.meta.env.HEROS_LOCAL_API_URL
    : import.meta.env.HEROS_API_URL

export const getAllHeros = async () => {
  try {
    const response = await fetch(`${HEROS_API_URL}/heros`)
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}
