import axios from "axios"
import { CurrentWeatherType } from "../types/types"

const APIKey = '00d59af27387cd503e3c3cb1bd2c4187'

export const API = {
    getWeather: () => {
        return axios.get<CurrentWeatherType>(`http://api.openweathermap.org/data/2.5/weather?q=syktyvkar&appid=00d59af27387cd503e3c3cb1bd2c4187&units=metric`)
            .then( response => response.data)
    },
    getHourlyWeather: () => {
        return axios.get(`https://pro.openweathermap.org/data/2.5/forecast?q=syktyvkar&appid=b1b15e88fa797225412429c1c50c122a1&units=metric`)
            .then( response => response.data.list)
    }
}