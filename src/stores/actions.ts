import { defineStore } from 'pinia'
import { URL } from '@/utils/ulrApi'

export const useCounterStore = defineStore('counter', () => {
  const geolocation = async (position: GeolocationPosition) => {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude

    return fetch(`${URL}/weather/coordinates/${latitude}/${longitude}`)
      .then((response) => response.json())
      .then((data) => {
        return data
      })
      .catch((error) => console.error('Error al obtener los datos de ubicación:', error))
  }

  const getWeatherForLatitudeAndLongitude = async (latitude: number, longitude: number) => {
    return fetch(`${URL}/weather/${latitude}/${longitude}`)
      .then((response) => response.json())
      .then((data) => {
        return data
      })
      .catch((error) => console.error('Error al obtener los datos del clima:', error))
  }

  return { geolocation, getWeatherForLatitudeAndLongitude }
})
