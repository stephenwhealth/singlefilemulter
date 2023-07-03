const mongoose = require('mongoose')

const singleSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    FamilyImages:[{
        type:String
    }]

    },{timestamps:true})

    const singleModel = mongoose.model("singleprofile", singleSchema)

module.exports= singleModel