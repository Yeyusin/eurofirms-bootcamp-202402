import asignTicket from './asignTicket.js'

import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            asignTicket('669a7e6492f2e1bb5b9cbcf2', '66b5648763c636a1fec80fa7')
                .then(() => console.log('ticket asigned'))
                .catch(error => console.error(error.message))
        } catch (error) {
            console.error(error)
        }
    })