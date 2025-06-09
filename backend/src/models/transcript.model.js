import mongoose from "mongoose";

const transcriptSchema = mongoose.Schema(
  {
    name: { type: String },
    transcript: { type: String },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "project",
    },
  },
  {
    timestamps: true,
    timeseries: true,
  }
);

const transcriptModel = mongoose.model("transcript", transcriptSchema);
export default transcriptModel;
