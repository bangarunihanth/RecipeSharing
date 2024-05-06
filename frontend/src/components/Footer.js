import React from 'react'
import logo from "../assets/hacklogo.png"
import { BsTwitter } from 'react-icons/bs'
import {SiLinkedin} from "react-icons/si"
import { BsYoutube } from 'react-icons/bs'
import {FaFacebookF} from "react-icons/fa"
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer-wrapper'>
        <div className='footer-section-one'>
            <div className='footer-logo-container'>
                <img src={logo} alt="EnviGo Logo"/>
            </div>
            <div className='footer-icons'>
                <BsTwitter />
                <SiLinkedin />
                <BsYoutube/>
                <FaFacebookF/>
            </div>
        </div>
        <div className='footer-section-two'>
            <div className='footer-section-columns'>
                <span>Quality</span>
                <span>Help</span>
                <span>Share</span>
                <span>Contact</span>
            </div>
            <div className='footer-section-column'>
            <span>888-4444-5555</span>
            <br></br>
            <span>envigocustomer@gmail.com</span>
            <br></br>
            <span>envigoofficial@gmail.com</span>  
            </div>
            <div className='footer-section-columns'>
            <span>Terms & Conditions</span>
            <span>Privacy</span>
            </div>
        </div>
    </div>
  )
}
export default Footer;
