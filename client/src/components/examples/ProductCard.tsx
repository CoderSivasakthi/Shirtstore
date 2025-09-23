import ProductCard from "../ProductCard";
import { mockProducts } from "@/lib/mockData";

export default function ProductCardExample() {
  return (
    <div className="p-6 bg-background">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockProducts.slice(0, 4).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={(productId, variantId) => 
              console.log("Added to cart:", productId, variantId)
            }
            onToggleWishlist={(productId) => 
              console.log("Toggled wishlist:", productId)
            }
          />
        ))}
      </div>
    </div>
  );
}