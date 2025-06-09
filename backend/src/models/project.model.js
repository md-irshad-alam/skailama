import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
  {
    name: { type: String },
  },
  {
    timestamps: true,
    timeseries: true,
  }
);

const projectModel = mongoose.model("project", projectSchema);
export default projectModel;
