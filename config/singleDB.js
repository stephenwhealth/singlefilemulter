require('dotenv').config();
const mongoose = require('mongoose')

const username = process.env.ATLAS_USERNAME
const password = process.env.ATLAS_PASSWORD

const url= `mongodb+srv://${username}:${password}@cluster0.juh5no5.mongodb.net/`

mongoose.connect(url).then(()=>{
    console.log('connection to the database is correct')
}).catch((e)=>{
    console.log(e.message)
})
