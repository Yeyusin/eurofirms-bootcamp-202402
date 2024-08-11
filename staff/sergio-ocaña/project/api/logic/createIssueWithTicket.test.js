import createIssueWithTicket from './createIssueWithTicket.js'

import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            createIssueWithTicket('669a7e6492f2e1bb5b9cbcf2', '66b7a58038769c1d52e6a77d', 'cleaning', 'prueba ticket')
                .then(() => console.log('issue created'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })