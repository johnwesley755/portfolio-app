import { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  useEffect(() => {
    // Add 'dark' class to <html> if not already present
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white text-black dark:bg-black/30 dark:text-white">
     
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
