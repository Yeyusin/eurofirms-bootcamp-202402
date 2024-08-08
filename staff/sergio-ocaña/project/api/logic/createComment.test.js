import createComment from './createComment.js'

import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            createComment('669a7e6492f2e1bb5b9cbcf2', '66b175a0696756f5c2b2c88c', 'no funciona porque no os da la gana')
                .then(() => console.log('comment created'))
                .catch(error => console.error(error.message))
        } catch (error) {
            console.error(error)
        }
    })