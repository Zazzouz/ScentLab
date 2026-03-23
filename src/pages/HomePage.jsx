import { Link } from "react-router-dom";
import SiteHeader from "../components/SiteHeader";
import "../styles/landing.css";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero">
          <div className="hero-background" role="presentation" />
          <div className="hero-overlay" />
          <div className="hero-content">
            <h1>Design Your Dream Fragrance</h1>
            <p className="hero-subtitle">
              Create your own custom fragrance by combining top, middle, and base notes. Explore
              scent ingredients and build a unique perfume profile.
            </p>
            <div className="hero-actions">
              <Link to="/builder" className="btn btn-primary">
                Start Creating
              </Link>
              <Link to="/notes" className="btn btn-secondary">
                Explore Notes
              </Link>
            </div>
          </div>
        </section>

        <section className="features" id="builder">
          <div className="container">
            <h2 className="section-title">What You Can Build</h2>
            <p className="section-intro">
              Everything you need to craft a fragrance that feels uniquely yours.
            </p>
            <div className="feature-grid">
              <article className="feature-card">
                <div className="feature-icon" aria-hidden="true">
                  ◇
                </div>
                <h3>Fragrance Builder</h3>
                <p>Combine top, middle, and base notes in one intuitive workspace.</p>
              </article>
              <article className="feature-card">
                <div className="feature-icon" aria-hidden="true">
                  △
                </div>
                <h3>Fragrance Pyramid Visualization</h3>
                <p>See how your blend is structured with a clear pyramid view.</p>
              </article>
              <article className="feature-card">
                <div className="feature-icon" aria-hidden="true">
                  ♥
                </div>
                <h3>Save Your Fragrance</h3>
                <p>Store your favorite combinations and come back to them anytime.</p>
              </article>
              <article className="feature-card">
                <div className="feature-icon" aria-hidden="true">
                  ◈
                </div>
                <h3>Fragrance Note Library</h3>
                <p>Browse and learn about ingredients from floral to woody notes.</p>
              </article>
              <article className="feature-card">
                <div className="feature-icon" aria-hidden="true">
                  ◐
                </div>
                <h3>Blend Strength Controls</h3>
                <p>Adjust the intensity of each note to fine-tune your scent.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="about" id="notes">
          <div className="container about-inner">
            <div className="about-content">
              <h2>Understanding Fragrance Layers</h2>
              <p>
                Perfumes are built in layers: <strong>top notes</strong> hit first and fade quickly,{" "}
                <strong>middle notes</strong> form the heart of the scent, and <strong>base notes</strong>{" "}
                linger the longest. This app helps you experiment with these layers and understand how
                classic perfumes are structured—so you can design a blend that evolves beautifully from
                first spray to dry-down.
              </p>
            </div>
            <div
              className="about-diagram"
              role="img"
              aria-label="Fragrance pyramid: top, heart, and base notes with typical duration"
            >
              <svg viewBox="0 0 260 240" xmlns="http://www.w3.org/2000/svg" className="fragrance-pyramid">
                <defs>
                  <linearGradient id="home-top-note" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#e8e4de" />
                    <stop offset="100%" stopColor="#d4cfc6" />
                  </linearGradient>
                  <linearGradient id="home-heart-note" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#c9a962" />
                    <stop offset="100%" stopColor="#b8a066" />
                  </linearGradient>
                  <linearGradient id="home-base-note" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3d3935" />
                    <stop offset="100%" stopColor="#2a2724" />
                  </linearGradient>
                </defs>
                <polygon
                  points="10,225 250,225 210,155 50,155"
                  fill="url(#home-base-note)"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="1"
                />
                <polygon
                  points="50,155 210,155 170,85 90,85"
                  fill="url(#home-heart-note)"
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="1"
                />
                <polygon
                  points="90,85 170,85 130,15"
                  fill="url(#home-top-note)"
                  stroke="rgba(61,57,53,0.15)"
                  strokeWidth="1"
                />
                <text
                  x="130"
                  y="184"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.95)"
                  fontFamily="Outfit, sans-serif"
                  fontSize="11"
                  fontWeight="600"
                >
                  Base notes
                </text>
                <text
                  x="130"
                  y="196"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.75)"
                  fontFamily="Outfit, sans-serif"
                  fontSize="8"
                >
                  2+ hours to all day
                </text>
                <text
                  x="130"
                  y="114"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.95)"
                  fontFamily="Outfit, sans-serif"
                  fontSize="11"
                  fontWeight="600"
                >
                  Heart notes
                </text>
                <text
                  x="130"
                  y="126"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.85)"
                  fontFamily="Outfit, sans-serif"
                  fontSize="8"
                >
                  ~20 min – 2 hours
                </text>
                <text
                  x="130"
                  y="58"
                  textAnchor="middle"
                  fill="#3d3935"
                  fontFamily="Outfit, sans-serif"
                  fontSize="9"
                  fontWeight="600"
                >
                  Top notes
                </text>
                <text
                  x="130"
                  y="70"
                  textAnchor="middle"
                  fill="#5a554d"
                  fontFamily="Outfit, sans-serif"
                  fontSize="7"
                >
                  ~5–15 minutes
                </text>
              </svg>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer" id="saved">
        <div className="container footer-inner">
          <p className="footer-brand">ScentLab</p>
          <p className="footer-tagline">Student Project</p>
          <p className="footer-link">
            <a href="https://github.com/Zazzouz/ScentLab" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
