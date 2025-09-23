import { useState } from "react";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { mockFilters } from "@/lib/mockData";

interface FilterState {
  colors: string[];
  sizes: string[];
  materials: string[];
  patterns: string[];
  fits: string[];
  sleeves: string[];
  brands: string[];
  priceRange: [number, number];
  rating: number;
}

interface ProductFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  className?: string;
}

export default function ProductFilters({ 
  filters, 
  onFiltersChange, 
  className = "" 
}: ProductFiltersProps) {
  const [expandedSections, setExpandedSections] = useState({
    colors: true,
    sizes: true,
    materials: false,
    patterns: false,
    fits: false,
    sleeves: false,
    brands: false,
    price: true,
    rating: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleArrayFilterChange = (
    filterType: keyof Pick<FilterState, "colors" | "sizes" | "materials" | "patterns" | "fits" | "sleeves" | "brands">,
    value: string,
    checked: boolean
  ) => {
    const currentValues = filters[filterType];
    const newValues = checked 
      ? [...currentValues, value]
      : currentValues.filter(v => v !== value);
    
    onFiltersChange({
      ...filters,
      [filterType]: newValues
    });
    console.log(`Filter changed: ${filterType}`, newValues);
  };

  const clearAllFilters = () => {
    const clearedFilters: FilterState = {
      colors: [],
      sizes: [],
      materials: [],
      patterns: [],
      fits: [],
      sleeves: [],
      brands: [],
      priceRange: [0, 100],
      rating: 0,
    };
    onFiltersChange(clearedFilters);
    console.log("All filters cleared");
  };

  const activeFiltersCount = 
    filters.colors.length + 
    filters.sizes.length + 
    filters.materials.length + 
    filters.patterns.length +
    filters.fits.length +
    filters.sleeves.length +
    filters.brands.length +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 100 ? 1 : 0) +
    (filters.rating > 0 ? 1 : 0);

  const FilterSection = ({ 
    title, 
    items, 
    filterKey, 
    sectionKey 
  }: { 
    title: string; 
    items: string[]; 
    filterKey: keyof Pick<FilterState, "colors" | "sizes" | "materials" | "patterns" | "fits" | "sleeves" | "brands">;
    sectionKey: keyof typeof expandedSections;
  }) => (
    <Collapsible
      open={expandedSections[sectionKey]}
      onOpenChange={() => toggleSection(sectionKey)}
    >
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="flex w-full items-center justify-between p-0 h-auto font-medium text-sm"
          data-testid={`button-toggle-${sectionKey}`}
        >
          {title}
          {expandedSections[sectionKey] ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2 mt-3">
        {items.map((item) => (
          <div key={item} className="flex items-center space-x-2">
            <Checkbox
              id={`${filterKey}-${item}`}
              checked={filters[filterKey].includes(item)}
              onCheckedChange={(checked) =>
                handleArrayFilterChange(filterKey, item, checked as boolean)
              }
              data-testid={`checkbox-${filterKey}-${item.toLowerCase()}`}
            />
            <Label
              htmlFor={`${filterKey}-${item}`}
              className="text-sm font-normal cursor-pointer flex-1"
            >
              {item}
            </Label>
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Filter className="h-5 w-5" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" data-testid="badge-active-filters">
                {activeFiltersCount}
              </Badge>
            )}
          </CardTitle>
          {activeFiltersCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearAllFilters}
              data-testid="button-clear-filters"
            >
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Colors */}
        <div>
          <FilterSection
            title="Colors"
            items={mockFilters.colors}
            filterKey="colors"
            sectionKey="colors"
          />
        </div>

        {/* Sizes */}
        <div>
          <FilterSection
            title="Sizes"
            items={mockFilters.sizes}
            filterKey="sizes"
            sectionKey="sizes"
          />
        </div>

        {/* Price Range */}
        <Collapsible
          open={expandedSections.price}
          onOpenChange={() => toggleSection("price")}
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="flex w-full items-center justify-between p-0 h-auto font-medium text-sm"
              data-testid="button-toggle-price"
            >
              Price Range
              {expandedSections.price ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 mt-3">
            <div>
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => {
                  onFiltersChange({
                    ...filters,
                    priceRange: value as [number, number]
                  });
                  console.log("Price range changed:", value);
                }}
                max={100}
                min={0}
                step={5}
                className="w-full"
                data-testid="slider-price-range"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>${filters.priceRange[0]}</span>
                <span>${filters.priceRange[1]}</span>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Materials */}
        <div>
          <FilterSection
            title="Materials"
            items={mockFilters.materials}
            filterKey="materials"
            sectionKey="materials"
          />
        </div>

        {/* Patterns */}
        <div>
          <FilterSection
            title="Patterns"
            items={mockFilters.patterns}
            filterKey="patterns"
            sectionKey="patterns"
          />
        </div>

        {/* Fits */}
        <div>
          <FilterSection
            title="Fits"
            items={mockFilters.fits}
            filterKey="fits"
            sectionKey="fits"
          />
        </div>

        {/* Brands */}
        <div>
          <FilterSection
            title="Brands"
            items={mockFilters.brands}
            filterKey="brands"
            sectionKey="brands"
          />
        </div>
      </CardContent>
    </Card>
  );
}