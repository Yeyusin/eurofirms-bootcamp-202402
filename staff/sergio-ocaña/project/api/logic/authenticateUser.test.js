import authenticateUser from './authenticateUser.js'
import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            authenticateUser('carolitogym@gmail.com', '12341234')
                .then((id, role) => console.log('user logged in', id, role))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })