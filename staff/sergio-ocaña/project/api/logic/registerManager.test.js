import mongoose from 'mongoose';
import registerManager from './registerManager.js';

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            registerManager('Bebe Jefazo', '2000-01-01', 'bebejefazo@gmail.com', '12341234')
                .catch(error => console.error(error))
                .then(() => console.log('manager created'))
        } catch (error) {
            console.error(error)
        }
    })