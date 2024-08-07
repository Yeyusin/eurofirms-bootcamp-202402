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
        ref: 'Cinema',
        required: true
    },
    temperature: {
        type: String,
        required: true,
    }
})

const ticket = new Schema({
    user: {
        type: ObjectId,
        ref: 'User',
    },
    cinema: {
        type: ObjectId,
        ref: 'Cinema',
        required: true
    },
    room: {
        type: ObjectId,
        ref: 'Room',
        required: true
    },
    seat: {
        type: String,
        required: true
    }
})

const issue = new Schema({
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    cinema: {
        type: ObjectId,
        ref: 'Cinema',
        required: true
    },
    room: {
        type: ObjectId,
        ref: 'Room',
    },
    location: {
        type: String,
        required: true
    },
    type: {
        type: String,
        requiered: true,
        enum: ['temperature', 'sound', 'film', 'cleaning']
    },
    description: {
        type: String,
        requiered: true
    },
    status: {
        type: String,
        enum: ['open', 'closed'],
        default: 'open',
        required: true
    },
    ticket: {
        type: ObjectId,
        ref: 'Ticket'
    },
    date: {
        type: Date,
        required: true
    }
})

const comment = new Schema({
    text: {
        type: String,
        requiered: true
    },
    issue: {
        type: ObjectId,
        ref: 'Issue',
        requiered: true
    },
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true
    }
})

const Room = model('Room', room)
const Cinema = model('Cinema', cinema)
const User = model('User', user)
const Ticket = model('Ticket', ticket)
const Issue = model('Issue', issue)
const Comment = model('Comment', comment)

export {
    Cinema,
    User,
    Room,
    Ticket,
    Issue,
    Comment
}