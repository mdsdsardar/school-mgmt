// components/SidebarDropdown.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { Collapse } from "react-bootstrap";

const SidebarDropdown = ({ title, icon, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li>
      <a
        href={`#${title.toLowerCase()}Submenu`}
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        aria-expanded={isOpen}
        className="dropdown-toggle"
      >
        <i className={`fa-solid fa-${icon}`}></i> {title}
        <i className="fa fa-chevron-down" style={{ float: "right" }}></i>
      </a>
      <Collapse in={isOpen}>
        <ul className="list-unstyled" id={`${title.toLowerCase()}Submenu`}>
          {items.map((item, index) => (
            <li key={index}>
              {item.onClick ? (
                // Render as button/link with onClick handler
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    item.onClick();
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <i className={`fa-solid fa-${item.icon}`}></i> {item.label}
                </a>
              ) : (
                // Render as Link for navigation
                <Link to={item.path}>
                  <i className={`fa-solid fa-${item.icon}`}></i> {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </Collapse>
    </li>
  );
};

export default SidebarDropdown;
