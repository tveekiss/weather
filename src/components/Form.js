import React from 'react';
import axios from "axios";


export default function Form(props) {
    return (
        <form onSubmit={props.gettingWeather}>
            <input type="text" name='city' placeholder='Введите город'/>
            <button>Получить погоду</button>
        </form>


    )
}
