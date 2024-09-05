import * as React from "react";

import sun from '../images/sun.svg';

import '../styles/Header.css';

export default function Header() {
    return (
        <header className="header">
            <img src={sun} alt=""/>
            <h1>Погода</h1>
        </header>
    )
}
