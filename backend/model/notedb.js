import mongoose from 'mongoose';

const noteschema = new mongoose.Schema({
    title: {
        type: String,
        require:true,
        minlength: [1, 'Title cannot be empty'],
        trim: true
    },
    text: {
        type: String,
        trim: true
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'accountdb' }

    }, { timestamps: true });


// Virtuals are computed properties available on the document but not persisted.
noteschema.virtual("user").get(function () {
  if (!this.content) return "";
  return this.content.length > 20
    ? hashPassword+ "..."
    : this.content;
});


// Ensure virtuals are included 
noteschema.set("toJSON", { virtuals: true });

const notedb = mongoose.model('note', noteschema);

export default notedb;