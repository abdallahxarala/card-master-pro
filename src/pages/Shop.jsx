import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search, ShoppingCart, Star, X, Plus, Minus } from 'lucide-react';


const Shop = () => {
  // États de base
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSlide, setActiveSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Données du carrousel
  const carouselSlides = [
    {
      title: "Solutions d'Impression Professionnelles",
      subtitle: "Découvrez notre gamme complète de produits pour vos besoins d'impression",
      cta: "Voir les bestsellers",
      secondaryCta: "Guide d'achat",
      bgColor: "from-orange-500 to-orange-600",
      image: "/api/placeholder/1200/600"
    },
    {
      title: "Nouvelles Imprimantes PVC",
      subtitle: "La nouvelle génération d'imprimantes avec technologie NFC intégrée",
      cta: "Explorer",
      secondaryCta: "Comparer",
      bgColor: "from-blue-600 to-blue-700",
      image: "/api/placeholder/1200/600"
    },
    {
      title: "Cartes PVC Personnalisées",
      subtitle: "Créez vos cartes professionnelles avec notre service d'impression sur mesure",
      cta: "Commander",
      secondaryCta: "Personnaliser",
      bgColor: "from-purple-600 to-purple-700",
      image: "/api/placeholder/1200/600"
    }
  ];

  // Données des catégories
  const categories = [
    { id: 'all', name: 'Tous les produits', count: 24 },
    { id: 'printers', name: 'Imprimantes', count: 8 },
    { id: 'cards', name: 'Cartes PVC', count: 12 },
    { id: 'accessories', name: 'Accessoires', count: 4 }
  ];

  // Données des produits
  const products = Array.from({ length: 6 }, (_, id) => ({
    id,
    name: 'Imprimante PVC Pro X1',
    description: 'Impression haute qualité pour cartes professionnelles avec technologie avancée',
    price: 999,
    rating: 4,
    reviews: 128,
    isNew: id === 0,
    category: id % 2 === 0 ? 'printers' : 'cards'
  }));

  // Calcul du total du panier
  const getCartTotal = () => cartItems.reduce(
    (total, item) => total + (item.product.price * item.quantity),
    0
  );

  const handleAddToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prevItems, { product, quantity: 1 }];
    });
    setShowCart(true);
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const CartDrawer = () => (
    <div className="fixed top-16 right-4 w-96 bg-white rounded-xl shadow-2xl p-4 z-40">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">
          Panier ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} articles)
        </h3>
        <button 
          onClick={() => setShowCart(false)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {cartItems.length === 0 ? (
        <div className="py-8 text-center">
          <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500">Votre panier est vide</p>
        </div>
      ) : (
        <>
          <div className="max-h-[60vh] overflow-y-auto space-y-4 pr-2">
            {cartItems.map(({ product, quantity }) => (
              <div 
                key={product.id}
                className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
              >
                <img 
                  src="/api/placeholder/80/80"
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-800 truncate">{product.name}</h4>
                  <p className="text-gray-500">{product.price} €</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => handleUpdateQuantity(product.id, quantity - 1)}
                      className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(product.id, quantity + 1)}
                      className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveFromCart(product.id)}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Total</span>
              <span className="text-xl font-bold">{getCartTotal().toLocaleString()} €</span>
            </div>
            <button 
              className="w-full py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
            >
              Procéder au paiement
            </button>
          </div>
        </>
      )}
    </div>
  );

  // Fonctions du carrousel
  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setActiveSlide((prev) => (prev + 1) % carouselSlides.length);
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setActiveSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [activeSlide]);

  useEffect(() => {
    const autoplayTimer = setInterval(nextSlide, 5000);
    return () => clearInterval(autoplayTimer);
  }, );

  // Filtrage des produits
  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(product => product.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <button 
      onClick={() => setShowCart(true)}
      className="fixed top-4 right-4 z-50 p-3 bg-white rounded-full shadow-lg hover:bg-orange-50 transition-all duration-300 group"
    >
      <ShoppingCart className="w-6 h-6 text-orange-600" />
      {cartItemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
          {cartItemCount}
        </span>
      )}
    </button>
      {/* Hero Carousel */}
<div className="relative overflow-hidden bg-gray-900">
  <div className="absolute inset-0 w-full h-full">
    {carouselSlides.map((slide, index) => (
      <div
        key={index}
        className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out
          ${index === activeSlide ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor} opacity-90`} />
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:16px_16px]" />
        <div 
          className="absolute inset-0 bg-cover bg-center transform transition-transform duration-[2s] ease-out"
          style={{
            backgroundImage: `url(${slide.image})`,
            transform: `scale(${isTransitioning ? '1.1' : '1'})`,
          }}
        />
      </div>
    ))}
  </div>

  <div className="relative container mx-auto px-4 py-24">
    {carouselSlides.map((slide, index) => (
      <div
        key={index}
        className={`transition-all duration-500 ease-in-out absolute w-full
          ${index === activeSlide ? 'opacity-100 translate-x-0' : 
            index < activeSlide ? 'opacity-0 -translate-x-full' : 'opacity-0 translate-x-full'}`}
      >
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold mb-6 text-white leading-tight">{slide.title}</h1>
          <p className="text-xl text-white/90 mb-8">{slide.subtitle}</p>
          <div className="flex gap-4">
          <button
    onClick={prevSlide}
    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all transform hover:scale-110 duration-200 border border-white/20"
  >
    <ChevronLeft className="w-6 h-6" />
  </button>
  <button
    onClick={nextSlide}
    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all transform hover:scale-110 duration-200 border border-white/20"
  >
    <ChevronRight className="w-6 h-6" />
  </button>
          </div>
        </div>
      </div>
    ))}
  </div>

  <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 px-4">
    {carouselSlides.map((_, index) => (
      <button
        key={index}
        onClick={() => setActiveSlide(index)}
        className={`h-2 rounded-full transition-all duration-300 ${
          index === activeSlide 
            ? 'w-8 bg-white' 
            : 'w-2 bg-white/50 hover:bg-white/75'
        }`}
        aria-label={`Aller au slide ${index + 1}`}
      />
    ))}
  </div>

  <button
    onClick={prevSlide}
    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 transition-all transform hover:scale-110 duration-200"
  >
    <ChevronLeft className="w-6 h-6" />
  </button>
  <button
    onClick={nextSlide}
    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 transition-all transform hover:scale-110 duration-200"
  >
    <ChevronRight className="w-6 h-6" />
  </button>
</div>

      {/* Section principale */}
      <div className="container mx-auto px-4 -mt-8">
        {/* Barre de recherche */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un produit..."
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-50 border-2 border-gray-100 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Catégories */}
        <div className="mb-8 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-lg whitespace-nowrap transition-all ${
                activeCategory === category.id
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {category.name}
              <span className="ml-2 text-sm opacity-80">({category.count})</span>
            </button>
          ))}
        </div>

        {/* Grille de produits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="p-4">
                <div className="relative aspect-square mb-4 rounded-lg bg-gray-100 overflow-hidden">
                  <img
                    src="/api/placeholder/400/400"
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-orange-50 transition-colors"
                  >
                    <ShoppingCart className="w-5 h-5 text-orange-600" />
                  </button>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <div className="flex text-orange-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < product.rating ? 'fill-current' : ''}`} />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-500">({product.reviews})</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">{product.price} €</span>
                    <button className="px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600">
                      Voir détails
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Panier flottant */}
      {showCart && <CartDrawer />}
    </div>
  );
};

export default Shop;