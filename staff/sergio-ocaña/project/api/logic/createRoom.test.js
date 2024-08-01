import createRoom from './createRoom.js'

import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            createRoom('669e3f9f595f14db65b23a19', '66a8b2fca7a3e4552fedf3f4', '1', '35')
                .then(() => console.log('room created'))
                .catch(error => console.error(error.message))
        } catch (error) {
            console.error(error)
        }
    })