import retrieveComment from './retrieveComment.js'

import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/project')
    .catch(error => console.error(error))
    .then(() => {
        try {
            retrieveComment('669e3f9f595f14db65b23a19', '66b3e92fcf51fd1f7fd93a94')
                .then(comment => console.log('retrieved comment', comment))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })