import React from 'react';
import axios from "axios";

import '../styles/Main.css'

import FormCity from "./FormCity";
import Card from "react-bootstrap/Card";

export default function Main() {
    let [temp, setTemp] = React.useState(<div></div>)
    let [daysTemp, setDaysTemp] = React.useState([])
    const API_KEY = '2dd1b1d829f9264946dddc1156cdd4e7';
    function gettingWeather(e) {
        e.preventDefault();
        const city = e.target[0].value;
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ru`)
            .then(res => {
                const data = res.data;
                const weather =
                    <div className="today-weather">
                        <p>{data.sys.country}, {data.name}</p>
                        <p>Температура: <span>{data.main.temp.toFixed(0)} °C</span></p>
                        <p>{data.weather[0].description}</p>
                        <p>Ощущается как: <span>{data.main.feels_like.toFixed(0)} °C</span></p>
                        <p>Скорость ветра: <span>{data.wind.speed} м/с</span></p>
                    </div>
            setTemp(weather)
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
                            <div className="days-weather">
                                {daysArray.map((el, i) =>
                                    <Card
                                        bg="light"
                                        className="weather-card"
                                        key={el.dt}
                                    >
                                        <Card.Header className={"card-header"}>{(() => {
                                            const dateTime = el.dt_txt.split(" ");
                                            const date = dateTime[0].split("-");
                                            return date.reverse().join('.');
                                        })()}</Card.Header>
                                        <Card.Body>
                                            <Card.Title className={"weather-title"}>{el.main.temp.toFixed(0)} °C</Card.Title>
                                            <Card.Text className={"card-text"}>
                                                {el.weather[0].description}
                                                <br/>
                                                Ощущается как: {el.main.feels_like.toFixed(0)} °C
                                                <br/>
                                                Скорость ветра: {el.wind.speed} м/с
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                )}
                            </div>
                        setDaysTemp(daysWeather)
                    })
            }).catch(() => alert('Такого места не существует'))
    }
    return (
        <main className="main">
            <h3>Узнать данные о погоде</h3>
            <FormCity getWeatherFunc={gettingWeather}/>
            {temp}
            {daysTemp}
        </main>
    )
}