import mongoose from 'mongoose'
import retrieveCinemaIssues from './retrieveCinemaIssues.js'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            retrieveCinemaIssues('669e3f9f595f14db65b23a19')
                .then(issues => console.log('issues retrieved', issues))
                .catch(error => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })