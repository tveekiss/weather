import React from 'react';
import axios from "axios";

import '../styles/Main.css'

import Form from "./Form";
import TodayWeather from './TodayWeather';
import FiveDaysWeather from './FiveDaysWeather';

export default function Main() {
    let [temp, setTemp] = React.useState(<div></div>)
    let [daysTemp, setDaysTemp] = React.useState([])
    const API_KEY = '2dd1b1d829f9264946dddc1156cdd4e7';
    function gettingWeather(e) {
        e.preventDefault();
        const city = e.target.elements.city.value;
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ru`)
            .then(res => {
                const data = res.data;
                const weather =
                    <div>
                        <p>Местоположение: {data.sys.country}, {data.name}</p>
                        <p>Температура: {data.main.temp.toFixed(0)} °C, {data.weather[0].description}</p>
                        <p>Ощущается как: {data.main.feels_like.toFixed(0)} °C</p>
                        <p>Скорость ветра: {data.wind.speed} м/с</p>
                    </div>
                setTemp(weather)
            })
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=ru`)
            .then(res => {
                const data = res.data;
                let daysArray = [];
                data.list.forEach((el, i) => {
                    if (i % 8 === 0) {
                        daysArray.push(el);
                    }
                })
                const daysWeather =
                    <div>
                        {daysArray.map((el, i) =>
                            <div>
                                {el.dt_txt} {el.main.temp} {el.wind.speed} {el.weather[0].description}
                            </div>
                        )}
                    </div>
                setDaysTemp(daysWeather)

            })
    }
    return (
        <main className="main">
            <h3>Узнать данные о погоде</h3>
            <Form getweatherFunc={gettingWeather}/>
            <TodayWeather temp={temp} />
            <FiveDaysWeather daysTemp={daysTemp} />
        </main>
    )
}