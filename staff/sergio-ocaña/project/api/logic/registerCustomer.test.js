import mongoose from 'mongoose'
import registerCustomer from './registerCustomer.js'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            registerCustomer('Carolito Gym', '2000-01-01', 'carolitogym@gmail.com', '12341234')
                .then(user => console.log('user registered', user))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })  