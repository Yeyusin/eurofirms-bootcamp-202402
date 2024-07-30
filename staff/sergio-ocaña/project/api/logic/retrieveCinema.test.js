import mongoose from 'mongoose'
import retrieveCinema from './retrieveCinema.js'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            retrieveCinema('669e3f9f595f14db65b23a19', '66a8b2fca7a3e4552fedf3f4')
                .catch(error => console.error(error))
                .then((cinemas) => console.log(cinemas))
        } catch (error) {
            console.error(error)
        }
    })