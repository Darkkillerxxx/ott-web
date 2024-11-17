import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg"; // Import SVG as a component
import { AppText } from "./AppText";

const Menu = () => {
  const [menu, setMenu] = useState([
    {
      label: "Dashboard",
      name: "dashboard",
      isSelected: false,
    },
    {
      label: "Add Content",
      name: "add-contents",
      isSelected: false,
      subContent: [
        { label: "Add Shows", name: "addShows" },
        { label: "Add Seasons", name: "addSeasons" },
        { label: "Add Episodes", name: "addEpisodes" },
      ],
    },
    {
      label: "Manage Content",
      name: "manageContents",
      isSelected: false,
      subContent: [
        { label: "Manage Movies", name: "manageMovies" },
        { label: "Manage Episodes", name: "manageEpisodes" },
        { label: "Manage Live Shows", name: "manageLiveShows" },
        { label: "Manage Shows", name: "manageShows" },
        { label: "Manage Seasons", name: "manageSeasons" },
      ],
    },
    {
      label: "Profile",
      name: "profile",
      isSelected: false,
    },
    {
      label: "Login",
      name: "login",
      isSelected: false,
    },
  ]);

  const toggleSubMenu = (name) => {
    const updatedMenu = menu.map((item) =>
      item.name === name
        ? { ...item, isSelected: !item.isSelected }
        : { ...item, isSelected: false }
    );
    setMenu(updatedMenu);
  };

  return (
    <div style={{ width: "100%", height: "100%", display: "flex" }}>
      <div
        style={{
          width: "250px",
          minHeight: "100vh",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          padding: "10px",
          backgroundColor: "#28323e",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <img src={logo} alt="Logo" style={{ width: "100%" }} />
        </div>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {menu.map((item) => (
            <li key={item.name} style={{ marginBottom: "10px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  ...linkStyle,
                  ...(item.isSelected && !item.subContent
                    ? activeLinkStyle
                    : {}),
                }}
                onClick={() =>
                  item.subContent ? toggleSubMenu(item.name) : null
                }
              >
                {item.subContent ? (
                  <span style={{ cursor: "pointer" }}>
                    <AppText>{item.label}</AppText>
                  </span>
                ) : (
                  <Link
                    to={`/${item.name}`}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      flex: "1",
                    }}
                  >
                    <AppText>{item.label}</AppText>
                  </Link>
                )}
                {item.subContent && (
                  <span
                    style={{
                      marginLeft: "auto",
                      transform: item.isSelected
                        ? "rotate(90deg)"
                        : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                      cursor: "pointer",
                    }}
                  >
                    ▶
                  </span>
                )}
              </div>
              {item.subContent && item.isSelected && (
                <ul style={{ listStyleType: "none", paddingLeft: "20px" }}>
                  {item.subContent.map((subItem) => (
                    <li key={subItem.name}>
                      <Link
                        to={`/${subItem.name}`}
                        style={{
                          ...linkStyle,
                          fontSize: "14px",
                          padding: "8px",
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                        }}
                      >
                        <AppText>{subItem.label}</AppText>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const linkStyle = {
  textDecoration: "none",
  color: "white",
  fontSize: "16px",
  display: "block",
  padding: "10px",
  borderRadius: "4px",
  transition: "background-color 0.3s",
};

const activeLinkStyle = {
  backgroundColor: "#007bff",
  color: "#fff",
};

export default Menu;
