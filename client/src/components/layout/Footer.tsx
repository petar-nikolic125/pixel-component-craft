import React from 'react';
import { Link } from 'wouter';
import { 
  Github, Twitter, Linkedin, Youtube, 
  Mail, MapPin, Phone, ExternalLink 
} from 'lucide-react';

export const Footer: React.FC = () => {
  const footerLinks = {
    product: [
      { name: 'Editor', href: '/editor' },
      { name: 'Features', href: '/features' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Templates', href: '/templates' },
      { name: 'Documentation', href: '/docs' }
    ],
    company: [
      { name: 'About', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Contact', href: '/contact' },
      { name: 'Support', href: '/support' }
    ],
    resources: [
      { name: 'Getting Started', href: '/getting-started' },
      { name: 'Video Tutorials', href: '/tutorials' },
      { name: 'API Reference', href: '/api' },
      { name: 'Community', href: '/community' },
      { name: 'Changelog', href: '/changelog' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'License', href: '/license' }
    ]
  };

  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, href: 'https://github.com', name: 'GitHub' },
    { icon: <Twitter className="w-5 h-5" />, href: 'https://twitter.com', name: 'Twitter' },
    { icon: <Linkedin className="w-5 h-5" />, href: 'https://linkedin.com', name: 'LinkedIn' },
    { icon: <Youtube className="w-5 h-5" />, href: 'https://youtube.com', name: 'YouTube' }
  ];

  return (
    <footer className="relative bg-slate-900 border-t border-slate-800">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">ComponentForge</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              The ultimate drag-and-drop editor for creating stunning landing pages. Build, customize, and deploy with ease.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <a className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                      {link.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <a className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                      {link.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <a className="text-gray-400 hover:text-purple-400 transition-colors text-sm flex items-center gap-1">
                      {link.name}
                      {link.href.startsWith('/api') && <ExternalLink className="w-3 h-3" />}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail className="w-4 h-4" />
                hello@componentforge.com
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Phone className="w-4 h-4" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>
                  123 Design Street<br />
                  San Francisco, CA 94107
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-gray-400 text-sm">
              © 2025 ComponentForge. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex gap-6">
              {footerLinks.legal.map((link) => (
                <Link key={link.name} href={link.href}>
                  <a className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                    {link.name}
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Designer Credit - Professional Watermark */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-t border-slate-800/50">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="text-center">
              <p className="text-gray-500 text-sm italic tracking-wide">Designed by</p>
              <h3 className="text-2xl font-light text-gray-300 tracking-wider">
                Petar Nikolić
              </h3>
              <p className="text-xs text-gray-600 uppercase tracking-[0.3em] mt-1">
                Engineering Software
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};