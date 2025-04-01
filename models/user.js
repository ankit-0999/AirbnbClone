const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        // unique: true // 👈 Ensure emails are unique
    }
});

// ✅ Apply plugin to schema (NOT User)
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
