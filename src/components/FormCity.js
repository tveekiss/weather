import React from 'react';
import InputGroup from "react-bootstrap/InputGroup"
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";

import '../styles/Form.css';

export default function FormCity(props) {
    return (
        <Form onSubmit={props.getWeatherFunc} className="city-form">
            <InputGroup className="mb-3">
                <Form.Control size="lg" type="text" placeholder="Введите город" />
            </InputGroup>
            <Button type="submit">Получить погоду</Button>
        </Form>
    )
}
