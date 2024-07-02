import addCinemaToManager from './addCinemaToManager.js'

import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            addCinemaToManager('667f1a6c57cb4db689a3418e', '668412c453ab9bc323fa24a7')
                .then(() => console.log('cinema added'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
