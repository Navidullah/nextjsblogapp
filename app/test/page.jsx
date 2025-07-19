import React from "react";
import TiptapEditor from "../components/blogeditor/TiptapEditor";

const page = () => {
  return (
    <div className="wrapper prose">
      <h1>Hello World</h1>
      <p>This should be big and nicely styled text.</p>
      <TiptapEditor />
    </div>
  );
};

export default page;
