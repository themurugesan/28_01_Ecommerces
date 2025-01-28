import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./Admin_dashboard.css"; // Import CSS
import Headers from "../../header/adminHeader";
import { Usercontext } from "../../../App";
import { useNavigate } from "react-router-dom";

const AdminProduct = () => {
  const { title, setTitle } = useContext(Usercontext); // Using context title and setTitle
  const navigate = useNavigate();
  const [productTitle, setProductTitle] = useState(title?.title || ""); // Initialize from context or empty string
  const [description, setDescription] = useState(title?.description || ""); // Initialize from context
  const [amount, setAmount] = useState(title?.amount || ""); // Initialize from context
  const [file, setFile] = useState(null);
  const [editMode, setEditMode] = useState(false); // To handle editing mode
  const [currentImageId, setCurrentImageId] = useState(null); // ID of the image being edited

  useEffect(() => {
    if (title && title._id) {
      setProductTitle(title.title);
      setDescription(title.description);
      setAmount(title.amount);
      setEditMode(true);
      setCurrentImageId(title._id);
    } else {
      setEditMode(false); // If no image context, it's in "add new" mode
    }
  }, [title]); // Update local state if the context title changes

  const handleUpload = async (e) => {
    e.preventDefault();

    // Form validation
    if (!productTitle || productTitle.length < 3) {
      alert("Title must be at least 3 characters long.");
      return;
    }

    if (!description || description.length < 3) {
      alert("Description must be at least 3 characters long.");
      return;
    }

    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Amount must be a valid number greater than zero.");
      return;
    }

    if (!file && !editMode) {
      alert("Please select an image file.");
      return;
    }

    // Proceed with form submission if validation passes
    const formData = new FormData();
    formData.append("title", productTitle);
    formData.append("description", description);
    formData.append("amount", amount);
    if (file) formData.append("image", file);

    try {
      if (editMode && currentImageId) {
        // Update an existing image
        await axios.put(
          `http://localhost:5000/images/${currentImageId}`,
          formData
        );
      } else {
        // Create a new image
        await axios.post("http://localhost:5000/upload", formData);
      }

      // Reset form after successful upload
      setProductTitle("");
      setDescription("");
      setAmount("");
      setFile(null);

      // Reset the context title
      setTitle({ title: "", description: "", amount: "" });

      // Navigate back to dashboard
      navigate("/admindashboard");
    } catch (error) {
      alert("Error uploading image. Please try again.");
    }
  };

  return (
    <>
      <Headers />
      <div className="app-container">
        <h1 className="heading">{editMode ? "Edit Product" : "Add Product"}</h1>
        <form className="upload-form" onSubmit={handleUpload}>
          <input
            type="text"
            className="input-field"
            placeholder="Title"
            value={productTitle}
            onChange={(e) => setProductTitle(e.target.value)}
          />
          <input
            type="text"
            className="input-field"
            placeholder="Product Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            className="input-field"
            placeholder="Product Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <input
            type="file"
            className="input-field"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button className="submit-btn" type="submit">
            {editMode ? "Update" : "Upload"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AdminProduct;
