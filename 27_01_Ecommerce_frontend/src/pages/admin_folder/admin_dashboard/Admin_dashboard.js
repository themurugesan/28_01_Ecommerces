import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './Admin_dashboard.css';  // Import CSS
import Headers from '../../header/adminHeader';
import { Usercontext } from '../../../App';
import { useNavigate } from 'react-router-dom';

const Admin_dashboard = () => {
    const { setTitle } = useContext(Usercontext);  // Only using setTitle from context
    const navigate = useNavigate();
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/images',{
                headers: {
                    Authorization: localStorage.token
                  }
            });
            setImages(data);
        } catch (error) {
            if(error.response.data.code==401){
                alert("unauthorized ")
                navigate("/admin")

                localStorage.clear()
            }
            console.error('Error fetching images:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/images/${id}`);
            fetchImages();  // Refresh the list of images after deletion
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    const handleEdit = (image) => {
        setTitle(image);  // Set the image data in context for editing
        navigate("/adminproduct");  // Navigate to AdminProduct for editing
    };

    return (
        <>
            <Headers />
            <div className="app-container">
                <h1 className="heading">Category</h1>
                <h2>Phone</h2> {/* Example category, update if necessary */}

                <div className="images-container">
                    {images.map((image) => (
                        <div key={image._id} className="image-card">
                            <h2 className="image-title">{image.title}</h2>
                            <p className="image-description">{image.description}</p>
                            <p className="image-price">Price: ${image.amount}</p>
                            <img
                                className="image-thumbnail"
                                src={`http://localhost:5000/${image.image}`}
                                alt={image.title}
                            />
                            <button className="edit-btn" onClick={() => handleEdit(image)}>
                                Edit
                            </button>
                            <button className="delete-btn" onClick={() => handleDelete(image._id)}>
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Admin_dashboard;
