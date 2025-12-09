import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import navImage from "../assets/HFF_logo.png";
import { Facebook, Instagram, Twitter, Linkedin, Youtube, MessageCircle } from "lucide-react";

const Footer = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter submission
  };

  return (
    <footer className="relative overflow-hidden mt-10">
      {/* Newsletter Section */}
      <div className="bg-white py-10">
        <div className="container-custom">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-4xl font-bold text-black mb-[-70px]">
              SIGN UP TO FOLLOW
            </h2>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Section */}
      <div className="bg-black py-10 relative">
        <div className="container-custom">
          {/* Top Section */}
          <div className="grid md:grid-cols-2 gap-8 items-start mb-10 relative">
            {/* Left Side - Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-3xl md:text-4xl font-bold mt-[-40px] leading-snug">
                <span className="text-secondary">HOLLANDA</span>{" "}
                <span className="text-white">
                  PROJECTS, FUNDING AND CAREER{" "}
                </span>
                <span className="text-primary">OPPORTUNITIES</span>
              </p>
            </motion.div>

            {/* Right Side - Newsletter Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="
                lg:absolute lg:-top-[72px]
                bg-black rounded-2xl shadow-lg p-1 
                w-full sm:w-[400px] 
                mx-auto lg:right-[-3px]
              "
            >
              <div className="bg-white rounded-xl shadow-inner p-5 flex flex-col space-y-4">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button className="w-full rounded-md bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700 transition">
                  Sign Up →
                </button>
              </div>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <div className="grid md:grid-cols-2 gap-16 mb-16">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center space-x-3 mb-8">
                <img
                  src={navImage}
                  alt="logo"
                  className="h-10 md:h-14 lg:h-18 w-auto object-contain"
                />
              </div>

              <div className="text-white/80 space-y-1 text-sm leading-relaxed">
                <p className="font-semibold text-white">Hollanda FairFoods LTD</p>
                <p>Kigali Office: KK 261 St-Kigali</p>
                <p>Factory: Musanze-Cyanika Road</p>
                <p className="pt-2">Tel: +250786050540</p>
                <p>Email: info@hollandafairfoods.com</p>
              </div>
            </motion.div>

            {/* Navigation & Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col justify-center mt-8"
            >
              {/* Navigation Links */}
              <div className="flex flex-wrap gap-8 mb-6 text-white/80 justify-end md:justify-end sm:justify-start">
                <a href="#home" className="hover:text-white transition-colors text-sm">
                  Home
                </a>
                <a href="#about" className="hover:text-white transition-colors text-sm">
                  About
                </a>
                <a href="#products" className="hover:text-white transition-colors text-sm">
                  Products
                </a>
                <a href="#blogs" className="hover:text-white transition-colors text-sm">
                  Blogs
                </a>
                <a href="#contact" className="hover:text-white transition-colors text-sm">
                  Contact us
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
