"use client";
import React, { useState } from "react";

import ProjectNavbar from "./ProjectNavbar";
import ProjectHome from "./ProjectHome";
import ProjectList from "./ProjectList";
const CreatePorjectPage = () => {
  const [InputData, setInputData] = useState("");
  const [showPrjectHome, SetshowProjectHome] = useState(true);

  return (
    <div>
      <ProjectNavbar />

      {showPrjectHome == true ? (
        <ProjectHome
          setInputData={setInputData}
          SetshowCreatePage={SetshowProjectHome}
        />
      ) : (
        <ProjectList
          SetshowCreatePage={SetshowProjectHome}
          showCreateProject={showPrjectHome}
        />
      )}
    </div>
  );
};

export default CreatePorjectPage;
