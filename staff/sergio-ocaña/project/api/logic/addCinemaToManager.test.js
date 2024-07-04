import addCinemaToManager from './addCinemaToManager.js'

import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            addCinemaToManager('667d6925fc9e2642ebf52581', '6682f4966b94b0dd9a25382a')
                .then(() => console.log('cinema added'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
