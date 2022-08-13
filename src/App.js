import React from "react";
import FileUploadPage from "./components/FileUploadPage";
import FirebaseTable from "./FirebaseTable";

function App() {
  return (
    
    <div>
      <h1>Upload Resume</h1>
      <FileUploadPage />
      <FirebaseTable />
    </div>
  );
}

export default App;

