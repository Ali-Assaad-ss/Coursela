import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FaFileUpload } from "react-icons/fa";

export default function Dropzone() {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files, such as uploading them or processing them
    acceptedFiles.forEach((file) => {
      console.log(file.name); // Log the file name
      // You can perform further actions with the file here
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="p-5 flex flex-col items-center">
      <input {...getInputProps()} />
      <FaFileUpload className="" />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
}
