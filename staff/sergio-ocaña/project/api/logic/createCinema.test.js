import createCinema from './createCinema.js'

import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            createCinema('667d6925fc9e2642ebf52581', 'Prueba borrado', 'calle nosera nº15')
                .then(() => console.log('cinema created'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
