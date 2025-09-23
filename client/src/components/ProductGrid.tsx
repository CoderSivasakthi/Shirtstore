import { useState } from "react";
import { Grid, List, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import ProductCard from "./ProductCard";
import { ProductWithVariants } from "@shared/schema";

interface ProductGridProps {
  products: ProductWithVariants[];
  isLoading?: boolean;
  onAddToCart?: (productId: string, variantId: string) => void;
  onToggleWishlist?: (productId: string) => void;
  onProductClick?: (productId: string) => void;
}

export default function ProductGrid({
  products,
  isLoading = false,
  onAddToCart,
  onToggleWishlist,
  onProductClick,
}: ProductGridProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("relevance");

  const sortOptions = [
    { value: "relevance", label: "Relevance" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Customer Rating" },
    { value: "newest", label: "Newest First" },
    { value: "popular", label: "Most Popular" },
  ];

  const handleSortChange = (value: string) => {
    setSortBy(value);
    console.log("Sort changed:", value);
  };

  const handleProductClick = (productId: string) => {
    console.log("Product clicked:", productId);
    onProductClick?.(productId);
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between">
          <div className="h-6 w-32 bg-muted rounded animate-pulse" />
          <div className="flex gap-2">
            <div className="h-10 w-32 bg-muted rounded animate-pulse" />
            <div className="h-10 w-20 bg-muted rounded animate-pulse" />
          </div>
        </div>
        
        {/* Grid Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="aspect-[4/5] bg-muted rounded-lg animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
                <div className="h-4 w-1/2 bg-muted rounded animate-pulse" />
                <div className="h-6 w-1/3 bg-muted rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground" data-testid="text-products-count">
            {products.length} products
          </span>
          {products.length > 0 && (
            <Badge variant="outline" data-testid="badge-results-found">
              Found {products.length} results
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Sort Dropdown */}
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-48" data-testid="select-sort">
              <SelectValue placeholder="Sort by" />
              <ChevronDown className="h-4 w-4" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem 
                  key={option.value} 
                  value={option.value}
                  data-testid={`sort-option-${option.value}`}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* View Mode Toggle */}
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => {
                setViewMode("grid");
                console.log("View mode: grid");
              }}
              className="rounded-r-none border-r"
              data-testid="button-view-grid"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => {
                setViewMode("list");
                console.log("View mode: list");
              }}
              className="rounded-l-none"
              data-testid="button-view-list"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Products Grid/List */}
      {products.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-muted-foreground text-lg mb-2" data-testid="text-no-products">
            No products found
          </div>
          <p className="text-muted-foreground">
            Try adjusting your filters or search criteria
          </p>
        </div>
      ) : (
        <div 
          className={
            viewMode === "grid"
              ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              : "flex flex-col gap-4"
          }
          data-testid={`products-${viewMode}`}
        >
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              className="cursor-pointer"
            >
              <ProductCard
                product={product}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                className={viewMode === "list" ? "flex-row" : ""}
              />
            </div>
          ))}
        </div>
      )}

      {/* Load More Button (for pagination) */}
      {products.length > 0 && products.length >= 20 && (
        <div className="text-center pt-6">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => console.log("Load more products")}
            data-testid="button-load-more"
          >
            Load More Products
          </Button>
        </div>
      )}
    </div>
  );
}