var mongoose = require('mongoose');
const User = require('./user');

const messageSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
            maxlength: 160
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },

    {
        timestamps: true //adds createdat/updateat
    }
);

messageSchema.pre('remove', async function(next){
    try {
        let user = User.findById(this.user);
        user.message.remove(this.id);
        await user.save();
        return next()
    } catch(err){
        return next(err)
    }
})

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;