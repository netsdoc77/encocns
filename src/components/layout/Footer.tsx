

import { Link } from 'react-router-dom';

export default function Footer() {


  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center mb-6">
            <img
              src={`${import.meta.env.BASE_URL}logo.svg`}
              alt="ENCOCNS Logo"
              className="h-12 w-auto object-contain brightness-0 invert"
            />
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link to="/business" className="hover:text-primary transition-colors">Business</Link></li>
            <li><Link to="/solution" className="hover:text-primary transition-colors">Solutions</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>hyungseok.choi@encocns.com</li>
            <li>#A-407, Seoul Forest SK V1 Tower, 5</li>
            <li>Seongsuil-ro 8-gil, Seongdong-gu, Seoul</li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-6 mt-12 pt-8 border-t border-slate-800 text-sm text-center md:text-left flex flex-col md:flex-row justify-between items-center">
        <p className="mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} ENCOCNS. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
