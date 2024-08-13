import deleteCinema from './deleteCinema.js'

import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            deleteCinema('66ad34549584ffcded1d4939', '66ba16f0848171454aa977ce')
                .then(() => console.log('cinema deleted'))
                .catch((error) => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))