import mongoose from 'mongoose'
import registerUser from './registerCustomer.js'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            registerUser('Pepito Jimenez', '2000-01-01', 'pepitogrillo@gmail.com', '12341234')

        } catch (error) {
            console.error(error)
        }
    })