import { useState } from "react";
import { X, Filter } from "lucide-react";
import Header from "@/components/Header";
import ProductFilters from "@/components/ProductFilters";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { extendedMockProducts } from "@/lib/mockData";

interface FilterState {
  colors: string[];
  sizes: string[];
  materials: string[];
  patterns: string[];
  fits: string[];
  sleeves: string[];
  brands: string[];
  priceRange: [number, number];
  rating: number;
}

export default function ProductListing() {
  const [filters, setFilters] = useState<FilterState>({
    colors: [],
    sizes: [],
    materials: [],
    patterns: [],
    fits: [],
    sleeves: [],
    brands: [],
    priceRange: [0, 100],
    rating: 0,
  });
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // TODO: Replace with real filtering logic
  const filteredProducts = extendedMockProducts.slice(0, 24);

  const handleSearch = (query: string) => {
    console.log("Search query:", query);
    // TODO: Replace with actual search functionality
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

  const activeFiltersCount = 
    filters.colors.length + 
    filters.sizes.length + 
    filters.materials.length + 
    filters.patterns.length +
    filters.fits.length +
    filters.sleeves.length +
    filters.brands.length +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 100 ? 1 : 0) +
    (filters.rating > 0 ? 1 : 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header cartItemCount={5} onSearch={handleSearch} />
      
      {/* Theme Toggle */}
      <div className="fixed top-20 right-4 z-40">
        <ThemeToggle />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24">
              <ProductFilters
                filters={filters}
                onFiltersChange={setFilters}
              />
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            {/* Page Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold" data-testid="heading-products">
                    All Shirts
                  </h1>
                  <p className="text-muted-foreground">
                    Discover our complete collection of premium shirts
                  </p>
                </div>

                {/* Mobile Filter Button */}
                <div className="lg:hidden">
                  <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="relative" data-testid="button-mobile-filters">
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                        {activeFiltersCount > 0 && (
                          <Badge 
                            variant="destructive" 
                            className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs"
                          >
                            {activeFiltersCount}
                          </Badge>
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80">
                      <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                      </SheetHeader>
                      <div className="mt-4">
                        <ProductFilters
                          filters={filters}
                          onFiltersChange={setFilters}
                        />
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>

              {/* Active Filters */}
              {activeFiltersCount > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-sm text-muted-foreground">Active filters:</span>
                  {filters.colors.map(color => (
                    <Badge key={color} variant="secondary" className="gap-1">
                      {color}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 ml-1"
                        onClick={() => setFilters(prev => ({
                          ...prev,
                          colors: prev.colors.filter(c => c !== color)
                        }))}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                  {filters.sizes.map(size => (
                    <Badge key={size} variant="secondary" className="gap-1">
                      {size}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 ml-1"
                        onClick={() => setFilters(prev => ({
                          ...prev,
                          sizes: prev.sizes.filter(s => s !== size)
                        }))}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Products Grid */}
            <ProductGrid
              products={filteredProducts}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              onProductClick={handleProductClick}
            />
          </main>
        </div>
      </div>

      {/* Footer */}
      <Footer onNewsletterSubscribe={(email) => console.log("Newsletter:", email)} />
    </div>
  );
}