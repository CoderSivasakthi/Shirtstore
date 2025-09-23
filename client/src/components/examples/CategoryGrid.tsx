import CategoryGrid from "../CategoryGrid";

export default function CategoryGridExample() {
  return (
    <div className="bg-background">
      <CategoryGrid 
        onCategoryClick={(categoryId) => console.log("Category clicked:", categoryId)} 
      />
    </div>
  );
}