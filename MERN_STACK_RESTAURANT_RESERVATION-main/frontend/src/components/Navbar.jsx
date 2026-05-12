import React, { useEffect, useState } from "react";
import { data } from "../restApi.json";
import { Link } from "react-scroll";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
const Navbar = () => {
  const [show, setShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const base = import.meta.env.VITE_API_URL || 'http://localhost:4000'
        const res = await fetch(`${base}/api/v1/auth/me`, {
          method: 'GET',
          credentials: 'include'
        })
        setIsLoggedIn(res.ok)
      } catch (_) {
        setIsLoggedIn(false)
      }
    }
    checkAuth()
  }, [])

  const handleAuthClick = async () => {
    if (!isLoggedIn) {
      navigate('/auth')
      return
    }
    try {
      const base = import.meta.env.VITE_API_URL || 'http://localhost:4000'
      const res = await fetch(`${base}/api/v1/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      })
      if (!res.ok) throw new Error('Logout failed')
      toast.success('Logged out')
      setIsLoggedIn(false)
      navigate('/')
    } catch (err) {
      toast.error(err.message || 'Logout failed')
    }
  }
  return (
    <>
      <nav>
        <div className="logo">The Restaurant</div>
        <div className={show ? "navLinks showmenu" : "navLinks"}>
          <div className="links">
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/about">About Us</RouterLink>
            <RouterLink to="/services">Services</RouterLink>
            <RouterLink to="/team">Team</RouterLink>
            <RouterLink to="/reservation">Reservation</RouterLink>
            <RouterLink to="/menu">Our Menu</RouterLink>
          </div>
          <button onClick={handleAuthClick} className="adminBtn" style={{ marginLeft: 12 }}>
            {isLoggedIn ? 'Logout' : 'Register/Login'}
          </button>
        </div>
        <div className="hamburger" onClick={()=> setShow(!show)}>
                <GiHamburgerMenu/>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
