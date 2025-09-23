# ShirtStore E-commerce Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from Flipkart's e-commerce design patterns, focusing on product discovery, trust-building, and conversion optimization. The design emphasizes visual merchandising with clean product presentation and intuitive navigation.

## Core Design Elements

### Color Palette
**Light Mode:**
- Primary: 227 100% 50% (Flipkart blue)
- Background: 0 0% 98% 
- Surface: 0 0% 100%
- Text Primary: 220 13% 18%
- Text Secondary: 220 9% 46%

**Dark Mode:**
- Primary: 227 84% 60%
- Background: 220 13% 9%
- Surface: 220 13% 14%
- Text Primary: 210 40% 98%
- Text Secondary: 215 20% 65%

### Typography
- **Primary Font**: Inter (Google Fonts)
- **Headings**: Font weights 600-700, sizes from text-lg to text-4xl
- **Body**: Font weight 400-500, text-sm to text-base
- **Product Prices**: Font weight 600-700 for emphasis

### Layout System
**Tailwind Spacing Units**: Consistent use of 2, 4, 6, 8, 12, 16, 20, 24 for padding, margins, and gaps
- Container max-width: 7xl with responsive padding
- Grid systems: 1-6 columns based on screen size
- Section spacing: py-12 to py-20 for major sections

### Component Library

**Navigation:**
- Sticky header with search prominence
- Breadcrumb navigation on product pages
- Category mega-menus with visual icons

**Product Components:**
- Card design with 4:5 aspect ratio product images
- Hover states with subtle shadow elevation
- Rating stars and review counts
- Price display with discount indicators
- Quick-view modals for product previews

**Interactive Elements:**
- Primary buttons with rounded-lg corners
- Filter panels with collapsible sections
- Image galleries with thumbnail navigation
- Quantity selectors with plus/minus buttons
- Wishlist heart icons with animation

**Data Display:**
- Product grids: 2-6 columns responsive
- Filter sidebar with checkbox groups
- Sort dropdown with clear labels
- Pagination with page numbers
- Order history cards with status badges

### E-commerce Specific Features

**Product Pages:**
- Large image gallery with zoom functionality
- Size/color variant selection with visual swatches
- Stock indicators and delivery information
- Customer reviews section with ratings
- Related products carousel

**Shopping Experience:**
- Cart sidebar with item thumbnails
- Progress indicators for checkout flow
- Trust signals (secure payment icons, return policy)
- Recently viewed products tracking

**User Account:**
- Profile dashboard with order summary
- Address management with default selection
- Order tracking with status timeline
- Wishlist grid with remove functionality

### Images
- **Hero Section**: Large banner (16:9 aspect ratio) featuring seasonal shirt collections or brand storytelling
- **Product Images**: High-quality 4:5 aspect ratio product photos with consistent lighting and backgrounds
- **Category Banners**: 3:1 aspect ratio images for category navigation
- **Lifestyle Images**: 16:9 images showing shirts in context/styled looks
- **Brand Elements**: Logo variations for header, footer, and mobile

### Mobile Optimization
- Touch-friendly 44px minimum button sizes
- Swipeable product carousels
- Collapsible filter drawer
- Sticky add-to-cart button on product pages
- Mobile-optimized image galleries

### Performance Considerations
- Lazy loading for product images
- Skeleton loading states for product grids
- Progressive image enhancement
- Minimal animation usage focused on micro-interactions

This design system prioritizes product discovery, builds user trust through familiar e-commerce patterns, and maintains Flipkart's proven conversion-focused approach while ensuring excellent mobile experience.