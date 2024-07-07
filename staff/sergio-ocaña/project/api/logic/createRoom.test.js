import createRoom from './createRoom.js'

import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            createRoom('667f1a6c57cb4db689a3418e', '668412c453ab9bc323fa24a7', '1', '35')
                .then(() => console.log('room created'))
                .catch(error => console.error(error.message))
        } catch (error) {
            console.error(error)
        }
    })