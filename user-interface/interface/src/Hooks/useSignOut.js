import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
function useSignOut(){
    const navigate = useNavigate();
    const handleSignOut = () => {
 
        // Clear token or user data from localStorage/sessionStorage
        Cookies.remove('token')
        localStorage.removeItem("userId");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
    
    
        // Redirect to the login page
        navigate("/");
      };

      return {handleSignOut}
}

export default useSignOut;
