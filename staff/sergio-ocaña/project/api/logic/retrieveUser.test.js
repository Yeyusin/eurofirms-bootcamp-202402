import mongoose from 'mongoose'
import retrieveUser from './retrieveUser.js'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            retrieveUser('669e3f9f595f14db65b23a19', '669e3f9f595f14db65b23a19')
                .then(user => console.log('user retrieved', user))
                .catch(error => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })