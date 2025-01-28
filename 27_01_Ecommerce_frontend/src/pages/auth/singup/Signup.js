import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import "./Signup.css";
import Header from "../../header/Header";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  // State to manage form data
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: ""
  });

  // State for error message
  const [error, setError] = useState("");

  // Handle changes in form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous error messages

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Validate name (cannot be empty)
    if (!formData.name) {
      setError("Name is required.");
      return;
    }

    // Validate password length (at least 6 characters)
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    // Send signup request to backend
    try {
      const response = await fetch("http://localhost:5000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      // If signup is successful, navigate to login page
      if (response.ok) {
        console.log(result);
        navigate("/login");
      } else {
        setError(result.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error(error.message);
      setError("An error occurred. Please try again later.");
    }

    // Clear form fields after submission
    setFormData({
      email: "",
      name: "",
      password: ""
    });
  };

  return (
    <>
      <Header />
      <div className="center-form">
        <Form onSubmit={handleSubmit}>
          <h1>Signup</h1>

          {/* Display error message if there is one */}
          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Button variant="dark" type="submit" className="w-100">
            Signup
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Signup;
