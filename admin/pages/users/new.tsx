import NewPage from "@/components/NewPage/NewPage";
import { userInputs } from "@/formsrc";
import React from "react";

const New = () => {
  return (
    <div>
      <NewPage inputs={userInputs} title={"Add New User"} />
    </div>
  );
};

export default New;
