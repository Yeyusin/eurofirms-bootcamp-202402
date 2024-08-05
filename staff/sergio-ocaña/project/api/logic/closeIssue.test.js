import mongoose from 'mongoose'
import closeIssue from './closeIssue.js'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            closeIssue('669e3f9f595f14db65b23a19', '66b020691ead207d8496d539')
                .then(() => console.log('issue closed'))
                .catch(error => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })