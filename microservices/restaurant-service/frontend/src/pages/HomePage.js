import React from 'react';
import { FaComment } from 'react-icons/fa';
import './css.css'; // Assuming you have a CSS file for styling

function HomePage() {
  return (
    <div>
      <header id="devlog-header">
        <div className="logo-container">
          <img src="./assets/images/devlog-logo.png" alt="" />
        </div>
        <nav>
          <a className="nav-item" href="/#services">Services</a>
          <a className="nav-item" href="/#advantages-container">Avantages</a>
          <a className="nav-item" href="/#technologies">Technologies</a>
          <a className="nav-item" href="/#projects-container">Projets</a>
        </nav>
      </header>

      <div className="page-pg">
        <div className="backgound-linear">
          <section className="section-hero">
            <div className="section-hero-content">
              <h1>Transformez vos idées en réalité</h1>
              <p>DEVLOG vous accompagne dans le développement de votre application, site web ou logiciel métier.</p>
            </div>
            <div className="info-conct">
              <a href="tel:+213799112506">
                <div className="app-nous">Appelez-nous</div>
              </a>
              <p>OU</p>
              <a href="login.html">
                <div className="app-nous">Connectez-vous</div>
              </a>
            </div>
          </section>
        </div>
        <div className="section">
          <div id="services-title">Quels que soient vos besoins, on s'en charge!</div>
          <div id="services">
            <div className="service mc1">
              <div className="wrapper">
                <div className="service-illustration">
                  <img className="computer_screenshot" src="./assets/images/pc-portable-1.png" alt="" />
                </div>
              </div>
              <div className="service-detail">
                <div className="detail-color">SITE VITRINE</div>
                <div className="vitr">
                  Moyen incontournable pour renforcer l'image de votre entreprise, attirer de nouveaux clients, augmenter
                  votre chiffre d'affaire, ou améliorer votre service.
                </div>
              </div>
            </div>
          </div>
          <div className="service right mc1">
            <div className="service-detail">
              <div className="detail-color">APPLICATION MOBILE</div>
              <div className="vitr">
                Une idée innovante ? Lancez-vous, et créez votre propre application mobile sur Android, et iOS.
              </div>
            </div>
            <div className="service-illustration">
              <img className="phone_screenshot" src="./assets/images/phone-1.png" alt="" />
            </div>
          </div>
          <div className="service mc1">
            <div className="wrapper">
              <div className="service-illustration">
                <img className="computer_screenshot" src="./assets/images/example-screenshot4.png" alt="" />
              </div>
            </div>
            <div className="service-detail">
              <div className="detail-color">LOGICIEL MÉTIER</div>
              <div className="vitr">
                Conçu sur mesure pour répondre aux besoins spécifiques de votre travail, pour augmenter votre
                productivité et faciliter votre gestion.
              </div>
            </div>
          </div>
          <div className="service right mc1">
            <div className="service-detail">
              <div className="detail-color">E-COMMERCE</div>
              <div className="vitr">
                Boostez vos ventes, augmentez vos revenus et permettez à vos clients de trouver et de commander vos
                produits en quelques clics, à n'importe quel moment, et de n'importe où.
              </div>
            </div>
            <div className="service-illustration">
              <img className="computer_screenshot" src="./assets/images/example-screenshot3.png" alt="" />
            </div>
          </div>
        </div>
        <div id="services-title">POURQUOI CHOISIR DEVLOG</div>
        <div className="grids" id="advantages-container">
          {/* Advantage items */}
        </div>
        <div id="services-title">TÉCHNOLOGIES</div>
        <div className="technologies-container" id="technologies">
          {/* Technology items */}
        </div>
        <div id="services-title">QUELQUES PROJETS DÉJÀ ACCOMPLIS</div>
        <div id="projects-container">
          {/* Project items */}
        </div>
        <div id="services-title">NOTRE MÉTHODE DE TRAVAIL</div>
        <div className="grids" id="advantages-container">
          {/* Method items */}
        </div>
        <div className="section-buttom">
          <div className="buttom-title">Vous faite partit de nous, LANCEZ VOUS !</div>
          <div className="btn-title">
            <div className="btn cmc">
              <div>
                <a href="login.html">
                  <strong>COMMENCER</strong>
                  <br />
                  <span>(Devis instantané)</span>
                </a>
              </div>
            </div>
          </div>
          <div className="contactt">
            OU CONTACTEZ-NOUS SUR
            <div>
              <a style={{ fontWeight: 'bold', fontSize: '25px', marginTop: '5px' }}>0799 11 25 06</a>
            </div>
          </div>
        </div>
        <div className="chatbot">
          <div className="chat_icon">
            <FaComment />
          </div>
          <div className="chat_box">
            {/* Chatbot content */}
          </div>
        </div>
      </div >

      <footer id="nice-footer">
        <div className="footer-grid">
          {/* Footer items */}
        </div>
        <div id="map" style={{ marginLeft: '12%', marginTop: '1%' }}>
          {/* Google Map */}
        </div>
      </footer>
    </div >
  );
}

export default HomePage;
