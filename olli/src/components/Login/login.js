import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import SignUpPage from '../SignUp/signUp';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../../CSS/Login/Login.css';
import imageSrc from "../../CSS/Login/im1.png";

function LoginPage() {
  useEffect(() => {
    AOS.init({
      once: false,
      duration: 800
    });
  }, []);

  const [isSignUpClicked, setIsSignUpClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUpClick = () => {
    setIsSignUpClicked(true);
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div>
      <div className="login-container">
        <SignUpPage className={`signup-page ${isSignUpClicked ? 'move-left' : ''}`} />
        <div className={`stripe-pattern ${(isVisible && !isSignUpClicked) ? 'mounted' : ''}${isSignUpClicked ? 'move-right' : ''}`}></div>
        <div className="login-form">
          <div className="logo-container">
            <img data-aos="fade-right" src={imageSrc} alt="Logo" className="logo" />
            <h1 data-aos="fade-right">O.L.L.I</h1>
          </div>
          <p data-aos="fade-right">Welcome back!</p>
          <input
            data-aos="fade-right"
            type="email"
            placeholder="Enter your email here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            data-aos="fade-right"
            type="password"
            placeholder="Enter your password here"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="remember-me">
            <a data-aos="fade-right">Reset password</a>
          </div>
          <button data-aos="fade-right">Sign in</button>
          <hr data-aos="fade-right" className="divider" />
          <button data-aos="fade-right" className="sign-in-with-images-btn">Sign in with Images</button>
          <div className="sign-up">
            <p data-aos="fade-right">Don’t have an account?</p>
            <NavLink data-aos="fade-right" onClick={handleSignUpClick}>Sign up</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;