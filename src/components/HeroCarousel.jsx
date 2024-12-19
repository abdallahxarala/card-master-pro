import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroCarousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const slides = [
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

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
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
  }, []);

  return (
    <div className="relative overflow-hidden bg-gray-900">
      {/* Background avec effet parallax */}
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide, index) => (
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

      {/* Contenu */}
      <div className="relative container mx-auto px-4 py-24">
        {slides.map((slide, index) => (
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
                <button className="px-6 py-3 bg-white text-orange-600 rounded-lg font-semibold hover:bg-orange-50 transition-colors shadow-lg transform hover:scale-105 duration-200">
                  {slide.cta}
                </button>
                <button className="px-6 py-3 bg-black/30 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-black/40 transition-colors transform hover:scale-105 duration-200">
                  {slide.secondaryCta}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 
              ${index === activeSlide ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Boutons précédent/suivant */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 transition-all transform hover:scale-110 duration-200"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 transition-all transform hover:scale-110 duration-200"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default HeroCarousel;