import updateComment from './updateComment.js'

import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            updateComment('669a7e6492f2e1bb5b9cbcf2', '66b2c0476568a998a6123a5a', 'no funciona porque vagos')
                .then(() => console.log('comment updated'))
                .catch(error => console.error(error.message))
        } catch (error) {
            console.error(error)
        }
    })