import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
  featured?: boolean;
}

interface CategoryGridProps {
  onCategoryClick?: (categoryId: string) => void;
}

export default function CategoryGrid({ onCategoryClick }: CategoryGridProps) {
  // TODO: Remove mock functionality - replace with real category data
  const categories: Category[] = [
    {
      id: "casual",
      name: "Casual Shirts",
      description: "Comfortable everyday wear",
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=300&fit=crop&crop=center",
      productCount: 125,
      featured: true,
    },
    {
      id: "formal",
      name: "Formal Shirts",
      description: "Professional business attire",
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=300&fit=crop&crop=center",
      productCount: 89,
      featured: true,
    },
    {
      id: "polo",
      name: "Polo Shirts",
      description: "Smart casual comfort",
      image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&h=300&fit=crop&crop=center",
      productCount: 67,
    },
    {
      id: "tshirt",
      name: "T-Shirts",
      description: "Casual comfort wear",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop&crop=center",
      productCount: 156,
    },
    {
      id: "denim",
      name: "Denim Shirts",
      description: "Rugged casual style",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop&crop=center",
      productCount: 43,
    },
    {
      id: "linen",
      name: "Linen Shirts",
      description: "Breathable summer wear",
      image: "https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?w=400&h=300&fit=crop&crop=center",
      productCount: 32,
    },
  ];

  const handleCategoryClick = (categoryId: string) => {
    console.log("Category clicked:", categoryId);
    onCategoryClick?.(categoryId);
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4" data-testid="heading-categories">
            Shop by Category
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our diverse collection of shirts, each category crafted to meet your style needs
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="group cursor-pointer overflow-hidden hover-elevate transition-all duration-300"
              onClick={() => handleCategoryClick(category.id)}
              data-testid={`card-category-${category.id}`}
            >
              <CardContent className="p-0">
                {/* Category Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    data-testid={`img-category-${category.id}`}
                  />
                  
                  {/* Featured Badge */}
                  {category.featured && (
                    <Badge 
                      className="absolute top-3 left-3 bg-primary/90 text-white"
                      data-testid={`badge-featured-${category.id}`}
                    >
                      Featured
                    </Badge>
                  )}

                  {/* Overlay with Content */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 
                        className="text-xl font-bold mb-2"
                        data-testid={`title-category-${category.id}`}
                      >
                        {category.name}
                      </h3>
                      <p 
                        className="text-white/90 text-sm mb-3"
                        data-testid={`description-category-${category.id}`}
                      >
                        {category.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span 
                          className="text-white/80 text-sm"
                          data-testid={`count-category-${category.id}`}
                        >
                          {category.productCount} products
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white hover:bg-white/20 p-2"
                          data-testid={`button-category-${category.id}`}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Categories Button */}
        <div className="text-center mt-8">
          <Button
            variant="outline"
            size="lg"
            onClick={() => handleCategoryClick("all")}
            data-testid="button-view-all-categories"
          >
            View All Categories
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}