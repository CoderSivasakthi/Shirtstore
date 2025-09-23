import HeroSection from "../HeroSection";

export default function HeroSectionExample() {
  return (
    <div className="p-6 bg-background">
      <HeroSection 
        onNavigate={(path) => console.log("Navigate to:", path)} 
      />
    </div>
  );
}