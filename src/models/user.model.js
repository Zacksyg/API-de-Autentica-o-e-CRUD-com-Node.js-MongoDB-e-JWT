const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email:{
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase:true,
        },
        password: {
            type: String,
            required: true,
            selected: false,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre('save', async function (){
    if (!this.isModified('password')){
        return 
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);
module.exports = User