const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    // default: 'Linda Kovacs',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Email address not valid ',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8
    // validate: {
    //   validator(v) {
    //     return /^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}*$/gm.test(
    //       v
    //     );
    //   },
    // },
  },
});

module.exports = mongoose.model('user', userSchema);