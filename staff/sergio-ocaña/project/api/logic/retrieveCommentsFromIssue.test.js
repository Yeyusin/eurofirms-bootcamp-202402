import retrieveCommentsFromIssue from './retrieveCommentsFromIssue.js'

import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            retrieveCommentsFromIssue('669a7e6492f2e1bb5b9cbcf2', '66b175a0696756f5c2b2c88c')
                .then(({ comments, issue }) => console.log('comments,issue retrieved', comments, issue))
                .catch(error => console.error(error.message))
        } catch (error) {
            console.error(error)
        }
    })