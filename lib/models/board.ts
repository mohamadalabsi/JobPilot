import mongoose, { Schema, Document } from "mongoose";

//! we are using here mongose types 
export interface IBoard extends Document {
  // define the field and their types we want to include in the document
  name: string;
  userId: string;
  columns: mongoose.Types.ObjectId[];// list of ids of another collection 
  createdAt: Date;
  updatedAt: Date;
}

// Board -> Columns -> JobApplications


// creating the actual collection 
const BoardSchema = new Schema<IBoard>(
  {
    // inside the object we define all the types we have obove + additional types that specific to mongodb 
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
      index: true,
    },
    columns: [
      {
        type: Schema.Types.ObjectId,
        ref: "Column",
      },
    ],
  },
  {
    timestamps: true, // this will automatically add createdAt and updatedAt fields to the document
  }
);


// register our collection in mongoose and export it
export default mongoose.models.Board ||
  mongoose.model<IBoard>("Board", BoardSchema);