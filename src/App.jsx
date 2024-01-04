import { useState } from "react"
import { useEffect } from "react"
import "./App.css"
import axios from "axios"
import WeatherCard from "./components/WeatherCard"

function App() {
  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()
  const [isLoading, setIsLoading] = useState(true)


  const success = pos => {
    const obj = {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude
    }
    setCoords(obj)
  }

  useEffect(() => {
    setIsLoading(true)
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  useEffect(() => {
    if (coords) {
      const APIkeys = "7df6df4172e09af5c15246b8bd6238f9"
      const { lat, lon } = coords

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkeys}`

      axios.get(url)
        .then(res => {
          setWeather(res.data)
          const obj = {
            celsius: (res.data.main.temp - 273.15).toFixed(1),
            fahrenheit: ((res.data.main.temp - 273.15) * 9 / 5 + 32).toFixed(1)
          }
          setTemp(obj)
        })
        .catch(err => console.log(err))
        .finally(()=> setIsLoading(false))
    }
  }, [coords])

  return (
    <div className="app">
      {
        isLoading
          ? <h2>loading....... One Moment</h2>
          : (
            <WeatherCard
              weather={weather}
              temp={temp}
            />
          )
      }
    </div>
  )
}

export default App
