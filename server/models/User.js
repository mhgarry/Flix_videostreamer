const { Schema, model } = require("mongoose");
const passport = require('passport');
const { GraphQLLocalStrategy } = require('graphql-passport');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const validateEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validateEmail, 'You must enter a valid email address.'],
  },
  password: {
    type: String,
    required: true,
    min: 6,
    validate: {
      validator: function (value) {
        const reference = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;
        return value.match(reference);
      },
      message:
        "The password must be 8-10 characters long and contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.",
    },
  },
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: 'video',
    },
  ],
});

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const encryptedPassword = await bcrypt.hash(this.password, 10);
    this.password = encryptedPassword;
  }
  next();
});

userSchema.methods.validatePassword = async function (formPassword) {
  const isValid = await bcrypt.compare(formPassword, this.password);
  return isValid;
};

const User = model('user', userSchema);

module.exports = User;
