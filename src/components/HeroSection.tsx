import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const HeroSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Video */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <video
          src="https://res.cloudinary.com/dikq9s0ny/video/upload/v1761161586/hero_fitfkn.mp4"
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/placeholder.svg"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="flex items-center min-h-screen pt-20 px-4 md:px-0">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left text-white w-full max-w-2xl"
          >
            {/* <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-barlow text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[35px] leading-tight md:leading-[1.13] tracking-[-0.00em] font-medium lg:mt-72"
            >
              Nourishing Communities,
              <br />
              <span className="text-white/90">One Harvest at a Time</span>
            </motion.h1> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
