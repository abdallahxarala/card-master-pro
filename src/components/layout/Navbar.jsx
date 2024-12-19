import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="text-xl font-bold text-blue-600">
            Card Master Pro
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/shop">Boutique</Link>
            <Link to="/editor">Éditeur de Cartes</Link>
            <Link to="/nfc-builder">NFC Builder</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;