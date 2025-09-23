import ProductGrid from "../ProductGrid";
import { extendedMockProducts } from "@/lib/mockData";

export default function ProductGridExample() {
  return (
    <div className="p-6 bg-background">
      <ProductGrid
        products={extendedMockProducts.slice(0, 12)}
        onAddToCart={(productId, variantId) => 
          console.log("Added to cart:", productId, variantId)
        }
        onToggleWishlist={(productId) => 
          console.log("Toggled wishlist:", productId)
        }
        onProductClick={(productId) => 
          console.log("Product clicked:", productId)
        }
      />
    </div>
  );
}