const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 150,
  },
  text: {
    type: String,
    required: true,
    minlength: 2,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
    minlength: 2,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^(https?):\/\/(www\.)?[\w-@:%+~#=]+[.][.\w/\-?#=&~@:()!$+%]*$/gm.test(
          v
        );
      },
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^(https?):\/\/(www\.)?[\w-@:%+~#=]+[.][.\w/\-?#=&~@:()!$+%]*$/gm.test(
          v
        );
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
