type actionType<T> = T extends {[key: string]: infer U} ? U : never
export type actionsTypes<T extends {[key: string]: (...args: Array<any>) => any}> = ReturnType<actionType<T>>

type weatherType = {
    main: string
    description: string
}
export type CurrentWeatherType = {
    clouds: {
        all: number
    }
    main: {
        temp: number
        feels_like: number
        pressure: number
        humidity: number
    }
    wind: {
        speed: number
        deg: number
    }
    sys: {
        sunrise: number
        sunset: number
    }
    weather: weatherType[]
    dt: number
    visibility: number
}
