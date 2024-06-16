import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

// Sample images (replace with your actual image URLs)
import John from "../../assets/images/JohnSnow.png";
import Dany from "../../assets/images/Dany.png";

const LandingPage = ({ logo }) => {
  const userCountRef = useRef(null); // Ref for the user count section
  const [userCount, setUserCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const options = {
      root: null, // Null means it uses the viewport
      rootMargin: "0px", // Margin around the root. Here, no margin.
      threshold: 0.5, // Percentage of the target's visibility needed to trigger the callback
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // Set isVisible to true when userCount section is visible
          observer.unobserve(entry.target); // Stop observing once section is visible
        }
      });
    }, options);

    // Observe the userCountRef element
    if (userCountRef.current) {
      observer.observe(userCountRef.current);
    }

    // Cleanup function
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setUserCount((prevCount) => {
          const newCount = prevCount + 4; // Increase by 23 (adjust speed as needed)
          return newCount <= 2300 ? newCount : 2300; // Cap the count at 2300
        });
      }, 2); // Interval time (adjust for desired animation speed)

      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [isVisible]);

  return (
    <div className="landing-container">
      <div className="header">
        <img src={logo} alt="ProManage Logo" className="landing-logo" />
        <div className="nav-links">
          <Link to="/about" className="text-link">
            About
          </Link>
          <Link to="/contact" className="text-link">
            Contact
          </Link>
          <div className="button-group">
            <Link to="/login">
              <button className="btn login-btn">Login</button>
            </Link>
            <Link to="/signup">
              <button className="btn signup-btn">Sign Up</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="content">
        <h1>Welcome to Pro Manage</h1>
        <p>Manage your tasks efficiently and effectively</p>
        <div className="feature-icons">
          <div className="feature-icon">
            <i className="fas fa-tasks"></i>
            <p>Task Management</p>
          </div>
          <div className="feature-icon">
            <i className="fas fa-calendar-alt"></i>
            <p>Calendar Integration</p>
          </div>
          {/* Add more feature icons or cards as needed */}
        </div>
        <div className="testimonials">
          <div className="testimonial">
            <p>"Great app! It helped me organize my tasks efficiently."</p>
            <div className="testimonial-author">
              <img src={John} alt="John Doe" className="rounded-image" />
              <p className="author">John Snow</p>
            </div>
          </div>
          <div className="testimonial">
            <p>"Awesome features! Very user-friendly interface."</p>
            <div className="testimonial-author">
              <img src={Dany} alt="Jane Smith" className="rounded-image" />
              <p className="author">Dany</p>
            </div>
          </div>
          {/* Add more testimonials as needed */}
        </div>
        <div ref={userCountRef} className="user-count-section">
          <h2>Join over</h2>
          <div className="user-count">{userCount + " +"}</div>
          <h2>users managing their tasks with us!</h2>
        </div>
        <div className="call-to-action">
          <Link to="/features" className="btn cta-btn">
            Explore Features
          </Link>
          <Link to="/pricing" className="btn cta-btn">
            View Pricing
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
