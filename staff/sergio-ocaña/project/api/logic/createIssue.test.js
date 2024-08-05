import createIssue from './createIssue.js'

import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            createIssue('669a7e6492f2e1bb5b9cbcf2', '66a8b2fca7a3e4552fedf3f4', 'Sala 1', 'cleaning', 'hay papel tirado por todos lados', '66aba81ec09ef7f3a8197b0d')
                .then(() => console.log('issue created'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
