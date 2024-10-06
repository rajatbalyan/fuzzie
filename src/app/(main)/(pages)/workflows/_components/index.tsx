import React from "react";
import Workflow from "./workflow";

type Props = {};

const Workflows = async (props: Props) => {
  // const workflows = await onGetWorkflows();
  return (
    <div className="relative flex flex-col gap-4">
      <section className="flex flex-col m-2">
        <Workflow 
          description="Create a test workflow"
          id="1"
          name="Test Workflow"
          publish={false}
        />
      </section>
    </div>
  );
};

export default Workflows;
