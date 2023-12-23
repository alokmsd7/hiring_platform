import React from "react";
import { Link } from "react-router-dom";
import backgroundImg from "./img1.jpg"; // Adjust the path based on your project structure
import "./Home.css";

function Home(props) {
  return (
    <div className="home-container" style={{ backgroundImage: `url(${backgroundImg})` }}>
      <div className="links-container">
        <h1>
          <Link to="/login" className="curved-box">
            Login
          </Link>
        </h1>
        <br />
        <h1>
          <Link to="/signup" className="curved-box">
            Signup
          </Link>
        </h1>
      </div>

      <div className="welcome-message">
        <h2>{props.name ? `Welcome, ${props.name}!` : "Login, please"}</h2>
      </div>
    </div>
  );
}

export default Home;
