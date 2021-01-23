const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
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
  },
});

module.exports = mongoose.model('article', articleSchema);
