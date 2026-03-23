import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/landing.css";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) => (isActive ? "active" : undefined);

  return (
    <header className="header">
      <nav className="nav">
        <NavLink to="/" className="logo" onClick={() => setOpen(false)}>
          ScentLab
        </NavLink>
        <button
          type="button"
          className="nav-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
        <ul className={`nav-links${open ? " is-open" : ""}`}>
          <li>
            <NavLink to="/" className={linkClass} end onClick={() => setOpen(false)}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/builder" className={linkClass} onClick={() => setOpen(false)}>
              Builder
            </NavLink>
          </li>
          <li>
            <NavLink to="/notes" className={linkClass} onClick={() => setOpen(false)}>
              Notes Library
            </NavLink>
          </li>
          <li>
            <NavLink to="/builder#saved" className={linkClass} onClick={() => setOpen(false)}>
              Saved Fragrances
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
