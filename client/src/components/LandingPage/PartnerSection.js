import React from "react";
import "./PartnerSection.css";
import insta from "../../assets/images/Instagram.svg";
import spotify from "../../assets/images/Spotify.svg";
import zoom from "../../assets/images/Zoom.svg";
import youtube from "../../assets/images/Youtube.svg";
import facebook from "../../assets/images/Facebook.svg";
import snapchat from "../../assets/images/Snapchat.svg";
import whatsapp from "../../assets/images/Whatsapp.svg";
import tiktok from "../../assets/images/Tiktok.svg";
import linkedin from "../../assets/images/LinkedIn.svg";
import discord from "../../assets/images/Discord.svg";

const partners = [
  { src: insta, alt: "Instagram" },
  { src: spotify, alt: "Spotify" },
  { src: zoom, alt: "Zoom" },
  { src: youtube, alt: "YouTube" },
  { src: facebook, alt: "Facebook" },
  { src: snapchat, alt: "Snapchat" },
  { src: tiktok, alt: "Tiktok" },
  { src: whatsapp, alt: "Whatsapp" },
  { src: linkedin, alt: "LinkedIn" },
  { src: discord, alt: "Discord" },
];

const PartnerSection = () => {
  return (
    <div className="partner-section">
      <h2>Our Trusted Partners</h2>
      <div className="partner-logos">
        {partners.map((partner, index) => (
          <div className="partner-logo" key={index}>
            <img src={partner.src} alt={partner.alt} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnerSection;
