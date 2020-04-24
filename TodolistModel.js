const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodolistModelSchema = new Schema({
    key: Number,
    completed: Boolean,
    title: String,
    Createdat: {
        type: Date,
        default: Date().toLocaleString('zh-TW', {timeZone: 'Asia/Taipei'}),
    },
    updatedat: {
        type: Date,
        default: Date().toLocaleString('zh-TW', {timeZone: 'Asia/Taipei'}),
    }
},{
    timestamps: {   createdAt: 'Createdat',
                    updatedAt: 'Updatedat',
 }
})

const TodolistModel = mongoose.model('TodolistModel',TodolistModelSchema)

module.exports = TodolistModel


