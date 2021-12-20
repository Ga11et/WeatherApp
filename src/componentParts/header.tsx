import { FC } from "react";
import { useSelector } from "react-redux";
import { AppStateType } from "../redux/reduxState";
import css from './header.module.css'

export const Header: FC<{}> = (props) => {

    const todayWeather = useSelector( (state: AppStateType) => state.weather.weatherList)
    const temp = Math.round(todayWeather.main.temp)
    const feels = Math.round(todayWeather.main.feels_like)
    const day = new Date(todayWeather.dt * 1000).toString().slice(0,3)
    const description = todayWeather.weather[0].description



    return <header className={css.main}>
        <section>
            <div>
                <h1>{day}</h1>
                <h2>{description}</h2>
            </div>
            <div>
                <h1>{temp}° / {feels}°</h1>
                <h2>Syktyvkar, Komi Republic, Russia</h2>
            </div>
            
        </section>
    </header>
} 