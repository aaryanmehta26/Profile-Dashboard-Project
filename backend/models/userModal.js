const mongoose = require("mongoose"); // use for schema validation
const bycrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    pic: {
      type: String,
      required: true,
      default:
        "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg",
    },
  },
  {
    timestamps: true,
  }
);

// before saving, enrypt user password for security purposes
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) { // mongoose function, to check if password is changes or not
        next();
    }

    //create a salt
    const salt = await bycrypt.genSalt(10);
    this.password = await bycrypt.hash(this.password, salt);
})

// creating a new function, matchPassword
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bycrypt.compare(enteredPassword, this.password);
  };

const User = mongoose.model("User", userSchema);

module.exports = User;
