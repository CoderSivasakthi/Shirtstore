import Footer from "../Footer";

export default function FooterExample() {
  return (
    <Footer 
      onNewsletterSubscribe={(email) => console.log("Newsletter subscription:", email)} 
    />
  );
}