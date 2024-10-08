import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  async function geolocation(position: GeolocationPosition) {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    return fetch(`https://wheater-api.fly.dev/api/weather/coordinates/${latitude}/${longitude}`)
      .then((response) => response.json())
      .then((data) => {
        return data
      })
      .catch((error) => console.error('Error al obtener los datos de ubicación:', error))
  }

  async function getWeatherForLatitudeAndLongitude(latitude: number, longitude: number) {
    return fetch(`https://wheater-api.fly.dev/api/weather/${latitude}/${longitude}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        return data
      })
      .catch((error) => console.error('Error al obtener los datos del clima:', error))
  }
  return { geolocation, getWeatherForLatitudeAndLongitude }
})
