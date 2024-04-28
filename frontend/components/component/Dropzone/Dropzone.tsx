import { getCookie } from "cookies-next";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaFileUpload } from "react-icons/fa";

export default function Dropzone() {
 let [file, setFile] = useState<File | null>(null); // Specify the type for the 'file' state variable
 const onDrop = useCallback((acceptedFiles: File[]) => { // Specify the type for the 'acceptedFiles' parameter
    // Do something with the files, such as uploading them or processing them
    console.log(acceptedFiles[0]);
    setFile(acceptedFiles[0]);
 }, []);
 const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

 // Function to check if the file is an image
 const isImage = (file: File): boolean => {
    return file.type.startsWith("image/");
 };
//  const uploadFile = async (e) => {
//     try {
//        // Make a POST request to the server with the file data
//        const response = await fetch("api/file/upload", {
//           method: "POST",
//           body: ,
//           headers: {
//               "Content-Type": "multipart/form-data",
//               Authorization: "Bearer " + getCookie("JWT"), // Add the JWT token to the headers
//             },
//        });
//        if (response.ok) {
//         response.json().then((data) => {
//           console.log(data);
//         });
//        } else {
//           console.error("File upload failed");
//        }
//     } catch (error) {
//        console.error("An error occurred while uploading the file", error);
//     }
//  }


 return (
  
    <div {...getRootProps()} className="p-5 flex flex-col items-center">
      <input {...getInputProps()} />
      <FaFileUpload className="m-4" />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : file ? (
        isImage(file) ? (
          <img src={URL.createObjectURL(file)} alt={file.name} style={{ maxWidth: '100%', maxHeight: '200px' }} />
        ) : (
          <p>{file.name}</p>
        )
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
 );
}
