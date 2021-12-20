import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../redux/reduxState";
import { WeatherRedThunks } from "../redux/weatherReducer";
import { CurrentWeatherType } from "../types/types";
import css from './weather.module.css'
import back from '../assets/back.jpg'
import wind from '../assets/wind.png'
import humidity from '../assets/humidity.png'
import clouds from '../assets/cloud.png'
import cloudy from '../assets/cloudy.png'
import rainy from '../assets/rainy.png'
import snow from '../assets/snow.png'
import storm from '../assets/storm.png'
import sunny from '../assets/sun.png'

export const Weather: FC<{}> = (props) => {

    const [active, changeActive] = useState(1)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(WeatherRedThunks.getWeather())
        dispatch(WeatherRedThunks.getHourlyWeather())
    }, [])

    const hourlyWeatherData = useSelector( (state: AppStateType) => state.weather.hourlyWeatherList)
    const today = new Date().toString().slice(8,10)
    const tomorrow = (+(new Date().toString().slice(8,10)) + 1).toString()
    const dayAfter = (+(new Date().toString().slice(8,10)) + 2).toString()

    const hourlyWeatherDataToday = hourlyWeatherData.filter( el => new Date(el.dt * 1000).toString().slice(8,10) === today)
    const hourlyWeatherDataTomorrow = hourlyWeatherData.filter( el => new Date(el.dt * 1000).toString().slice(8,10) === tomorrow)
    const hourlyWeatherDataDayAfter = hourlyWeatherData.filter( el => new Date(el.dt * 1000).toString().slice(8,10) === dayAfter)


    return <>
        <WeatherMenu active={active} changeActive={changeActive} />
        <section className={css.container}>
            <section className={css.weatherParts}>
                {active == 1 && hourlyWeatherDataToday.map( el => <WeatherPart key={el.dt} weatherData={el} />)}
                {active == 2 && hourlyWeatherDataTomorrow.map( el => <WeatherPart key={el.dt} weatherData={el} />)}
                {active == 3 && hourlyWeatherDataDayAfter.map( el => <WeatherPart key={el.dt} weatherData={el} />)}
            </section>
        </section>
        
    </>
}

type WeatherMenuType = {
    active: number,

    changeActive: (newActivePage: number) => void
}

const WeatherMenu: FC<WeatherMenuType> = ({active, changeActive}) => {

    const Today = () => {
        changeActive(1)
    }
    const Tomorrov = () => {
        changeActive(2)
    }
    const Saturnday = () => {
        changeActive(3)
    }


    return <section className={css.navMain}>
        <nav className={css.nav}>
            <div onClick={Today} className={active == 1 ? css.active : undefined} >Today</div>
            <div onClick={Tomorrov} className={active == 2 ? css.active : undefined} >Tomorrov</div>
            <div onClick={Saturnday} className={active == 3 ? css.active : undefined} >Day After</div>
        </nav>
    </section>
    
}


type WeatherPartProps = {
    weatherData: CurrentWeatherType
}

const WeatherPart: FC<WeatherPartProps> = ({weatherData}) => {

    const time = new Date(weatherData.dt * 1000).toLocaleString('ru', {hour: 'numeric', minute: 'numeric'})
    const day = new Date(weatherData.dt * 1000).toString().slice(0,3)
    let pic
    switch (weatherData.weather[0].main) {
        case 'Snow':
            pic = snow
            break
        case 'Clouds':
            pic = cloudy
            break
        default:
            break
    }

    return <div className={css.weatherMain}>
        <img src={back} alt="back" />
        <h2 className={css.time}>{time}</h2>
        <h2 className={css.day}>{day}</h2>
        <h2 className={css.temp}>{Math.round(weatherData.main.feels_like)}°</h2>
        <section className={css.additionInfo}>
            <div><img src={wind} /><label>{weatherData.wind.speed} м/с</label></div>
            <div><img src={humidity} /><label>{weatherData.main.humidity} %</label></div>
            <div><img src={clouds} /><label>{weatherData.clouds.all} %</label></div>
        </section>
        <section className={css.main}>
            <div>
                <img src={pic} alt='mainPic' />
                <label>{weatherData.weather[0].description}</label>
            </div>
        </section>
    </div>
}