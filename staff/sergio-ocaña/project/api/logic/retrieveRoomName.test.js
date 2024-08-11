import retrieveRoomName from './retrieveRoomName.js'

import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            retrieveRoomName('669e3f9f595f14db65b23a19', '66aba81ec09ef7f3a8197b0d')
                .then(room => console.log(room))
                .catch(error => console.error(error.message))
        } catch (error) {
            console.error(error)
        }
    })