export default async function handler(req, res) {
  const apiKey = process.env.API_KEY

  const { latitude, longitude } = req.body

  try {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`
    const response = await fetch(url)
    const data = await response.json()

    const components = data.results[0].components
    const country = components.country
    const state = components.state

    res.status(200).json({ country, state, latitude, longitude })
  } catch (error) {
    console.error('Error al obtener los datos de ubicación:', error)
    res.status(500).json({ error: 'Error fetching location data' })
  }
}
