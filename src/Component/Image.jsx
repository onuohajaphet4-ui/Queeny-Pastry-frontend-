import { useState } from "react";
import axios from "axios";
import "./Image.css";


const Upload = ({ setImageUrl }) =>{
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setMessage("");
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
     const res = await axios.post("http://localhost:3000/api/product/image", formData);
     console.log("Image :" , res.data)
      if (res?.data?.imageUrl && typeof setImageUrl === "function") {
  setImageUrl(res.data.imageUrl);
}
      setMessage("Upload successful ✅ ");
    } catch (err) {
      setMessage("Upload failed ❌ ");
       setError(err?.response?.data?.error || "Registration failed");
    }
  };

  return (
   <div>
      
    <div className="page">
      
      <div className="cardd">
        <h2>Upload Gallery Image</h2>
        <p className="sub">Upload 1 image only</p>

        <label className="upload-box">
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <span>Select Image</span>
        </label>

        {preview && (
          <img src={preview} alt="preview" className="preview" />
        )}

        <button onClick={handleUpload} className="cardd-button">Upload</button>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
    </div>
  );
}

export default Upload