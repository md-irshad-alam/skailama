import projectModel from "../models/project.model.js";
import transcriptModel from "../models/transcript.model.js";

const createProject = async (req, res) => {
  const { name } = req.body;
  try {
    if (!name) {
      return res.status(301).send({ message: "invalid input!" });
    }
    const ressult = await projectModel.create({ name });
    res.status(201).send({ message: "Project Created", data: ressult });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "internal Error!" });
  }
};

const getProject = async (req, res) => {
  try {
    const projects = await projectModel.aggregate([
      {
        $lookup: {
          from: "transcripts",
          localField: "_id",
          foreignField: "projectId",
          as: "transcripts",
        },
      },
      {
        $project: {
          name: 1,
          createdAt: 1,
          transcriptCout: { $size: "$transcripts" },
        },
      },
    ]);

    // console.log(projects);
    res.status(200).send({ data: projects });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "internal Error!" });
  }
};

export { createProject, getProject };
