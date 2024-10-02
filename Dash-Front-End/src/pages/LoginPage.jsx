import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useCallback } from "react";
import { useOutletContext,useNavigate } from "react-router-dom";
import LogoLogin from "../components/LogoLogin";
import "../styles/LoginPage.css";
export default function LoginPage(){
    const [credentialsErr, setCredentialsErr] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
      } = useForm();
    //------ validations -------
    const registerOptions = {
      username: {
        required: "Entrer votre nom d'utilisateur",
        pattern: {
          // value: /^[^\s@]+@[^\s@]+.[^\s@]+$/,
          message: "Adresse email invalide",
        },
      },
      password: {
        required: "Enrer le mot de passe",
      },
    };
    const handleLogin = async ()=>{

    };
    const handleError = async ()=>{

    }
    const handleTooglePassword = ()=>{
        setShowPassword(!showPassword);
    }
    return (
        <div className="login-page">
            <div className="login-form">
                <div className="logo-djezzy">
                    <LogoLogin />
                </div>
                <div className="formLogin">
                    <form onSubmit={handleSubmit(handleLogin, handleError)}>   
                        <div className="field">
                          <label htmlFor="username">Nom d'utilisateur:</label>
                          <input
                            name="username"
                            type="text"
                            placeholder="saisir le nom d'utilisateur..."
                            {...register("username", registerOptions.username)}
                          />
                          <small className="text-danger">
                            {errors?.username && errors.username.message}
                          </small>
                        </div>
                        <div className="field">
                          <label htmlFor="password">Mot de passe:</label>
                          <div className="password-field">
                            <input
                              name="password"
                              type={showPassword ? "text": "password"}
                              placeholder="saisir le mot de passe..."
                              {...register("password", registerOptions.password)}
                            />
                            {showPassword ? (<img src="/assets/oeilFerme.svg" alt="oeil_icon" className="imgP" onClick={handleTooglePassword}/>)
                            :(<img src="/assets/oeilOuvert.svg" alt="oeil_icon" className="imgP" onClick={handleTooglePassword}/>)}
                          </div>
                          <small className="text-danger">
                            {errors?.password && errors.password.message}
                          </small>
                          <div className="mdps-oublie">
                            <p>Mot de passe oublié?</p>
                          </div>
                        </div>
                        <button type="submit">Connectez-vous maintenant</button>
                    </form>
                </div>
            </div>
        </div>
    );
}