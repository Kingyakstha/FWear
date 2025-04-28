import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import dbService from "../appwrite/config";
import { nanoid } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

function Addproduct() {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [preview, setPreview] = useState(null);
    const uploadfile = (event) => {
        // dbService.uploadFile(file)
        console.log("hi");
        // console.log(event.target.files[0])

        const selectedFile = event.target.files[0];

        // Validate the file type (optional)
        if (selectedFile && selectedFile.type.startsWith("image/")) {
            // Generate a preview URL
            const reader = new FileReader();
            reader.onload = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        } else {
            alert("Please select an image file.");
        }
    };

    const addproduct = async (data) => {
        // dbService.uploadFile()
        console.log("hi");
        const reff = await dbService.uploadFile(data.file[0]);
        if (reff) {
            const image = reff.$id;
            // data.ProductId=nanoid()
            // console.log('id ',data.ProductId)
            data.New_price = Number(data.New_price);
            data.Image = image;
            const post = await dbService.addProduct({ ...data });
            console.log("added ", post);
            if (post) navigate("/");
        }
    };

    return (
        <div className="w-screen flex flex-col  items-center bg-fuchsia-100 p-14">
            <div onSubmit={handleSubmit()} className="">
                {preview === null ? (
                    <div className="flex flex-col w-full h-60 border-dashed border-2 border-black rounded-2xl p-4 items-center gap-24">
                        <p className="mt-2 font-bold text-4xl ">
                            Upload your file here
                        </p>
                        <label
                            htmlFor="file-upload"
                            className="border-black border-2 w-1/3 rounded-full px-2 py-1 text-base "
                        >
                            Browse
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            className="place-items-end invisible"
                            {...register("file", {
                                required: true,
                                onChange: uploadfile,
                            })}
                        />
                    </div>
                ) : (
                    <>
                        <img src={preview} className="h-60 mx-auto p-4"></img>
                        <p
                            onClick={() => setPreview(null)}
                            className="rounded-full px-2 bg-black text-white absolute cursor-pointer top-0 -right-8"
                        >
                            X
                        </p>
                    </>
                )}
            </div>

            <div className="mt-20 bg-white w-1/4 p-4 rounded-xl space-y-2">
                <p className="text-lg">Product details</p>
                <Input
                    label="Name :"
                    placeholder="Name "
                    className="border-2  rounded-md px-2 py-1"
                    {...register("Name", { required: true })}
                />
                <Input
                    label="Category :"
                    placeholder="Male or Female "
                    className="border-2  rounded-md px-2 py-1"
                    {...register("Category", { required: true })}
                />
                <Input
                    label="Price"
                    placeholder="Price.."
                    className="border-2  rounded-md px-2 py-1"
                    {...register("New_price", { required: true })}
                />
                <Input
                    label="Description"
                    placeholder="....."
                    className="border-2  rounded-md px-2 py-1"
                    {...register("Description", { required: true })}
                />
                <button
                    onClick={handleSubmit(addproduct)}
                    className="bg-red-500 text-white px-4 py-1 text-xl rounded-lg"
                >
                    Add
                </button>
            </div>
        </div>
    );
}

export default Addproduct;

// import React, { useState } from "react";

// const FileUploader = () => {
//   const [file, setFile] = useState(null); // Store the selected file
//   const [previewUrl, setPreviewUrl] = useState(null); // Store the preview URL

//   // Handle file input changes
//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];

//     // Validate the file type (optional)
//     if (selectedFile && selectedFile.type.startsWith("image/")) {
//       setFile(selectedFile);

//       // Generate a preview URL
//       const reader = new FileReader();
//       reader.onload = () => {
//         setPreviewUrl(reader.result);
//       };
//       reader.readAsDataURL(selectedFile);
//     } else {
//       alert("Please select an image file.");
//     }
//   };

//   // Submit the file (for demonstration purposes, no actual server call here)
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (file) {
//       console.log("File uploaded:", file.name);
//     } else {
//       alert("No file selected!");
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", padding: "20px" }}>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
//           <strong>Select File:</strong>
//         </label>
//         <input
//           id="file-upload"
//           type="file"
//           accept="image/*"
//           style={{ display: "none" }}
//           onChange={handleFileChange}
//         />
//         <button type="submit" style={{ marginLeft: "10px" }}>
//           Upload
//         </button>
//       </form>

//       {/* Show Preview */}
//       {previewUrl && (
//         <div style={{ marginTop: "20px" }}>
//           <h4>Image Preview:</h4>
//           <img src={previewUrl} alt="Preview" style={{ width: "200px" }} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileUploader;
