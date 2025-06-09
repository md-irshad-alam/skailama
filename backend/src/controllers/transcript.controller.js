import transcriptModel from "../models/transcript.model.js";
const transcriptController = async (req, res) => {
  const { name, transcript, projectId } = req.body;
  try {
    if (!name || !transcript) {
      return res.status(301).send({ message: "invalid input!" });
    }
    const transObj = await transcriptModel({
      name: name,
      transcript: transcript,
      projectId: projectId,
    });
    await transObj.save();

    res.status(201).send({ message: "Project Created", data: transObj });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "internal Error!" });
  }
};
const getTranscript = async (req, res) => {
  const { q: projectId } = req.query;

  try {
    let query = {};
    if (projectId) {
      query.projectId = projectId;
    }

    const transcripts = await transcriptModel.find(query).populate("projectId");
    res.status(200).send({ data: transcripts });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "internal Error!" });
  }
};

const updateTranscript = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const { transcript } = req.body;
  try {
    const updated = await transcriptModel.findByIdAndUpdate(
      id,
      { transcript },
      { new: true }
    );
    if (!updated) {
      return res.status(404).send({ message: "Transcript not found" });
    }
    res.status(200).send({ message: "Transcript Updated", data: updated });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "internal Error!" });
  }
};

const deleteTranscript = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await transcriptModel.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).send({ message: "Transcript not found" });
    }
    res.status(200).send({ message: "Transcript Deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "internal Error!" });
  }
};

export {
  transcriptController,
  getTranscript,
  updateTranscript,
  deleteTranscript,
};
