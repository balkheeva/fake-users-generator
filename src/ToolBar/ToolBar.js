import {Button, ButtonToolbar, Dropdown, DropdownButton, Form, InputGroup} from "react-bootstrap";
import {useEffect, useState} from "react";
import {faker} from "@faker-js/faker";
import {COUNTRIES} from "../helpers/countries";


export default function ToolBar(props) {
    const [country, setCountry] = useState('ru')
    const [mistake, setMistake] = useState(0)

    const changeCountry = (code) => {
        setCountry(COUNTRIES[code])
    }

    useEffect(() => {
        faker.locale = `${country}`
        props.onCreateUser()
    }, [country])

    const handleChangeMistake = (e) => {
        setMistake(e.target.value)
        props.onEnterProbability(e.target.value)
    }

    return <ButtonToolbar className="d-flex align-items-center gap-3 mt-3">
        <span>0</span>
        <InputGroup>
            <Form.Range
                value={mistake}
                className="mx-1"
                min="0"
                max="10"
                step="0.25"
                onChange={handleChangeMistake}
                aria-describedby="basic-addon2"
            />
        </InputGroup>
        <span className="me-3">{(Number(mistake) === 0 || Number(mistake) > 10) ? 10 : mistake}</span>
        <InputGroup >
            <Form.Control
                type="number"
                min="0"
                max="1000"
                step="0.25"
                value={mistake}
                onChange={handleChangeMistake}
                placeholder={mistake.toString()}
                aria-label="Enter a number of mistakes"
                aria-describedby="basic-addon2"
            />
        </InputGroup>
        <InputGroup className="w-25">
            <Form.Control
                value={props.seed}
                type="number"
                onChange={e => props.onChangeSeed(e.target.value)}
                placeholder="Enter a seed"
                aria-label="Enter a seed"
                min="0"
                max="100"
                aria-describedby="basic-addon2"
            />
            <Button onClick={props.onRandomizeSeed}>Random</Button>
        </InputGroup>

        <DropdownButton id="dropdown-basic-button" title={country}>
            <Dropdown.Item onClick={() => changeCountry('ru')}>Russian</Dropdown.Item>
            <Dropdown.Item onClick={() => changeCountry('sv')}>Swedish</Dropdown.Item>
            <Dropdown.Item onClick={() => changeCountry('nb_NO')}>Norwegian</Dropdown.Item>
        </DropdownButton>
        <Button onClick={props.onExportCSV}>Export to CSV</Button>
    </ButtonToolbar>
}