const mongoose = require('mongoose');

const wordModel = new mongoose.Schema(
  {
    slangWords: {
      type: [String],
    },
    rumourWordsSet: {
      type: [String],
    },
  },
  { timestamps: true }
);

const Word = mongoose.model('Word', wordModel);

module.exports = Word;
