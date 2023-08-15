const mongoose = require("mongoose")

const user = new mongoose.Schema({


    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type :String,
        enum:["admin","user"],
        
    },
    following_app: [
        {
            obj_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'App'
            },
            status: {
                type: String,
                enum: ["Using","Yes", "No", "Maybe",],
                default: 'No'

            }, 
            subscription: {
                date: {
                    type: Date,
                    default: Date.now()
                }, amount: {
                    type: Number,
                    required: true,
                    default: 0 
                }, duration: {
                    type: Number,
                    required: true,
                    default: 0
                },package :{
                    type :String,
                    default : 0
                    
                },comment:[{
                     type :mongoose.Schema.Types.ObjectId,
                     ref : "comment",
                     required:true
                }]

            }
        }
    ],

// enter user data ,
//  pricing data ,
 



}, {
    timestamps: true,
    get: time => time.toDateString()
})



module.exports = mongoose.model("user", user)





