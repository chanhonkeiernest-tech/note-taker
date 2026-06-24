 import mongoose from  ("mongoose");


const UserSchema = new mongoose.Schema({
  name: String,
  email: String
  // Embedded posts: these are subdocuments stored inside the user document.
  
});

module.exports = mongoose.model("UserEmbed", UserSchema);
