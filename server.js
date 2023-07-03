require('./config/singleDB')
const express = require('express')

const router = require('./route/singlerouter')
const port = 2207
const mongoose = require('mongoose')
const app = express()
app.use(express.json())

app.use('/uploads', express.static("uploads"));

app.use('/api', router)



app.listen(port, ()=>{
    console.log(`server is listen to port: ${port}`)
})