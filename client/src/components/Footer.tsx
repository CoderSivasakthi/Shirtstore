import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface FooterProps {
  onNewsletterSubscribe?: (email: string) => void;
}

export default function Footer({ onNewsletterSubscribe }: FooterProps) {
  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    console.log("Newsletter subscription:", email);
    onNewsletterSubscribe?.(email);
  };

  const footerSections = [
    {
      title: "Shop",
      links: [
        { name: "Casual Shirts", href: "/products?category=casual" },
        { name: "Formal Shirts", href: "/products?category=formal" },
        { name: "Polo Shirts", href: "/products?category=polo" },
        { name: "T-Shirts", href: "/products?category=tshirt" },
        { name: "Sale", href: "/sale" },
      ],
    },
    {
      title: "Customer Service",
      links: [
        { name: "Contact Us", href: "/contact" },
        { name: "Size Guide", href: "/size-guide" },
        { name: "Shipping Info", href: "/shipping" },
        { name: "Returns", href: "/returns" },
        { name: "Track Order", href: "/track-order" },
      ],
    },
    {
      title: "About",
      links: [
        { name: "Our Story", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Press", href: "/press" },
        { name: "Sustainability", href: "/sustainability" },
        { name: "Reviews", href: "/reviews" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Cookie Policy", href: "/cookies" },
        { name: "Accessibility", href: "/accessibility" },
        { name: "Sitemap", href: "/sitemap" },
      ],
    },
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "https://facebook.com" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
    { name: "YouTube", icon: Youtube, href: "https://youtube.com" },
  ];

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="font-bold text-2xl text-primary mb-4" data-testid="footer-logo">
              ShirtStore
            </div>
            <p className="text-muted-foreground mb-4 max-w-sm">
              Your trusted destination for premium quality shirts. 
              Discover comfort, style, and exceptional craftsmanship in every piece.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span data-testid="footer-phone">1-800-SHIRTS</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span data-testid="footer-email">support@shirtstore.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span data-testid="footer-address">123 Fashion St, NY 10001</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4" data-testid={`footer-section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}>
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Button
                      variant="ghost"
                      className="h-auto p-0 font-normal text-muted-foreground hover:text-foreground justify-start"
                      onClick={() => console.log("Footer link clicked:", link.href)}
                      data-testid={`footer-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {link.name}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        {/* Newsletter Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-lg mb-2" data-testid="newsletter-title">
              Stay Updated
            </h3>
            <p className="text-muted-foreground">
              Subscribe to get special offers, free giveaways, and exclusive deals.
            </p>
          </div>
          <form onSubmit={handleNewsletterSubmit} className="flex w-full md:w-auto gap-2">
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="md:w-64"
              required
              data-testid="input-newsletter-email"
            />
            <Button type="submit" data-testid="button-newsletter-subscribe">
              Subscribe
            </Button>
          </form>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="text-sm text-muted-foreground" data-testid="footer-copyright">
            © 2024 ShirtStore. All rights reserved.
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2">
            {socialLinks.map((social) => (
              <Button
                key={social.name}
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover-elevate"
                onClick={() => console.log("Social link clicked:", social.name)}
                data-testid={`social-${social.name.toLowerCase()}`}
              >
                <social.icon className="h-4 w-4" />
                <span className="sr-only">{social.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}