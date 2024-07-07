import mongoose from 'mongoose'
import retrieveCinemas from './retrieveCinemas.js'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            retrieveCinemas('667d6925fc9e2642ebf52581')
                .catch(error => console.error(error))
                .then((cinemas) => console.log(cinemas))
        } catch (error) {
            console.error(error)
        }
    })