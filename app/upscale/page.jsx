"use client";

import { useState } from "react";
import { upload } from "../../actions/Usercontrolls";

export default function UpscalePage() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [upscaledImage, setUpscaledImage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Upload and Upscale Image</h1>
      <form
        action={async (formData) => {
          setError(null);
          setLoading(true);
          const response = await upload({}, formData);
          setLoading(false);

          if (response.success) {
            setUploadedImage(response.imagePath);
            setUpscaledImage(response.upscaledPath);
          } else {
            setError(response.error || "Upload failed.");
          }
        }}
      >
        <input type="file" name="file" required accept="image/*" />
        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Upload"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
        {uploadedImage && (
          <div>
            <h3>Original Image</h3>
            <img src={uploadedImage} alt="Uploaded" style={{ maxWidth: "400px", borderRadius: "8px" }} />
          </div>
        )}

        {upscaledImage && (
          <div>
            <h3>Upscaled Image</h3>
            <img src={upscaledImage} alt="Upscaled" style={{ maxWidth: "400px", borderRadius: "8px" }} />
          </div>
        )}
      </div>
    </div>
  );
}
