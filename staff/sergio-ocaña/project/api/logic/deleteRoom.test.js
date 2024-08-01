import deleteRoom from './deleteRoom.js'

import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            deleteRoom('669e3f9f595f14db65b23a19', '66a8b2fca7a3e4552fedf3f4', '66a9018649d46454c4b1c71b')
                .then(() => console.log('room deleted'))
                .catch(error => console.error(error.message))
        } catch (error) {
            console.error(error)
        }
    })