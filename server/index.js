const express = require('express')
const faker = require('faker');
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require("path");

const PORT = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(bodyParser.json())
let users = []

app.post("/users", (req, res) => {

    users = [{
        "id": Math.random().toString().slice(2),
        "name": faker.name.findName(),
        "email": faker.internet.email(),
        "address": faker.address.cityName(),
        "phoneNumber": faker.phone.phoneNumber(),
    }, ...users]
    res.json(users)
});

app.listen(PORT, () => console.log("Listening to PORT ", PORT))