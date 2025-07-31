import React from 'react';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter, 
  FaYoutube, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt 
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <FaFacebookF />, url: "https://facebook.com", label: "Facebook" },
    { icon: <FaInstagram />, url: "https://instagram.com", label: "Instagram" },
    { icon: <FaTwitter />, url: "https://twitter.com", label: "Twitter" },
    { icon: <FaYoutube />, url: "https://youtube.com", label: "YouTube" }
  ];

  const aboutLinks = [
    { text: "Homepage", url: "#" },
    { text: "About Us", url: "AboutusPage" },
    { text: "Our Program", url: "SportsProgramPage" },
    { text: "Latest News", url: "BlogPage" }
  ];

  const teamLinks = [
    { text: "Player & Coach", url: "#" },
    { text: "Player Profile", url: "#" },
    { text: "Fixtures", url: "#" },
    { text: "Tournament", url: "#" }
  ];

  const contactInfo = [
    { icon: <FaPhone />, text: "(+256) 773 - 45678", url: "tel:+6212345678" },
    { icon: <FaEnvelope />, text: "info@bluephoenixsports.com", url: "mailto:info@bluephoenixsports.com" },
    { icon: <FaMapMarkerAlt />, text: "5523 Buziga Kampala, Uganda, 9001 UG", url: "#" }
  ];

  return (
    <footer className="bg-blue-800 text-white">
      {/* Divider */}
      <div className="h-px bg-gray-400" />

      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Column 1: Logo and Social Media */}
          <div className="flex flex-col space-y-4 sm:col-span-2 md:col-span-1">
            <div className="flex items-center space-x-3">
              <img
                src="/logo.jpg"
                className="h-14 w-auto"
                alt="Blue Phoenix Sports logo"
                loading="lazy"
              />
              <h1 className="text-xl font-bold">Blue Phoenix</h1>
            </div>
            <div className="flex space-x-4 text-xl">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="transition-colors hover:text-blue-200"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: About Us */}
          <div className="space-y-4 border-t border-blue-700 pt-4 sm:border-t-0 sm:pt-0 md:border-l md:pl-6">
            <h2 className="text-lg font-bold">ABOUT US</h2>
            <ul className="space-y-2">
              {aboutLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.url} 
                    className="text-sm transition-colors hover:underline hover:text-blue-200 md:text-base"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Teams Info */}
          <div className="space-y-4 border-t border-blue-700 pt-4 sm:border-t-0 sm:pt-0 md:border-l md:pl-6">
            <h2 className="text-lg font-bold">TEAMS INFO</h2>
            <ul className="space-y-2">
              {teamLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.url} 
                    className="text-sm transition-colors hover:underline hover:text-blue-200 md:text-base"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="space-y-4 border-t border-blue-700 pt-4 sm:border-t-0 sm:pt-0 md:pl-6">
            <h2 className="text-lg font-bold">CONTACT US</h2>
            <ul className="space-y-2">
              {contactInfo.map((info, index) => (
                <li key={index}>
                  <a 
                    href={info.url} 
                    className="flex items-start text-sm transition-colors hover:underline hover:text-blue-200 md:text-base"
                  >
                    <span className="mr-2 mt-0.5">{info.icon}</span>
                    {info.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 border-t border-blue-700 pt-4 text-center">
          <p className="mb-2 text-xs md:text-sm">
            For more information, please visit our{' '}
            <a href="#" className="underline transition-colors hover:text-blue-200">Privacy Policy</a>{' '}
            and{' '}
            <a href="#" className="underline transition-colors hover:text-blue-200">Terms of Service</a>.
          </p>
          <p className="text-xs md:text-sm">
            &copy; {currentYear} Blue Phoenix Sports Limited. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;