import updateTicket from './updateTicket.js'

import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            updateTicket('669e3f9f595f14db65b23a19', '66b5648763c636a1fec80fa7', '66aba81ec09ef7f3a8197b0d', 'F10-B33')
                .then(() => console.log('ticket updated'))
                .catch(error => console.error(error.message))
        } catch (error) {
            console.error(error)
        }
    })