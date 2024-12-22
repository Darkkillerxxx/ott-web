import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDashboard,
  faFilm,
  faTv,
  faUser,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { AppText } from "./AppText";
import Logo from "../assets/logo.jpg";

const Menu = () => {
  const menuSections = [
    {
      section: "Dashboard",
      links: [
        { label: "View Dashboard", name: "", icon: faDashboard },
      ],
    },
    {
      section: "Add Content",
      links: [
        { label: "Add Movies", name: "addMovie", icon: faFilm },
        { label: "Add Shows", name: "addShows", icon: faTv },
      ],
    },
    {
      section: "Manage Content",
      links: [
        { label: "Manage Movies", name: "manageMovies", icon: faFilm },
        { label: "Manage Live Shows", name: "manageLiveShows", icon: faTv },
        { label: "Manage Shows", name: "manageShows", icon: faTv },
      ],
    },
    {
      section: "Profile",
      links: [{ label: "View Profile", name: "profile", icon: faUser }],
    },
    {
      section: "Log Out",
      links: [{ label: "Log Out", name: "logout", icon: faSignOutAlt }],
    },
  ];

  return (
    <div style={{ width: "100%", height: "100%", display: "flex" }}>
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          padding: "20px", // Added padding for spacing
          backgroundColor: "#fff",
          position: "relative", // Ensure logo is above content
        }}
      >
        {/* Logo - Top Left */}
        <div
          style={{
            position: "absolute",
            top: "20px", // Distance from top
            left: "20px", // Distance from left
          }}
        >
          <img
            src={Logo}
            alt="Logo"
            style={{
              width: "150px", // Adjust width as needed
              height: "auto",
              objectFit: "contain",
            }}
          />
        </div>

        {/* Menu Content Below Logo */}
        <div style={{ marginTop: "125px" }}> {/* Space for logo */}
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {menuSections.map((section) => (
              <li key={section.section} style={{ marginBottom: "20px" }}>
                {/* Section Header */}
                <AppText
                  style={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    marginBottom: "10px",
                    color: "grey",
                    textTransform: "uppercase",
                  }}
                >
                  {section.section}
                </AppText>
                <hr
                  style={{
                    border: "none",
                    borderTop: "1px solid grey",
                    margin: "5px 0",
                  }}
                />
                {/* Links */}
                <ul style={{ listStyleType: "none", paddingLeft: "10px" }}>
                  {section.links.map((link) => (
                    <li key={link.name} style={{ marginBottom: "8px" }}>
                      <Link
                        to={`/${link.name}`}
                        style={{
                          textDecoration: "none",
                          color: "#000",
                          fontSize: "14px",
                          padding: "5px 10px",
                          display: "flex",
                          alignItems: "center",
                          borderRadius: "4px",
                          transition: "background-color 0.3s",
                        }}
                        onMouseOver={(e) =>
                          (e.target.style.backgroundColor =
                            "rgba(0, 0, 0, 0.1)")
                        }
                        onMouseOut={(e) =>
                          (e.target.style.backgroundColor = "transparent")
                        }
                      >
                        <FontAwesomeIcon
                          icon={link.icon}
                          style={{ marginRight: "12px" }} // Spacing between icon and text
                        />
                        <AppText>{link.label}</AppText>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Menu;
