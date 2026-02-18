import { useState, useEffect, useRef } from 'react'
import './App.css'
import logo from './assets/logo.png'

import img1 from './assets/isla/DSC01131.jpg'
import img2 from './assets/isla/DSC05627.jpg'
import img3 from './assets/isla/DSC06895.jpg'
import img4 from './assets/isla/DSC07034.jpg'
import img5 from './assets/isla/crm.png'
import img6 from './assets/isla/hrm.png'
import img7 from './assets/isla/ims.png'
import img8 from './assets/isla/exe.png'
import img9 from './assets/isla/DSC05744.JPG'
import img11 from './assets/isla/DSC07036.jpg'
import img12 from './assets/isla/DSC08040.jpg'

/* Additional images can be added here */

const heroImages = [img1, img2, img3, img4, img9, img11, img12]

/* ===== DATA ===== */
const services = [
  {
    id: 'crm',
    title: 'IslaInsights',
    description: 'Powerful customer relationship management system. Track leads, manage bookings, monitor staff performance, and generate insightful reports.',
    icon: '📊',
    tags: ['Analytics', 'Leads', 'Reports'],
    color: 'blue',
    url: 'https://islainsights.vercel.app',
    btnText: 'Open CRM',
    image: img5,
  },
  {
    id: 'membership',
    title: 'Membership System',
    description: 'Comprehensive membership and guest management platform. Handle memberships, track guest experiences, and manage loyalty programs.',
    icon: '🏷️',
    tags: ['Members', 'Guests', 'Loyalty'],
    color: 'purple',
    url: 'https://islatel-membership-system-upx3.vercel.app',
    btnText: 'Open Membership',
    image: img6,
  },
  {
    id: 'IMS',
    title: 'Inventory Management System',
    description: 'software solution designed to track, manage, and optimize a company’s stock levels throughout the supply chain. It provides real-time visibility into what products are in stock, where they are located, and when they need to be replenished.',
    icon: '📦',
    tags: ['Inventory', 'Stock', 'Supply Chain'],
    color: 'green',
    url: 'https://islatel-ims.vercel.app',
    btnText: 'Open IMS',
    image: img7,
  },
  {
    id: 'Exely',
    title: 'Exely',
    description: 'an all-in-one hospitality software suite designed to help hotels, resorts, and vacation rentals increase their direct sales and streamline daily operations.',
    icon: '📅',
    tags: ['Hotel', 'Resort', 'Vacation Rentals'],
    color: 'amber',
    url: 'https://secure.exely.com/secure/Enter.aspx?ReturnUrl=%2fsecure%2f.com',
    btnText: 'Open Exely',
    image: img8,
  }, {
    id: 'mainet',
    title: 'Net Promoter Score',
    description: 'a simple metric used to measure customer loyalty and satisfaction. It asks customers how likely they are to recommend a product or service on a scale from 0–10, then categorizes them as Promoters, Passives, or Detractors to calculate an overall score.',
    icon: '⭐',
    tags: ['Public', 'Feedback', 'Net Promoter Score'],
    color: 'rose',
    url: '#',
    btnText: 'Coming Soon',
    // No specific image yet
  },
  {
    id: 'website',
    title: 'Main Website',
    description: 'The official Islatel website showcasing our resort, amenities, gallery, and everything guests need to plan their perfect stay.',
    icon: '🌴',
    tags: ['Public', 'Gallery', 'Info'],
    color: 'rose',
    url: '#',
    btnText: 'Coming Soon',
    // No specific image yet
  },
]

const stats = [

]

/* ===== COMPONENTS ===== */



function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <img src={logo} alt="Isla Tech" className="nav-brand__logo" />
        <span className="nav-brand__text">IslaTech</span>
      </div>
      <div className="nav-links">
        <button className="nav-link nav-link--active" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</button>
        <button className="nav-link" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>Services</button>
      </div>
    </nav>
  )
}

function ServiceCard({ service }) {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    cardRef.current.style.setProperty('--mouse-x', `${x}%`)
    cardRef.current.style.setProperty('--mouse-y', `${y}%`)
  }

  const isComingSoon = service.url === '#'

  return (
    <div
      ref={cardRef}
      className={`service-card service-card--${service.color} ${service.image ? 'has-image' : ''} ${isComingSoon ? 'coming-soon' : ''}`}
      onMouseMove={handleMouseMove}
      style={{ animationDelay: `${services.indexOf(service) * 0.1}s` }}
    >
      {isComingSoon && (
        <div className="service-card__lock">
          <span className="lock-icon">🔒</span>
        </div>
      )}
      <div className="service-card__icon">
        {service.icon}
      </div>
      <h3 className="service-card__title">{service.title}</h3>
      <p className="service-card__desc">{service.description}</p>

      {/* Landscape Image Preview */}
      <div className="service-card__preview">
        {service.image && (
          <img
            src={service.image}
            alt={`${service.title} Preview`}
            className="service-card__preview-img"
            loading="lazy"
          />
        )}
      </div>

      <div className="service-card__tags">
        {service.tags.map((tag) => (
          <span key={tag} className="service-card__tag">{tag}</span>
        ))}
      </div>
      <a
        href={isComingSoon ? undefined : service.url}
        target={isComingSoon ? undefined : '_blank'}
        rel={isComingSoon ? undefined : 'noopener noreferrer'}
        className="service-card__btn"
        style={isComingSoon ? { opacity: 0.5, cursor: 'default' } : {}}
        onClick={isComingSoon ? (e) => e.preventDefault() : undefined}
      >
        {service.btnText}
        {!isComingSoon && <span className="service-card__btn-arrow">→</span>}
      </a>
    </div>
  )
}

function AnimatedBackground() {
  return (
    <div className="bg-canvas">
      <div className="bg-gradient" />
      <div className="bg-orb bg-orb--1" />
      <div className="bg-orb bg-orb--2" />
      <div className="bg-orb bg-orb--3" />
      <div className="bg-grid" />
    </div>
  )
}



function HeroCarousel() {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="hero-carousel">
      {heroImages.map((img, index) => (
        <div
          key={index}
          className={`hero-carousel__slide ${index === currentImage ? 'hero-carousel__slide--active' : ''}`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}
      <div className="hero-carousel__overlay" />
    </div>
  )
}

/* ===== MAIN APP ===== */
function App() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
  }, [])

  return (
    <div className="app">
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <HeroCarousel />
        <div className="hero__content">


          <h1 className="hero__title">
            Your Gateway to<br />
            <span className="hero__title-gradient">Islatel Digital</span>
          </h1>

          <p className="hero__subtitle">
            Access all Islatel platforms from one central hub. Manage operations, track performance, and deliver seamless operations like no other — all in one place.
          </p>

          <div className="hero__actions">
            <button
              className="hero__btn hero__btn--primary"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Services
            </button>
          </div>
        </div>


      </section>

      {/* Services Section */}
      <section className="section" id="services">
        <div className="section__header">
          <div className="section__label">Our Platforms</div>
          <h2 className="section__title">Everything You Need,<br />One Ecosystem</h2>
          <p className="section__desc">
            From customer management to AI-powered insights, every tool your team needs is just a click away.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>



      {/* Footer */}
      <footer className="footer">
        <div className="footer__content">
          <div className="footer__brand">
            <img src={logo} alt="Isla Tech" className="footer__brand-logo" />
            <span className="footer__brand-text">IslaTech</span>
          </div>
          <span className="footer__copy">© 2026 Islatel. All rights reserved.</span>
        </div>
      </footer>
    </div>
  )
}

export default App
