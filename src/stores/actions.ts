import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  async function geolocation(position: any) {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude

    const apiKey = import.meta.env.VITE_API_KEY
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`

    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const components = data.results[0].components
        const country = components.country
        const state = components.state
        return { country, state, latitude, longitude }
      })
      .catch((error) => console.error('Error al obtener los datos de ubicación:', error))
  }

  async function getWeatherForLatitudeAndLongitude(latitude: number, longitude: number) {
    return fetch(`https://wheater-api.fly.dev/api/weather/${latitude}/${longitude}`)
      .then((response) => response.json())
      .then((data) => {
        return data
      })
      .catch((error) => console.error('Error al obtener los datos del clima:', error))
  }
  return { geolocation, getWeatherForLatitudeAndLongitude }
})
