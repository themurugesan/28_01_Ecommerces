import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/auth/login/Login";
import Signup from "./pages/auth/singup/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import Admin from "./pages/admin_folder/admin/admin";
import Admindashboard from "./pages/admin_folder/admin_dashboard/Admin_dashboard";
import AdminProduct from "./pages/admin_folder/admin_dashboard/AdminProduct";
import Header from "./pages/header/Header";
import CartPage from "./pages/cart/CardPage";
import { createContext, useState } from "react";
import FirstPage from "./pages/FirstPage";
import adminSignup from "./pages/auth/adminsingup/adminsingup";
import AdminSignup from "./pages/auth/adminsingup/adminsingup";

// Create context for user title state
export const Usercontext = createContext();

function App() {
  const [title, setTitle] = useState('');

  return (
    <div className="App">
      <Usercontext.Provider value={{ title, setTitle }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<FirstPage/>} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admindashboard" element={<Admindashboard />} />
            <Route path="/adminproduct" element={<AdminProduct />} />
            <Route path="/adminsignup" element={<AdminSignup/>}/>
            <Route path="/cart" element={<CartPage />} />
            
            {/* Catch-all route for 404 pages */}
            <Route path="*" element={<h1>404 - Page Not Found</h1>} />
          </Routes>
        </BrowserRouter>
      </Usercontext.Provider>
    </div>
  );
}

export default App;
