import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useCallback } from "react";
import { useOutletContext,useNavigate } from "react-router-dom";
import "../styles/LoginPage.css"
import WhiteLogo from "../components/WhiteLogo";
export default function LoginPage(){
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
      } = useForm();
    return (
        <div className="login-page">
            <div className="login-form">
                <div className="logo-djezzy">
                    <WhiteLogo />
                </div>
                <form>
                    <input type="text" placeholder="Username" />
                    <input type="password" placeholder="Password" />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}