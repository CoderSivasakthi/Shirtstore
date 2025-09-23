import { useState } from "react";
import { ArrowLeft, CreditCard, MapPin, Package, Check } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { mockProducts } from "@/lib/mockData";

interface CheckoutItem {
  id: string;
  product: typeof mockProducts[0];
  variant: typeof mockProducts[0]["variants"][0];
  quantity: number;
}

export default function Checkout() {
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [sameAsShipping, setSameAsShipping] = useState(true);
  
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });

  const [billingAddress, setBillingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });

  const [cardInfo, setCardInfo] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  // TODO: Replace with real cart items
  const cartItems: CheckoutItem[] = [
    {
      id: "1",
      product: mockProducts[0],
      variant: mockProducts[0].variants[0],
      quantity: 2,
    },
    {
      id: "2",
      product: mockProducts[1],
      variant: mockProducts[1].variants[0],
      quantity: 1,
    },
  ];

  const calculateItemTotal = (item: CheckoutItem) => {
    const price = item.variant.discountPercent 
      ? parseFloat(item.variant.price) * (1 - item.variant.discountPercent / 100)
      : parseFloat(item.variant.price);
    return price * item.quantity;
  };

  const subtotal = cartItems.reduce((total, item) => total + calculateItemTotal(item), 0);
  const shippingCost = shippingMethod === "standard" ? 0 : shippingMethod === "express" ? 9.99 : 19.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  const handlePlaceOrder = () => {
    console.log("Order placed:", {
      items: cartItems,
      shippingAddress,
      billingAddress: sameAsShipping ? shippingAddress : billingAddress,
      shippingMethod,
      paymentMethod,
      total,
    });
    // TODO: Process payment and create order
    setCurrentStep(4); // Go to confirmation
  };

  const steps = [
    { number: 1, title: "Shipping", icon: MapPin },
    { number: 2, title: "Payment", icon: CreditCard },
    { number: 3, title: "Review", icon: Package },
    { number: 4, title: "Confirmation", icon: Check },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemCount={cartItems.length} onSearch={(query) => console.log("Search:", query)} />
      
      <div className="fixed top-20 right-4 z-40">
        <ThemeToggle />
      </div>

      <main className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/cart">
            <Button variant="ghost" size="icon" data-testid="button-back-to-cart">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold" data-testid="heading-checkout">
            Checkout
          </h1>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.number 
                    ? "bg-primary border-primary text-primary-foreground" 
                    : "border-muted-foreground text-muted-foreground"
                }`}>
                  {currentStep > step.number ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <step.icon className="h-5 w-5" />
                  )}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= step.number ? "text-foreground" : "text-muted-foreground"
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 ${
                    currentStep > step.number ? "bg-primary" : "bg-muted"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={shippingAddress.firstName}
                        onChange={(e) => setShippingAddress(prev => ({ ...prev, firstName: e.target.value }))}
                        required
                        data-testid="input-shipping-first-name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={shippingAddress.lastName}
                        onChange={(e) => setShippingAddress(prev => ({ ...prev, lastName: e.target.value }))}
                        required
                        data-testid="input-shipping-last-name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={shippingAddress.email}
                        onChange={(e) => setShippingAddress(prev => ({ ...prev, email: e.target.value }))}
                        required
                        data-testid="input-shipping-email"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        value={shippingAddress.phone}
                        onChange={(e) => setShippingAddress(prev => ({ ...prev, phone: e.target.value }))}
                        required
                        data-testid="input-shipping-phone"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      value={shippingAddress.address}
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, address: e.target.value }))}
                      required
                      data-testid="input-shipping-address"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="apartment">Apartment, suite, etc.</Label>
                    <Input
                      id="apartment"
                      value={shippingAddress.apartment}
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, apartment: e.target.value }))}
                      data-testid="input-shipping-apartment"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={shippingAddress.city}
                        onChange={(e) => setShippingAddress(prev => ({ ...prev, city: e.target.value }))}
                        required
                        data-testid="input-shipping-city"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={shippingAddress.state}
                        onChange={(e) => setShippingAddress(prev => ({ ...prev, state: e.target.value }))}
                        required
                        data-testid="input-shipping-state"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        value={shippingAddress.zipCode}
                        onChange={(e) => setShippingAddress(prev => ({ ...prev, zipCode: e.target.value }))}
                        required
                        data-testid="input-shipping-zip"
                      />
                    </div>
                  </div>

                  {/* Shipping Method */}
                  <div className="space-y-4 pt-4">
                    <h3 className="font-medium">Shipping Method</h3>
                    <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="standard" id="standard" />
                        <Label htmlFor="standard" className="flex-1 cursor-pointer">
                          <div className="flex justify-between">
                            <span>Standard Shipping (5-7 days)</span>
                            <span className="font-medium">Free</span>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="express" id="express" />
                        <Label htmlFor="express" className="flex-1 cursor-pointer">
                          <div className="flex justify-between">
                            <span>Express Shipping (2-3 days)</span>
                            <span className="font-medium">$9.99</span>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="overnight" id="overnight" />
                        <Label htmlFor="overnight" className="flex-1 cursor-pointer">
                          <div className="flex justify-between">
                            <span>Overnight Shipping (1 day)</span>
                            <span className="font-medium">$19.99</span>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Button 
                    className="w-full" 
                    onClick={() => setCurrentStep(2)}
                    data-testid="button-continue-to-payment"
                  >
                    Continue to Payment
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Payment Information */}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Payment Method */}
                  <div>
                    <h3 className="font-medium mb-4">Payment Method</h3>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex-1 cursor-pointer">
                          Credit/Debit Card
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                          PayPal
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Card Information */}
                  {paymentMethod === "card" && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number *</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={cardInfo.number}
                          onChange={(e) => setCardInfo(prev => ({ ...prev, number: e.target.value }))}
                          data-testid="input-card-number"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date *</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            value={cardInfo.expiry}
                            onChange={(e) => setCardInfo(prev => ({ ...prev, expiry: e.target.value }))}
                            data-testid="input-card-expiry"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV *</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={cardInfo.cvv}
                            onChange={(e) => setCardInfo(prev => ({ ...prev, cvv: e.target.value }))}
                            data-testid="input-card-cvv"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cardName">Name on Card *</Label>
                        <Input
                          id="cardName"
                          value={cardInfo.name}
                          onChange={(e) => setCardInfo(prev => ({ ...prev, name: e.target.value }))}
                          data-testid="input-card-name"
                        />
                      </div>
                    </div>
                  )}

                  {/* Billing Address */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="sameAsShipping"
                        checked={sameAsShipping}
                        onCheckedChange={(checked) => setSameAsShipping(checked as boolean)}
                        data-testid="checkbox-same-as-shipping"
                      />
                      <Label htmlFor="sameAsShipping">
                        Billing address is the same as shipping address
                      </Label>
                    </div>

                    {!sameAsShipping && (
                      <div className="space-y-4 p-4 border rounded-lg">
                        <h4 className="font-medium">Billing Address</h4>
                        {/* Billing address fields - simplified for demo */}
                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            placeholder="First Name"
                            value={billingAddress.firstName}
                            onChange={(e) => setBillingAddress(prev => ({ ...prev, firstName: e.target.value }))}
                            data-testid="input-billing-first-name"
                          />
                          <Input
                            placeholder="Last Name"
                            value={billingAddress.lastName}
                            onChange={(e) => setBillingAddress(prev => ({ ...prev, lastName: e.target.value }))}
                            data-testid="input-billing-last-name"
                          />
                        </div>
                        <Input
                          placeholder="Address"
                          value={billingAddress.address}
                          onChange={(e) => setBillingAddress(prev => ({ ...prev, address: e.target.value }))}
                          data-testid="input-billing-address"
                        />
                        <div className="grid grid-cols-3 gap-4">
                          <Input
                            placeholder="City"
                            value={billingAddress.city}
                            onChange={(e) => setBillingAddress(prev => ({ ...prev, city: e.target.value }))}
                            data-testid="input-billing-city"
                          />
                          <Input
                            placeholder="State"
                            value={billingAddress.state}
                            onChange={(e) => setBillingAddress(prev => ({ ...prev, state: e.target.value }))}
                            data-testid="input-billing-state"
                          />
                          <Input
                            placeholder="ZIP"
                            value={billingAddress.zipCode}
                            onChange={(e) => setBillingAddress(prev => ({ ...prev, zipCode: e.target.value }))}
                            data-testid="input-billing-zip"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setCurrentStep(1)}
                      data-testid="button-back-to-shipping"
                    >
                      Back to Shipping
                    </Button>
                    <Button 
                      className="flex-1" 
                      onClick={() => setCurrentStep(3)}
                      data-testid="button-continue-to-review"
                    >
                      Continue to Review
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Order Review */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Review Your Order</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Order Items */}
                  <div>
                    <h3 className="font-medium mb-4">Order Items</h3>
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium">{item.product.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {item.variant.color} • {item.variant.size}
                            </p>
                            <p className="text-sm">Qty: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              ${calculateItemTotal(item).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Addresses Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2">Shipping Address</h4>
                      <p className="text-sm">
                        {shippingAddress.firstName} {shippingAddress.lastName}<br />
                        {shippingAddress.address}<br />
                        {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
                      </p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2">Payment Method</h4>
                      <p className="text-sm">
                        {paymentMethod === "card" ? "Credit/Debit Card" : "PayPal"}
                        {paymentMethod === "card" && cardInfo.number && (
                          <><br />**** **** **** {cardInfo.number.slice(-4)}</>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setCurrentStep(2)}
                      data-testid="button-back-to-payment"
                    >
                      Back to Payment
                    </Button>
                    <Button 
                      className="flex-1" 
                      onClick={handlePlaceOrder}
                      data-testid="button-place-order"
                    >
                      Place Order
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Order Confirmation */}
            {currentStep === 4 && (
              <Card>
                <CardContent className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2" data-testid="heading-order-confirmation">
                    Order Confirmed!
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Thank you for your purchase. Your order has been received and is being processed.
                  </p>
                  <p className="text-sm text-muted-foreground mb-6">
                    Order #ORD-{Date.now().toString().slice(-6)}
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Link href="/profile">
                      <Button data-testid="button-view-orders">
                        View Orders
                      </Button>
                    </Link>
                    <Link href="/">
                      <Button variant="outline" data-testid="button-continue-shopping">
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.product.name} × {item.quantity}</span>
                    <span>${calculateItemTotal(item).toFixed(2)}</span>
                  </div>
                ))}

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span data-testid="text-checkout-subtotal">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span data-testid="text-checkout-shipping">
                      {shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span data-testid="text-checkout-tax">${tax.toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span data-testid="text-checkout-total">${total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer onNewsletterSubscribe={(email) => console.log("Newsletter:", email)} />
    </div>
  );
}