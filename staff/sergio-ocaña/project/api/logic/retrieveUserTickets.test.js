import mongoose from 'mongoose'
import retrieveUserTickets from './retrieveUserTickets.js'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            retrieveUserTickets('669a7e6492f2e1bb5b9cbcf2')
                .then(tickets => console.log('tickets retrieved', tickets))
                .catch(error => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })