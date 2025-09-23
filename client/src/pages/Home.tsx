import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategoryGrid from "@/components/CategoryGrid";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";
import { mockProducts } from "@/lib/mockData";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log("Search query:", query);
  };

  const handleCategoryClick = (categoryId: string) => {
    console.log("Navigate to category:", categoryId);
    // TODO: Replace with actual navigation
  };

  const handleNavigate = (path: string) => {
    console.log("Navigate to:", path);
    // TODO: Replace with actual navigation
  };

  const handleAddToCart = (productId: string, variantId: string) => {
    console.log("Add to cart:", productId, variantId);
    // TODO: Replace with actual cart functionality
  };

  const handleToggleWishlist = (productId: string) => {
    console.log("Toggle wishlist:", productId);
    // TODO: Replace with actual wishlist functionality
  };

  const handleProductClick = (productId: string) => {
    console.log("Navigate to product:", productId);
    // TODO: Replace with actual navigation
  };

  const handleNewsletterSubscribe = (email: string) => {
    console.log("Newsletter subscription:", email);
    // TODO: Replace with actual newsletter functionality
  };

  // Featured products for homepage
  const featuredProducts = mockProducts.slice(0, 8);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header cartItemCount={3} onSearch={handleSearch} />
      
      {/* Theme Toggle - Positioned in top right */}
      <div className="fixed top-20 right-4 z-40">
        <ThemeToggle />
      </div>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-6">
          <HeroSection onNavigate={handleNavigate} />
        </div>

        {/* Category Grid */}
        <CategoryGrid onCategoryClick={handleCategoryClick} />

        {/* Featured Products */}
        <section className="py-12 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4" data-testid="heading-featured-products">
                Featured Products
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Discover our handpicked selection of premium shirts that combine style, comfort, and quality
              </p>
            </div>

            <ProductGrid
              products={featuredProducts}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              onProductClick={handleProductClick}
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer onNewsletterSubscribe={handleNewsletterSubscribe} />
    </div>
  );
}