import mongoose from 'mongoose'

const { Schema, model } = mongoose

const { Types: { ObjectId } } = Schema

const cinema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true,
        unique: true
    }
})

const user = new Schema({
    name: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    cinema: {
        type: ObjectId,
        ref: 'Cinema'
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        requiered: true,
        enum: ['customer', 'manager'],
        default: 'customer'
    }

})
const room = new Schema({
    name: {
        type: String,
        required: true,
    },
    cinema: {
        type: ObjectId,
        ref: 'Cinema'
    },
    temperature: {
        type: String,
        required: true,
    }
})

const Room = model('Room', room)
const Cinema = model('Cinema', cinema)
const User = model('User', user)

export {
    Cinema,
    User,
    Room
}