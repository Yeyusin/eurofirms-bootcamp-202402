import mongoose from 'mongoose'
import retrieveTicketById from './retrieveTicketById.js'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            retrieveTicketById('669e3f9f595f14db65b23a19', '66b562ea1788105a459ab830')
                .then(ticket => console.log('ticket retrieved', ticket))
                .catch(error => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })