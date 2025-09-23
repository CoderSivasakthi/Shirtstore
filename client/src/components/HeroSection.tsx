import { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroBanner from "@assets/generated_images/E-commerce_hero_banner_d7e27899.png";
import formalCollection from "@assets/generated_images/Formal_shirts_collection_4f4b2bfc.png";

interface HeroSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  badge?: string;
}

interface HeroSectionProps {
  onNavigate?: (path: string) => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // TODO: Remove mock functionality - replace with real banner data
  const slides: HeroSlide[] = [
    {
      id: "1",
      image: heroBanner,
      title: "Premium Shirt Collection",
      subtitle: "Discover Your Perfect Style",
      description: "Explore our curated collection of premium quality shirts crafted for comfort and style.",
      ctaText: "Shop Now",
      ctaLink: "/products",
      badge: "New Arrivals",
    },
    {
      id: "2",
      image: formalCollection,
      title: "Formal Excellence",
      subtitle: "Professional. Polished. Perfect.",
      description: "Elevate your professional wardrobe with our sophisticated formal shirt collection.",
      ctaText: "View Collection",
      ctaLink: "/products?category=formal",
      badge: "Best Sellers",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    console.log("Next slide:", (currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    console.log("Previous slide:", (currentSlide - 1 + slides.length) % slides.length);
  };

  const handleCTAClick = (link: string) => {
    console.log("CTA clicked:", link);
    onNavigate?.(link);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden rounded-lg">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{ backgroundImage: `url(${currentSlideData.image})` }}
        data-testid={`hero-slide-${currentSlideData.id}`}
      >
        {/* Dark wash gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl text-white">
            {/* Badge */}
            {currentSlideData.badge && (
              <Badge 
                variant="secondary" 
                className="mb-4 bg-primary/20 text-white border-white/20"
                data-testid={`badge-hero-${currentSlide}`}
              >
                {currentSlideData.badge}
              </Badge>
            )}

            {/* Title */}
            <h1 
              className="text-4xl md:text-6xl font-bold mb-4 leading-tight"
              data-testid={`title-hero-${currentSlide}`}
            >
              {currentSlideData.title}
            </h1>

            {/* Subtitle */}
            <h2 
              className="text-xl md:text-2xl font-medium mb-4 text-white/90"
              data-testid={`subtitle-hero-${currentSlide}`}
            >
              {currentSlideData.subtitle}
            </h2>

            {/* Description */}
            <p 
              className="text-lg mb-8 text-white/80 max-w-lg"
              data-testid={`description-hero-${currentSlide}`}
            >
              {currentSlideData.description}
            </p>

            {/* CTA Button */}
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3 text-lg"
              onClick={() => handleCTAClick(currentSlideData.ctaLink)}
              data-testid={`button-hero-cta-${currentSlide}`}
            >
              {currentSlideData.ctaText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
            onClick={prevSlide}
            data-testid="button-hero-prev"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
            onClick={nextSlide}
            data-testid="button-hero-next"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      {/* Dots Indicator */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? "bg-white w-8" 
                  : "bg-white/50 hover:bg-white/75"
              }`}
              onClick={() => {
                setCurrentSlide(index);
                console.log("Slide selected:", index);
              }}
              data-testid={`button-hero-dot-${index}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}