var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var NewsSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  summary: {
    type: String,
    required: false
  },
  articleLink: {
    type: String,
    required: true,
    unique: true
  },
  comments: {
    type: Schema.Types.ObjectId,
    ref: "Comments"
  },
  saved: {
    type: Boolean,
    default: false
  }
});

NewsSchema.methods.savesFunc = function() {
  this.saved = true;
  return this.saved;
};

NewsSchema.methods.unSavesFunc = function() {
  this.saved = false;
  return this.saved;
};

// This creates our model from the above schema, using mongoose's model method
var News = mongoose.model("News", NewsSchema);

// Export the News model
module.exports = News;
