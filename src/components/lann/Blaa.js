import React from 'react';
import './blurgh.css'; // Import custom CSS
import Profile from '../Profile';
import Dashboard from '../Dashboard';
import Home from '../Home';
import Leaderboard from '../Leaderboard';
import History from '../History (1)';
import { Link } from 'react-router-dom';
import ip from '../../ipaddr';
import Navbar from '../Navbar';

const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: 'smooth'
    });
  }
};

const handleLogout = () => {
    fetch(`http://${ip}:8000/api/logout/`, {
      method: "POST",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        Cookies.remove("jwt");
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("username");
        localStorage.removeItem("csrf_token");
        console.log("Logout successful:", data);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

const AppB = () => {
  return (
    <div>
        <Navbar/>
      <header>
        <div className="container">
          <h1 className="logo">Square</h1>
          <nav>
            <ul className="menu">
              <li><Link to="#" onClick={() => scrollToSection("home")}>Home</Link></li>
              <li><Link to="#" onClick={() => scrollToSection("history")}>History</Link></li>
              <li><Link to="#" onClick={() => scrollToSection("dashboard")}>Dashboard</Link></li>
              <li><Link to="#" onClick={() => scrollToSection("leaderboard")}>Leaderboard</Link></li>
              <li><Link to="#" onClick={() => scrollToSection("profile")}>Profile</Link></li>
              <li><Link to="#" onClick={handleLogout}>Logout</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="container">
          <h2>Welcome to Square</h2>
          <p>Your one-stop destination for all your needs.</p>
          <Link to="#" className="btn" onClick={() => scrollToSection("home")}>Get Started</Link>
        </div>
      </section>

      <section className="hero" id="home">
        <div className="container">
          <Home />
        </div>
      </section>

      {/* Add other sections with unique ids */}
      
      <footer>
        <div className="container">
          <p>&copy; 2024 Square. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AppB;