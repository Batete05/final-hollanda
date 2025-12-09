import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import image1 from "../assets/female1.jpg";
import image2 from "../assets/male1.jpg";
import image3 from "../assets/female2.avif";
import image4 from "../assets/male2.jpg";
import image5 from "../assets/female3.webp";
import image6 from "../assets/male3.avif";
import image7 from "../assets/female4.png";
import image8 from "../assets/male4.jfif";
import image9 from "../assets/male4.webp";

import newTimesImage from "../assets/newTimes.jpeg";
import odooImage from "../assets/Odoo.jpeg";
import simbukaImage from "../assets/simbuka.jpeg";

const TestimonialsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [pageIndex, setPageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const testimonials = [
    {
      name: "The New Times",
      role: "",
      text: "Winnaz has gone beyond snack production; it has reshaped Rwanda’s potato value chain. The company introduced a new potato seed variety called “Itsinzi,” meaning winning, symbolising both agricultural innovation and the spirit behind the brand name Winnaz derived from winners.",
      image: newTimesImage,
    },
    {
      name: "Odoo",
      role: "",
      text: "Hollanda Fairfoods partners with Rwandan smallholder farmers to produce high-quality potato crisps, branded as Winnaz, which are sold across East Africa, including Rwanda, Uganda, and Kenya. Through agronomy support and market access, they help improve crop yield and quality for local farmers while bringing local, premium snacks to regional shelves.",
      image: odooImage,
    },
    {
      name: "Simbuka",
      role: "",
      text: "At Simbuka, we’re proud to join hands with Hollanda FairFoods , Holland Greentech, VDS-Acampo, AGRISEED LTD and TRAIDE Foundation in this transformative initiative. Together, we are empowering Rwanda’s potato farmers by providing quality Dutch variety seeds, delivering Good Agricultural Practices training, and building digital solutions to enhance access to finance.",
      image: simbukaImage,
    },
    {
      name: "Mugisha Samuella",
      role: "Certified winnaz lover",
      text: "winnaz are made from fresh potatoes grown on the volcanic soils ofRwanda's Northern Region. We work closely together with Rwandan smallholder",
      image: image1,
    },
    {
      name: "Kwizera David",
      role: "Food Enthusiast",
      text: "Between meetings and errands, Winnaz Chips keep me fueled throughout the day. They're not just a  snack—they're my little pick-me-up when I need it most.",
      image: image2,
    },
    {
      name: "Ishimwe Andy",
      role: "Winnaz consumer",
      text: "Winnaz Chips are my secret weapon for hosting! Whenever I bring them out, my guests can't stop talking about how tasty they are. They're always a crowd-pleaser.",
      image: image4,
    },
    {
      name: "Gisubizo James",
      role: "Winnaz Customer",
      text: "As someone who cares about eating natural foods, Winnaz Chips are a lifesaver! They're made from real ingredients and still taste amazing.",
      image: image6,
    },
    {
      name: "Niyibizi Egide",
      role: "Head of Production, Hollanda Fairfoods",
      text: "Winnaz is a source of employment for over 60 people directly and over 450 indirectly. This gives hope that agriculture combined with industry can transform the economy of our regions.",
      image: image8,
    },
    {
      name: "Uwanyirigira Clarisse",
      role: "Head of economic development in Musanze district",
      text: "Hollanda Fairfoods is a company that has made a difference in the lives of its people and has built a new image of how agriculture can develop the country.",
      image: image3,
    },
    {
      name: "Nzabarinda Isaac",
      role: "Farmer",
      text: "Before, we used to grow potatoes and harvest them, but we had no market. Now we are at peace because we trust that Winnaz will buy our produce. Since they started buying our potatoes, we have been able to build good houses, pay for our children's education, and our women have even started organizing themselves into savings cooperatives.",
      image: image9,
    },
    {
      name: "Uwimana Claudine",
      role: "Farmer",
      text: "Winnaz has made farmers feel valued. Now that we are trained on how to farm properly, we get good seeds, and the money we earn allows us to live well. Now, agriculture is not a job for the unemployed; it is a job, it is a source of development.",
      image: image5,
    },
    {
      name: "Uwamariya Claire",
      role: "Winnaz Worker",
      text: "As a mother, working for Winnaz has helped me support my family. Another thing is that here they take care of us, and we are given training and safety equipment. I am proud to be part of the opportunity to work in a factory that processes products from our local potatoes in Musanze.",
      image: image7,
    },

    // Special media/partner testimonials without role subtitle
  ];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const pageSize = isMobile ? 1 : 3;
  const totalPages = Math.ceil(testimonials.length / pageSize);

  // Ensure pageIndex stays within bounds when screen size changes
  useEffect(() => {
    setPageIndex((prev) => Math.min(prev, Math.max(0, totalPages - 1)));
  }, [totalPages]);

  const scroll = (direction: "left" | "right") => {
    if (direction === "left" && pageIndex > 0) {
      setPageIndex((prev) => prev - 1);
    } else if (direction === "right" && pageIndex < totalPages - 1) {
      setPageIndex((prev) => prev + 1);
    }
  };

  const getCurrentTestimonials = () => {
    const start = pageIndex * pageSize;
    const end = Math.min(testimonials.length, start + pageSize);
    return testimonials.slice(start, end);
  };

  return (
    <section className="section-padding bg-background">
      <div className="container-custom relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 justify-start"
        >
          <p className="text-primary font-semibold mb-2 font-barlow">
            What our clients say about us
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 font-barlow">
            Testimonials
          </h2>
        </motion.div>

        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            disabled={pageIndex === 0}
            className={`absolute ${
              isMobile
                ? "left-2 top-1/2 -translate-y-1/2"
                : "left-0 top-1/2 -translate-y-1/2"
            } z-10 w-10 h-10 flex items-center justify-center transition-all duration-300 ${
              pageIndex === 0
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-600 hover:text-primary cursor-pointer"
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            disabled={pageIndex === totalPages - 1}
            className={`absolute ${
              isMobile
                ? "right-2 top-1/2 -translate-y-1/2"
                : "right-0 top-1/2 -translate-y-1/2"
            } z-10 w-10 h-10 flex items-center justify-center transition-all duration-300 ${
              pageIndex === totalPages - 1
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-600 hover:text-primary cursor-pointer"
            }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Testimonials */}
          <div className="px-4 md:px-12">
            <div
              className={`grid ${
                isMobile ? "grid-cols-1" : "grid-cols-3"
              } gap-6 md:gap-8 mb-12`}
            >
              {getCurrentTestimonials().map((testimonial, index) => (
                <div
                  key={`${testimonial.name}-${index}`}
                  className={`text-center relative ${
                    !isMobile && index === 1
                      ? "scale-110 z-20 transform"
                      : "scale-100 z-5"
                  }`}
                  style={{
                    filter:
                      !isMobile && index === 1
                        ? "blur(0px) brightness(1)"
                        : "brightness(0.7)",
                  }}
                >
                  {/* Profile Info */}
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="text-left">
                      <h3 className="font-bold text-base font-barlow text-black">
                        {testimonial.name}
                      </h3>
                      {testimonial.role && (
                        <p className="text-sm font-barlow text-black">
                          {testimonial.role}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Text */}
                  <p
                    className={`text-sm md:text-base max-w-xs mx-auto leading-relaxed font-barlow transition-all duration-500 ${
                      !isMobile && index === 1 ? "text-black" : "text-gray-600"
                    }`}
                  >
                    {testimonial.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setPageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === pageIndex
                    ? "bg-black scale-125"
                    : "bg-gray-400 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
