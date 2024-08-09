import mongoose from 'mongoose'
import generateTicket from './generateTicket.js'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            generateTicket()
                .catch(error => console.error(error))
                .then((cinemas) => console.log(cinemas))
        } catch (error) {
            console.error(error)
        }
    })