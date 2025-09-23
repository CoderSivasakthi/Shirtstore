import { useState } from "react";
import ProductFilters from "../ProductFilters";

export default function ProductFiltersExample() {
  const [filters, setFilters] = useState({
    colors: ["Blue"],
    sizes: ["M", "L"],
    materials: [],
    patterns: [],
    fits: [],
    sleeves: [],
    brands: [],
    priceRange: [20, 80] as [number, number],
    rating: 0,
  });

  return (
    <div className="p-6 bg-background">
      <div className="max-w-sm">
        <ProductFilters
          filters={filters}
          onFiltersChange={setFilters}
        />
      </div>
    </div>
  );
}