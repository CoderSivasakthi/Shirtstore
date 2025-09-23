import { useState } from "react";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { mockProducts } from "@/lib/mockData";

interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  quantity: number;
  product: typeof mockProducts[0];
  variant: typeof mockProducts[0]["variants"][0];
}

export default function Cart() {
  // TODO: Replace with real cart data from context/store
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      productId: "1",
      variantId: "v1",
      quantity: 2,
      product: mockProducts[0],
      variant: mockProducts[0].variants[0],
    },
    {
      id: "2",
      productId: "2",
      variantId: "v5",
      quantity: 1,
      product: mockProducts[1],
      variant: mockProducts[1].variants[0],
    },
  ]);

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) return;
    
    setCartItems(prev =>
      prev.map(item =>
        item.id === itemId
          ? { ...item, quantity: Math.min(newQuantity, item.variant.stock) }
          : item
      )
    );
    console.log("Updated quantity:", itemId, newQuantity);
  };

  const removeItem = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
    console.log("Removed item:", itemId);
  };

  const clearCart = () => {
    setCartItems([]);
    console.log("Cart cleared");
  };

  const calculateItemTotal = (item: CartItem) => {
    const price = item.variant.discountPercent 
      ? parseFloat(item.variant.price) * (1 - item.variant.discountPercent / 100)
      : parseFloat(item.variant.price);
    return price * item.quantity;
  };

  const subtotal = cartItems.reduce((total, item) => total + calculateItemTotal(item), 0);
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    console.log("Proceed to checkout");
    // TODO: Navigate to checkout page
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header cartItemCount={0} onSearch={(query) => console.log("Search:", query)} />
        
        <div className="fixed top-20 right-4 z-40">
          <ThemeToggle />
        </div>

        <main className="container mx-auto px-4 py-12">
          <div className="text-center max-w-md mx-auto">
            <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
            <h1 className="text-2xl font-bold mb-4" data-testid="heading-empty-cart">
              Your cart is empty
            </h1>
            <p className="text-muted-foreground mb-6">
              Add some shirts to your cart to get started!
            </p>
            <Link href="/products">
              <Button size="lg" data-testid="button-shop-now">
                Start Shopping
              </Button>
            </Link>
          </div>
        </main>

        <Footer onNewsletterSubscribe={(email) => console.log("Newsletter:", email)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemCount={cartItems.length} onSearch={(query) => console.log("Search:", query)} />
      
      <div className="fixed top-20 right-4 z-40">
        <ThemeToggle />
      </div>

      <main className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/products">
            <Button variant="ghost" size="icon" data-testid="button-back">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold" data-testid="heading-cart">
              Shopping Cart
            </h1>
            <p className="text-muted-foreground">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Items</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearCart}
                data-testid="button-clear-cart"
              >
                Clear Cart
              </Button>
            </div>

            {cartItems.map((item) => {
              const discountedPrice = item.variant.discountPercent 
                ? parseFloat(item.variant.price) * (1 - item.variant.discountPercent / 100)
                : parseFloat(item.variant.price);

              return (
                <Card key={item.id} data-testid={`cart-item-${item.id}`}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                          data-testid={`img-cart-item-${item.id}`}
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-lg" data-testid={`name-cart-item-${item.id}`}>
                              {item.product.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {item.product.brand}
                            </p>
                            <div className="flex items-center gap-4 mt-2 text-sm">
                              <span>Color: {item.variant.color}</span>
                              <span>Size: {item.variant.size}</span>
                            </div>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            data-testid={`button-remove-${item.id}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Price and Quantity */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-lg" data-testid={`price-cart-item-${item.id}`}>
                              ${discountedPrice.toFixed(2)}
                            </span>
                            {item.variant.discountPercent > 0 && (
                              <Badge variant="destructive" className="text-xs">
                                {item.variant.discountPercent}% OFF
                              </Badge>
                            )}
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              data-testid={`button-decrease-${item.id}`}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-12 text-center font-medium" data-testid={`quantity-${item.id}`}>
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={item.quantity >= item.variant.stock}
                              data-testid={`button-increase-${item.id}`}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Item Total */}
                        <div className="text-right mt-2">
                          <span className="font-semibold" data-testid={`total-cart-item-${item.id}`}>
                            Total: ${calculateItemTotal(item).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4" data-testid="heading-order-summary">
                  Order Summary
                </h2>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span data-testid="text-subtotal">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span data-testid="text-shipping">
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span data-testid="text-tax">${tax.toFixed(2)}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span data-testid="text-total">${total.toFixed(2)}</span>
                  </div>
                </div>

                {shipping > 0 && (
                  <div className="mt-4 p-3 bg-muted rounded-lg text-sm">
                    Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                  </div>
                )}

                <Button 
                  className="w-full mt-6" 
                  size="lg"
                  onClick={handleCheckout}
                  data-testid="button-checkout"
                >
                  Proceed to Checkout
                </Button>

                <Link href="/products">
                  <Button 
                    variant="outline" 
                    className="w-full mt-3"
                    data-testid="button-continue-shopping"
                  >
                    Continue Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer onNewsletterSubscribe={(email) => console.log("Newsletter:", email)} />
    </div>
  );
}