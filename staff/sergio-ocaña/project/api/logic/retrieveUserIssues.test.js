import mongoose from 'mongoose'
import retrieveUserIssues from './retrieveUserIssues.js'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            retrieveUserIssues('669a7e6492f2e1bb5b9cbcf2')
                .then(issues => console.log('issues retrieved', issues))
                .catch(error => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })