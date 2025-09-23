import Header from "../Header";

export default function HeaderExample() {
  return (
    <Header 
      cartItemCount={5} 
      onSearch={(query) => console.log("Search:", query)} 
    />
  );
}