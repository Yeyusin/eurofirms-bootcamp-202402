import mongoose from 'mongoose'
import retrieveUser from './retrieveUser.js'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            retrieveUser('667f1a6c57cb4db689a3418e', '667f1a6c57cb4db689a3418e')
                .then(user => console.log('user retrieved', user))
                .catch(error => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })