 import mongoose from  ("mongoose");

// not used 
const UserSchema = new mongoose.Schema({
  name: String,
  email: String
  
  
});

module.exports = mongoose.model("UserEmbed", UserSchema);
