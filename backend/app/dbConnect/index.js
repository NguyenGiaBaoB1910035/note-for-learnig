const mongoose = require("mongoose")

module.exports = async() => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/datalearn",{
        useNewUrlParser: true
    });

    // mongoose.set('strictQuery', false);

    console.log("ket noi database thanh cong")
    } catch (error) {
        console.log("ket noi that bai")
    }
}