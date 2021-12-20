import { API } from "../api/api"
import { actionsTypes, CurrentWeatherType } from "../types/types"


export type weatherIStateType = typeof weatherIState

const weatherIState = {
    weatherList: {
        clouds: { all: 0 },
        main: { temp: 0, feels_like: 0, pressure: 0, humidity: 0 },
        wind: { speed: 0, deg: 0 },
        dt: 0,
        weather: [
            {main: '', description: ''}
        ],
        visibility: 0,
        sys: {
            sunrise: 0,
            sunset: 0
        }
    } as CurrentWeatherType,
    hourlyWeatherList: [] as CurrentWeatherType[]
}

// Reducer

export const weatherReducer = (state = weatherIState, action: actionsTypes<typeof WeatherRedActions>): weatherIStateType => {
    switch (action.type) {
        case 'GET_WEATHER':
            return {
                ...state,
                weatherList: {...action.weatherList}
            }
        case 'GET_HOURLY_WEATHER':
            return {
                ...state,
                hourlyWeatherList: [...action.weatherLists]
            }
        default:
            return state
    }
}

// Actions

export const WeatherRedActions = {
    getWeather: (weatherList: CurrentWeatherType) => ({ type: 'GET_WEATHER', weatherList } as const),
    getHourlyWeather: (weatherLists: CurrentWeatherType[]) => ({ type: 'GET_HOURLY_WEATHER', weatherLists } as const)
}

// Thunks

type dispatchType = (action: actionsTypes<typeof WeatherRedActions>) => void

export const WeatherRedThunks = {
    getWeather: () => async (dispatch: dispatchType) => {
        const response = await API.getWeather()
        dispatch(WeatherRedActions.getWeather(response))
    },
    getHourlyWeather: () => async (dispatch: dispatchType) => {
        const response = await API.getHourlyWeather()
        dispatch(WeatherRedActions.getHourlyWeather(response))
    }
}