import deleteTicket from './deleteTicket.js'

import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            deleteTicket('66ad34549584ffcded1d4939', '66b5647919c1fee8b2ad7dc5')
                .then(() => console.log('ticket deleted'))
                .catch(error => console.error(error.message))
        } catch (error) {
            console.error(error)
        }
    })