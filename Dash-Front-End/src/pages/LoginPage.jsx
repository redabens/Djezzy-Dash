import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useCallback } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import LogoLogin from "../components/LogoLogin";
import "../styles/LoginPage.css";
export default function LoginPage() {
  const navigate = useNavigate();
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
  const handleLogin = async () => {
    axios.post("http://localhost:5000/login",
      {username:watch('username'),password:watch('password')})
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data)
          localStorage.setItem("token", res.data.token);
          navigate("/");
        }
      }).catch((error)=>{
        if(error.response){
          alert(error.response.data.message);
        }
      })
  };
  const handleError = async () => {};
  const handleTooglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="login-page-container">
      <div className="login-page">
        <div className="logo-djezzy">
          <LogoLogin />
        </div>
        <div className="login-form">
          <h2 className="login-header">Authentication</h2>
          <div className="formLogin">
            <form onSubmit={handleSubmit(handleLogin, handleError)}>
              <div className="form-inputs">
                <div className="field">
                  <label htmlFor="username">USERNAME</label>
                  <input
                    className="username-input"
                    name="username"
                    type="text"
                    placeholder="Enter the username..."
                    {...register("username", registerOptions.username)}
                  />
                  <small className="text-danger">
                    {errors?.username && errors.username.message}
                  </small>
                </div>
                <div className="field">
                  <label htmlFor="password">PASSWORD</label>
                  <div className="password-field">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password..."
                      {...register("password", registerOptions.password)}
                    />
                    {showPassword ? (
                      <img
                        src="/assets/oeilFerme.svg"
                        alt="oeil_icon"
                        className="imgP"
                        onClick={handleTooglePassword}
                      />
                    ) : (
                      <img
                        src="/assets/oeilOuvert.svg"
                        alt="oeil_icon"
                        className="imgP"
                        onClick={handleTooglePassword}
                      />
                    )}
                  </div>
                  <small className="text-danger">
                    {errors?.password && errors.password.message}
                  </small>
                  <div className="mdps-oublie">
                    <p>Mot de passe oublié?</p>
                  </div>
                </div>
              </div>
              <button type="submit">Login now</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
