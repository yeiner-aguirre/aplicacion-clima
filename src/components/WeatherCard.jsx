import { useState } from "react"
import "./WeatherCard.css"

const WeatherCard = ({ weather, temp }) => {
    const [isCelsius, setIsCelsius] = useState(true)
    const handleChangeTemp = () => {
        setIsCelsius(state => !state)
    }
    return (
        <article className="weather">
            <h1 className="weather_title">WEATHER APP</h1>
            <h2 className="weather_subtitle">{weather?.name}, {weather?.sys.country}</h2>
            <section className="weather_body">
                <header className="weather_img">
                    <img className="weather_icon" src={weather && `https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} alt="" />
                </header>
                <article className="weather_info">
                    <h2 className="weather_info_title">"{weather?.weather[0].description}"</h2>
                    <ul className="weather_list">
                        <li className="weather_item"><span className="weather_label">Wind Speed:</span><span className="weather_value">{weather?.wind.speed}m/s</span></li>
                        <li className="weather_item"><span className="weather_label">Clouds:</span><span className="weather_value">{weather?.clouds.all}%</span></li>
                        <li className="weather_item"><span className="weather_label">Pressure:</span><span className="weather_value">{weather?.main.pressure}hPa</span></li>
                    </ul>
                </article>
            </section>
            <footer className="weather_footer">
                <h2 className="weather_temp">{isCelsius ? `${temp?.celsius} °C` : `${temp?.fahrenheit}°F`}</h2>
                <button className="weather_btn" onClick={handleChangeTemp}>Change temperature</button>
            </footer>
        </article>
    )
}

export default WeatherCard