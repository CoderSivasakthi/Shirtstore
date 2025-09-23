import { useState } from "react";
import { Heart, Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ProductWithVariants } from "@shared/schema";

interface ProductCardProps {
  product: ProductWithVariants;
  onAddToCart?: (productId: string, variantId: string) => void;
  onToggleWishlist?: (productId: string) => void;
  className?: string;
}

export default function ProductCard({ 
  product, 
  onAddToCart, 
  onToggleWishlist,
  className = "" 
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const defaultVariant = product.variants[0];
  const discountedPrice = defaultVariant?.discountPercent 
    ? (parseFloat(defaultVariant.price) * (1 - defaultVariant.discountPercent / 100)).toFixed(2)
    : defaultVariant?.price;

  const handleAddToCart = () => {
    if (defaultVariant) {
      console.log("Add to cart:", product.id, defaultVariant.id);
      onAddToCart?.(product.id, defaultVariant.id);
    }
  };

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    console.log("Toggle wishlist:", product.id, !isWishlisted);
    onToggleWishlist?.(product.id);
  };

  return (
    <Card 
      className={`group cursor-pointer transition-all duration-200 hover-elevate ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`card-product-${product.id}`}
    >
      <CardContent className="p-0">
        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-t-lg">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            data-testid={`img-product-${product.id}`}
          />
          
          {/* Discount Badge */}
          {defaultVariant?.discountPercent && defaultVariant.discountPercent > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute top-2 left-2"
              data-testid={`badge-discount-${product.id}`}
            >
              {defaultVariant.discountPercent}% OFF
            </Badge>
          )}

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover-elevate ${
              isWishlisted ? "text-red-500" : "text-muted-foreground"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              handleToggleWishlist();
            }}
            data-testid={`button-wishlist-${product.id}`}
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
          </Button>

          {/* Quick Add to Cart - shown on hover */}
          <div className={`absolute bottom-2 left-2 right-2 transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}>
            <Button
              className="w-full bg-primary/90 backdrop-blur-sm hover:bg-primary"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart();
              }}
              data-testid={`button-quick-add-${product.id}`}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Quick Add
            </Button>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-4 space-y-2">
          {/* Brand */}
          <div className="text-xs text-muted-foreground font-medium" data-testid={`text-brand-${product.id}`}>
            {product.brand}
          </div>

          {/* Name */}
          <h3 className="font-medium text-sm line-clamp-2 min-h-[2.5rem]" data-testid={`text-name-${product.id}`}>
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium" data-testid={`text-rating-${product.id}`}>
                {product.rating}
              </span>
            </div>
            <span className="text-xs text-muted-foreground" data-testid={`text-reviews-${product.id}`}>
              ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg" data-testid={`text-price-${product.id}`}>
              ${discountedPrice}
            </span>
            {defaultVariant?.discountPercent && defaultVariant.discountPercent > 0 && (
              <span className="text-sm text-muted-foreground line-through" data-testid={`text-original-price-${product.id}`}>
                ${defaultVariant.price}
              </span>
            )}
          </div>

          {/* Available Sizes */}
          <div className="flex items-center gap-1 flex-wrap">
            <span className="text-xs text-muted-foreground">Sizes:</span>
            {product.variants.map((variant) => (
              <Badge 
                key={variant.id} 
                variant="outline" 
                className="text-xs h-5 px-1"
                data-testid={`badge-size-${variant.size}-${product.id}`}
              >
                {variant.size}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}