import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, ShoppingCart, User, Menu, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface HeaderProps {
  cartItemCount?: number;
  onSearch?: (query: string) => void;
}

export default function Header({ cartItemCount = 3, onSearch }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [location] = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search triggered:", searchQuery);
    onSearch?.(searchQuery);
  };

  const navigation = [
    { name: "Home", path: "/" },
    { name: "Casual", path: "/products?category=casual" },
    { name: "Formal", path: "/products?category=formal" },
    { name: "Polo", path: "/products?category=polo" },
    { name: "Sale", path: "/sale" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center gap-4">
        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <div className="flex flex-col gap-4">
                <div className="font-semibold text-lg">ShirtStore</div>
                <nav className="flex flex-col gap-2">
                  {navigation.map((item) => (
                    <Link key={item.path} href={item.path}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        data-testid={`link-${item.name.toLowerCase()}`}
                      >
                        {item.name}
                      </Button>
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="font-bold text-xl text-primary" data-testid="link-logo">
            ShirtStore
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navigation.map((item) => (
            <Link key={item.path} href={item.path}>
              <Button
                variant="ghost"
                className={`hover-elevate ${location === item.path ? "text-primary" : ""}`}
                data-testid={`link-${item.name.toLowerCase()}`}
              >
                {item.name}
              </Button>
            </Link>
          ))}
        </nav>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-4">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="search"
              placeholder="Search for shirts..."
              className="pl-10 pr-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              data-testid="input-search"
            />
            {/* Search Suggestions - Mock */}
            {isSearchFocused && searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-popover border rounded-md shadow-lg z-50">
                <div className="p-2 text-sm text-muted-foreground">
                  Suggestions for "{searchQuery}"
                </div>
                <div className="border-t">
                  {["casual shirts", "formal shirts", "blue shirts"].map((suggestion) => (
                    <button
                      key={suggestion}
                      className="w-full text-left px-4 py-2 text-sm hover-elevate"
                      onClick={() => {
                        setSearchQuery(suggestion);
                        console.log("Suggestion selected:", suggestion);
                      }}
                      data-testid={`suggestion-${suggestion.replace(" ", "-")}`}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Wishlist */}
          <Button variant="ghost" size="icon" className="hover-elevate" data-testid="button-wishlist">
            <Heart className="h-5 w-5" />
          </Button>

          {/* Cart */}
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative hover-elevate" data-testid="button-cart">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs"
                  data-testid="badge-cart-count"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </Link>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hover-elevate" data-testid="button-user-menu">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem data-testid="menu-profile">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem data-testid="menu-orders">
                <span>Order History</span>
              </DropdownMenuItem>
              <DropdownMenuItem data-testid="menu-wishlist">
                <Heart className="mr-2 h-4 w-4" />
                <span>Wishlist</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem data-testid="menu-login">
                <span>Login</span>
              </DropdownMenuItem>
              <DropdownMenuItem data-testid="menu-signup">
                <span>Sign Up</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}