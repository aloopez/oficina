import React, { useState } from 'react';
import { Scale, FileSignature, Users, Calendar, Phone, MapPin, Mail, Menu, X, CheckCircle } from 'lucide-react';
import './App.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <div className="logo">
          <Scale className="logo-icon" />
          <span>Oficina Juridica y tramitadora Menjivar</span>
        </div>
        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          <a href="#inicio" onClick={() => setIsOpen(false)}>Inicio</a>
          <a href="#servicios" onClick={() => setIsOpen(false)}>Servicios</a>
          <a href="#contacto" className="btn-primary" onClick={() => setIsOpen(false)}>Agendar Cita</a>
        </div>
        <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  );
};

const Hero = () => (
  <header id="inicio" className="hero">
    <div className="hero-overlay"></div>
    <div className="container hero-content">
      <h1>Seguridad Jurídica y Notarial <br /> <span className="text-gold">a su Alcance</span></h1>
      <p>Defendemos sus intereses con integridad, experiencia y la solidez que su patrimonio merece en El Salvador.</p>
      <div className="hero-buttons">
        <a href="#contacto" className="btn-primary">Consulta Gratuita</a>
        <a href="#servicios" className="btn-outline">Nuestras Áreas</a>
      </div>
    </div>
  </header>
);

const Services = () => {
  const services = [
    {
      icon: <FileSignature size={40} />,
      title: "Derecho Notarial",
      desc: "Escrituras públicas, auténticas, testamentos y poderes con estricto apego a la ley."
    },
    {
      icon: <Users size={40} />,
      title: "Derecho de Familia",
      desc: "Asesoría sensible en divorcios, cuotas alimenticias y autoridad parental."
    },
    {
      icon: <Scale size={40} />,
      title: "Derecho Mercantil",
      desc: "Constitución de sociedades, marcas y contratos comerciales para su empresa."
    }
  ];

  return (
    <section id="servicios" className="services-section">
      <div className="container">
        <h2 className="section-title">Nuestras Áreas de Práctica</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="icon-wrapper">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    dui: '',
    telefono: '',
    correo: '',
    tramite: 'notarial',
    fecha: ''
  });
  
  const [status, setStatus] = useState(null); // null, 'success', 'error'

  // Formateador de Teléfono SV (####-####)
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Solo números
    if (value.length > 8) value = value.slice(0, 8);
    if (value.length > 4) value = `${value.slice(0, 4)}-${value.slice(4)}`;
    setFormData({ ...formData, telefono: value });
  };

  // Formateador de DUI (########-#)
  const handleDuiChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 9) value = value.slice(0, 9);
    if (value.length > 8) value = `${value.slice(0, 8)}-${value.slice(8)}`;
    setFormData({ ...formData, dui: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de envío a backend
    console.log("Datos enviados:", formData);
    setStatus('success');
    setTimeout(() => setStatus(null), 5000);
  };

  return (
    <section id="contacto" className="contact-section">
      <div className="container contact-container">
        <div className="form-wrapper">
          <div className="form-header">
            <h3>Solicitud de Cita</h3>
            <p>Complete el formulario formal para reservar su espacio.</p>
          </div>
          
          {status === 'success' ? (
            <div className="success-message">
              <CheckCircle size={48} color="var(--gold)" />
              <h4>Solicitud Recibida</h4>
              <p>Nos pondremos en contacto al número {formData.telefono} a la brevedad.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="legal-form">
              <div className="form-group">
                <label>Nombre Completo</label>
                <input 
                  type="text" 
                  required 
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  placeholder="Ej. Juan Pérez"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>DUI (Documento Único)</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.dui}
                    onChange={handleDuiChange}
                    placeholder="00000000-0"
                  />
                </div>
                <div className="form-group">
                  <label>Teléfono (+503)</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.telefono}
                    onChange={handlePhoneChange}
                    placeholder="####-####"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Correo Electrónico</label>
                <input 
                  type="email" 
                  required 
                  value={formData.correo}
                  onChange={(e) => setFormData({...formData, correo: e.target.value})}
                  placeholder="cliente@ejemplo.com"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Tipo de Trámite</label>
                  <select 
                    value={formData.tramite}
                    onChange={(e) => setFormData({...formData, tramite: e.target.value})}
                  >
                    <option value="notarial">Derecho Notarial</option>
                    <option value="familia">Derecho de Familia</option>
                    <option value="mercantil">Derecho Mercantil</option>
                    <option value="otro">Otro / Asesoría General</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Fecha Preferida</label>
                  <input 
                    type="date" 
                    required 
                    value={formData.fecha}
                    onChange={(e) => setFormData({...formData, fecha: e.target.value})}
                  />
                </div>
              </div>

              <button type="submit" className="btn-submit">Confirmar Solicitud</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="footer">
    <div className="container footer-content">
      <div className="footer-info">
        <h4>Oficina Juridica y tramitadora Menjivar</h4>
        <p>Solvencia legal y prestigio notarial.</p>
        <div className="contact-info">
          <p><MapPin size={16} /> Col. Sensunapan, Sonsonate, El Salvador</p>
          <p><Phone size={16} /> +503 2422-1462</p>
          <p><Mail size={16} /> licdalbamenjivar@gmail.com</p>
        </div>
      </div>
      <div className="footer-links">
        <a href="#">Aviso Legal</a>
        <a href="#">Política de Privacidad</a>
        <a href="https://wa.me/50377448323" target="_blank" rel="noreferrer">WhatsApp</a>
      </div>
    </div>
    <div className="footer-bottom">
      <p>&copy; {new Date().getFullYear()} García & Asociados. Todos los derechos reservados.</p>
    </div>
  </footer>
);

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Services />
      <AppointmentForm />
      <Footer />
    </div>
  );
}

export default App;