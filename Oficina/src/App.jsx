import React, { useState } from 'react';
/* Agregamos los nuevos iconos necesarios: Car, Gavel, Scroll, Plane, FileCheck */
import { Scale, FileSignature, Users, Calendar, Phone, MapPin, Mail, Menu, X, CheckCircle, Car, Gavel, Scroll, Plane, FileCheck, Wrench } from 'lucide-react';
import './App.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <div className="logo">
          <Scale className="logo-icon" />
          <span>Oficina Jurídica Menjívar</span>
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
      <p>Expertos en trámites vehiculares, defensa legal y escrituración en Sonsonate.</p>
      <div className="hero-buttons">
        <a href="#contacto" className="btn-primary">Consulta Gratuita</a>
        <a href="#servicios" className="btn-outline">Nuestros Servicios</a>
      </div>
    </div>
  </header>
);

const Services = () => {
  /* Lista actualizada con tus 7 servicios específicos */
  const services = [
    {
      icon: <Car size={40} />,
      title: "Compraventa de Vehículos y Armas",
      desc: "Traspasos seguros de vehículos y armas de fuego con toda la legalidad requerida."
    },
    {
      icon: <FileCheck size={40} />,
      title: "Trámites SERTRACEN y VMT",
      desc: "Gestión ágil de licencias, tarjetas de circulación y procesos administrativos."
    },
    {
      icon: <Wrench size={40} />,
      title: "Modificaciones Vehiculares",
      desc: "Legalización de cambios de motor y cambios de color en su vehículo."
    },
    {
      icon: <FileSignature size={40} />,
      title: "Escrituras Públicas",
      desc: "Documentación legal para compraventas, donaciones y acuerdos formales."
    },
    {
      icon: <Scroll size={40} />,
      title: "Poderes y Mandatos",
      desc: "Elaboración de poderes generales, administrativos y con cláusulas especiales."
    },
    {
      icon: <Gavel size={40} />,
      title: "Defensa Legal Integral",
      desc: "Representación experta en áreas Penal, Judicial, de Familia y Civil."
    },
    {
      icon: <Users size={40} />,
      title: "Familia e Identidad",
      desc: "Divorcios, matrimonios, rectificación de identidades y procesos familiares."
    },
    {
      icon: <Plane size={40} />,
      title: "Migración",
      desc: "Asesoría y gestión de permisos migratorios y trámites de extranjería."
    }
  ];

  return (
    <section id="servicios" className="services-section">
      <div className="container">
        <h2 className="section-title">Nuestros Servicios</h2>
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
    tramite: 'compraventa', /* Valor por defecto actualizado */
    fecha: ''
  });
  
  const [status, setStatus] = useState(null);

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 8) value = value.slice(0, 8);
    if (value.length > 4) value = `${value.slice(0, 4)}-${value.slice(4)}`;
    setFormData({ ...formData, telefono: value });
  };

  const handleDuiChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 9) value = value.slice(0, 9);
    if (value.length > 8) value = `${value.slice(0, 8)}-${value.slice(8)}`;
    setFormData({ ...formData, dui: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Petición al Backend que acabamos de crear
      const response = await fetch('http://localhost:3000/api/citas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        // Limpiar formulario si deseas
        setFormData({ nombre: '', dui: '', telefono: '', correo: '', tramite: 'compraventa', fecha: '' });
      } else {
        alert("Hubo un error al enviar la solicitud.");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("No se pudo conectar con el servidor.");
    }

    setTimeout(() => setStatus(null), 5000);
  };

  return (
    <section id="contacto" className="contact-section">
      <div className="container contact-container">
        <div className="form-wrapper">
          <div className="form-header">
            <h3>Solicitud de Cita</h3>
            <p>Complete el formulario para agendar su trámite.</p>
          </div>
          
          {status === 'success' ? (
            <div className="success-message">
              <CheckCircle size={48} color="var(--gold)" />
              <h4>Solicitud Recibida</h4>
              <p>Nos pondremos en contacto al {formData.telefono} a la brevedad.</p>
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
                  {/* Select actualizado con tus servicios */}
                  <select 
                    value={formData.tramite}
                    onChange={(e) => setFormData({...formData, tramite: e.target.value})}
                  >
                    <option value="compraventa">Compraventa (Vehículo/Arma)</option>
                    <option value="sertracen">Trámites SERTRACEN/VMT</option>
                    <option value="escrituras">Escrituras Públicas</option>
                    <option value="poderes">Poderes y Mandatos</option>
                    <option value="defensa">Defensa (Penal/Civil/Familia)</option>
                    <option value="familia">Matrimonios/Divorcios</option>
                    <option value="migracion">Permisos Migratorios</option>
                    <option value="otro">Otro</option>
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
        <h4>Oficina Jurídica Menjívar</h4>
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
      <p>&copy; {new Date().getFullYear()} Oficina Jurídica Menjívar. Todos los derechos reservados.</p>
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