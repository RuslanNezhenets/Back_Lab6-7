const express = require('express')
const router = require('./routes/index')
const mongoose = require("mongoose");
const cors = require('cors')
const path = require("path");
const fileUpload = require('express-fileupload')

const PORT = process.env.PORT || 5000;
const uri = "mongodb+srv://Aragorn:Q1w2e3r4t5@cluster1.7lhadkr.mongodb.net/?retryWrites=true&w=majority";

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

const start = async () => {
    try {
        await mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true})
        console.log("Пропинговал ваше развертывание. Вы успешно подключились к MongoDB!");
        app.listen(PORT, () => console.log(`Сервер запустился на порту ${PORT}`))
    } catch (e) {
        console.log(e);
    }
}

start()

