import { useState } from "react";
import { useRoute } from "wouter";
import { Heart, Star, Truck, Shield, RotateCcw, Share2, Plus, Minus } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { mockProducts, extendedMockProducts } from "@/lib/mockData";

export default function ProductDetail() {
  const [, params] = useRoute("/product/:id");
  const productId = params?.id || "1";
  
  // TODO: Replace with real API call
  const product = mockProducts.find(p => p.id === productId) || mockProducts[0];
  const similarProducts = extendedMockProducts.slice(1, 5);
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedTab, setSelectedTab] = useState("description");

  const discountedPrice = selectedVariant?.discountPercent 
    ? (parseFloat(selectedVariant.price) * (1 - selectedVariant.discountPercent / 100)).toFixed(2)
    : selectedVariant?.price;

  const handleAddToCart = () => {
    console.log("Add to cart:", product.id, selectedVariant.id, quantity);
    // TODO: Add to cart functionality
  };

  const handleBuyNow = () => {
    console.log("Buy now:", product.id, selectedVariant.id, quantity);
    // TODO: Direct checkout functionality
  };

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    console.log("Toggle wishlist:", product.id, !isWishlisted);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemCount={3} onSearch={(query) => console.log("Search:", query)} />
      
      <div className="fixed top-20 right-4 z-40">
        <ThemeToggle />
      </div>

      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-6" data-testid="breadcrumb">
          Home / {product.category} / {product.name}
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <img
                src={product.images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
                data-testid="img-product-main"
              />
            </div>
            
            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index ? "border-primary" : "border-transparent"
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                    data-testid={`button-thumbnail-${index}`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Brand and Rating */}
            <div className="flex items-center justify-between">
              <Badge variant="outline" data-testid="badge-brand">{product.brand}</Badge>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium" data-testid="text-rating">{product.rating}</span>
                </div>
                <span className="text-muted-foreground" data-testid="text-reviews">
                  ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Product Name */}
            <h1 className="text-3xl font-bold" data-testid="heading-product-name">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold" data-testid="text-price">
                ${discountedPrice}
              </span>
              {selectedVariant?.discountPercent && selectedVariant.discountPercent > 0 && (
                <>
                  <span className="text-xl text-muted-foreground line-through" data-testid="text-original-price">
                    ${selectedVariant.price}
                  </span>
                  <Badge variant="destructive" data-testid="badge-discount">
                    {selectedVariant.discountPercent}% OFF
                  </Badge>
                </>
              )}
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Material:</span>
                <span className="ml-2 font-medium">{product.material}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Fit:</span>
                <span className="ml-2 font-medium">{product.fit}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Pattern:</span>
                <span className="ml-2 font-medium">{product.pattern}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Sleeve:</span>
                <span className="ml-2 font-medium">{product.sleeve}</span>
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="font-medium mb-3">Color: {selectedVariant.color}</h3>
              <div className="flex gap-2">
                {product.variants.filter((v, i, arr) => arr.findIndex(av => av.color === v.color) === i).map((variant) => (
                  <button
                    key={variant.color}
                    className={`w-12 h-12 rounded-full border-2 transition-colors ${
                      selectedVariant.color === variant.color ? "border-primary border-4" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: variant.color.toLowerCase() }}
                    onClick={() => setSelectedVariant(variant)}
                    data-testid={`button-color-${variant.color.toLowerCase()}`}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-medium mb-3">Size: {selectedVariant.size}</h3>
              <div className="flex gap-2 flex-wrap">
                {product.variants.filter(v => v.color === selectedVariant.color).map((variant) => (
                  <Button
                    key={variant.size}
                    variant={selectedVariant.size === variant.size ? "default" : "outline"}
                    className="min-w-12"
                    onClick={() => setSelectedVariant(variant)}
                    data-testid={`button-size-${variant.size}`}
                  >
                    {variant.size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-medium mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  data-testid="button-quantity-decrease"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium" data-testid="text-quantity">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.min(selectedVariant.stock, quantity + 1))}
                  disabled={quantity >= selectedVariant.stock}
                  data-testid="button-quantity-increase"
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground">
                  {selectedVariant.stock} in stock
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button 
                className="flex-1" 
                onClick={handleAddToCart}
                data-testid="button-add-to-cart"
              >
                Add to Cart
              </Button>
              <Button 
                variant="secondary" 
                className="flex-1"
                onClick={handleBuyNow}
                data-testid="button-buy-now"
              >
                Buy Now
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleToggleWishlist}
                data-testid="button-wishlist"
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current text-red-500" : ""}`} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => console.log("Share product")}
                data-testid="button-share"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <Truck className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Free Shipping</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Easy Returns</p>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">1 Year Warranty</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Card className="mb-12">
          <CardContent className="p-6">
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="description" data-testid="tab-description">Description</TabsTrigger>
                <TabsTrigger value="specifications" data-testid="tab-specifications">Specifications</TabsTrigger>
                <TabsTrigger value="reviews" data-testid="tab-reviews">Reviews</TabsTrigger>
                <TabsTrigger value="shipping" data-testid="tab-shipping">Shipping</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-6">
                <div className="prose max-w-none">
                  <p data-testid="text-description">{product.description}</p>
                  <p>This premium quality shirt is crafted with attention to detail and comfort. Perfect for both casual and semi-formal occasions, it offers exceptional durability and style.</p>
                </div>
              </TabsContent>
              
              <TabsContent value="specifications" className="mt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Product Details</h4>
                    <dl className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <dt>Material:</dt>
                        <dd>{product.material}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt>Fit:</dt>
                        <dd>{product.fit}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt>Pattern:</dt>
                        <dd>{product.pattern}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt>Sleeve Length:</dt>
                        <dd>{product.sleeve}</dd>
                      </div>
                    </dl>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Care Instructions</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Machine wash cold</li>
                      <li>• Do not bleach</li>
                      <li>• Tumble dry low</li>
                      <li>• Iron on medium heat</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Customer Reviews</h4>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{product.rating}</span>
                      <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    {/* Mock reviews */}
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="border-b pb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, j) => (
                              <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <span className="font-medium">Customer {i}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Great quality shirt! Fits perfectly and the material feels premium. 
                          Highly recommend for anyone looking for a comfortable yet stylish option.
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="shipping" className="mt-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Shipping Information</h4>
                    <ul className="text-sm space-y-2">
                      <li>• Free standard shipping on orders over $50</li>
                      <li>• Express shipping available for $9.99</li>
                      <li>• Standard delivery: 3-5 business days</li>
                      <li>• Express delivery: 1-2 business days</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Return Policy</h4>
                    <ul className="text-sm space-y-2">
                      <li>• 30-day return window</li>
                      <li>• Free returns for defective items</li>
                      <li>• Items must be in original condition</li>
                      <li>• Refund processed within 5-7 business days</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Similar Products */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6" data-testid="heading-similar-products">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {similarProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={(productId, variantId) => console.log("Add to cart:", productId, variantId)}
                onToggleWishlist={(productId) => console.log("Toggle wishlist:", productId)}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer onNewsletterSubscribe={(email) => console.log("Newsletter:", email)} />
    </div>
  );
}