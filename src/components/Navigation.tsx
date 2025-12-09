import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import navImage from "../assets/HFF_logo.png";
import anniversaryLogo from "../assets/winnaz 10yearsstuff.svg";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Check which section is currently in view
      const sections = ["home", "about", "products", "blogs", "contact"];
      const scrollPosition = window.scrollY + 100; // Offset for better detection

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial section
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Home", href: "#home", id: "home" },
    { name: "About", href: "#about", id: "about" },
    { name: "Products", href: "#products", id: "products" },
    { name: "Blogs", href: "#blogs", id: "blogs" },
    { name: "Contact Us", href: "#contact", id: "contact" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-5"
    >
      <div className="container-custom">
        <div className="relative flex items-center justify-between h-20 ">
          {/* Logo */}
          <a href="#home" className="flex items-center space-x-2">
            <div className="items-center justify-center">
              <img
                src={navImage}
                alt="logo"
                className="h-10 md:h-14 lg:h-18 w-auto object-contain"
              />
            </div>

            {/* Centered Anniversary Logo (All screen sizes) */}
            <div className="absolute left-1/2 -translate-x-1/2 block">
              <img
                src={anniversaryLogo}
                alt="Winnaz 10 Years"
                className="h-14 md:h-14 lg:h-[75px] w-auto object-contain"
              />
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`hover:text-black transition-all duration-300 font-barlow font-medium text-primary relative ${activeSection === link.id ? 'text-black' : ''
                  }`}
              >
                {link.name}
                {/* Active section underline */}
                {activeSection === link.id && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-500 animate-fade-in"></div>
                )}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button - Always closes menu when X is shown */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-foreground"
            onClick={() => {
              if (isMobileMenuOpen) {
                // Always close menu when X is clicked
                setIsMobileMenuOpen(false);
              } else {
                // Open menu when hamburger is clicked
                setIsMobileMenuOpen(true);
              }
            }}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Menu - Always Full Orange Background */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-[9999] animate-fade-in">
            {/* Full Screen Menu Content - Always Solid Orange (like image 2) */}
            <div className="fixed inset-0 bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 overflow-hidden min-h-screen w-full">
              {/* Close Button - Always works */}
              <div className="absolute top-6 right-6 z-20">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-orange-100 hover:bg-white/10 rounded-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X className="h-8 w-8" />
                </Button>
              </div>

              {/* Menu Items - Centered like in image 2 */}
              <div className="flex flex-col items-center justify-center min-h-screen px-8 relative z-10">
                <div className="flex flex-col space-y-12 text-center w-full max-w-sm">
                  {navLinks.map((link, index) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className={`text-white hover:text-orange-100 transition-all duration-300 font-barlow font-semibold text-3xl py-4 hover:scale-105 active:scale-95 relative ${activeSection === link.id ? 'text-orange-100' : ''
                        }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      style={{
                        animationDelay: `${index * 0.1}s`,
                        animation: 'slideInFromRight 0.5s ease-out forwards',
                        opacity: 0
                      }}
                    >
                      {link.name}
                      {/* Active section underline for mobile */}
                      {activeSection === link.id && (
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-white rounded-full animate-fade-in"></div>
                      )}
                    </a>
                  ))}
                </div>
              </div>

              {/* Multiple background layers to ensure complete coverage */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 -z-10"></div>
              <div className="absolute inset-0 bg-orange-500 -z-20"></div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
