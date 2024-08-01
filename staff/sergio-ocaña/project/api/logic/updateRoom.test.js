import updateRoom from './updateRoom.js'

import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            updateRoom('669e3f9f595f14db65b23a19', '66a8b2fca7a3e4552fedf3f4', '66a900e4b896b79f045769b2', 'Sala 1', '25')
                .then(() => console.log('room updated'))
                .catch(error => console.error(error.message))
        } catch (error) {
            console.error(error)
        }
    })