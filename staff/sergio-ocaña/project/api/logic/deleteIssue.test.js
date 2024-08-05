import deleteIssue from './deleteIssue.js'

import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            deleteIssue('66ad34549584ffcded1d4939', '66aec3f2ef03e964949a66f1')
                .then(() => console.log('Issue deleted'))
                .catch((error) => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))