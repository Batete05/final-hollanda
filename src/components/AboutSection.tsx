import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Users, Target } from "lucide-react";
import aboutImage from "../assets/Farmers.jpg";

const AboutSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="section-padding bg-background">
      <div className="container-custom">
        {/* Image */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <img
            src={aboutImage}
            alt="Our Community"
            className="w-full h-[400px] object-cover rounded-3xl shadow-xl object-[center_60%]"
          />
        </motion.div>

        {/* About Content */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-barlow">
              About us
            </h2>
            <p className="text-primary text-lg font-semibold mb-6 font-barlow">
              Stronger communities
            </p>
            <p className="text-lg text-muted-foreground font-barlow w-full">
              Hollanda FairFoods is a leading snack manufacturer in Rwanda,
              proudly celebrating 10 years of transforming locally grown
              ingredients into high-quality snacks. We are the makers of Winnaz
              potato crisps, Wheeliez puffed snacks, and Tsinda, each offering
              authentic flavors and showcasing Rwandan pride. From our factory
              to store shelves across Rwanda and East Africa, we provide fresh
              and delicious choices that people enjoy every day. We are
              committed to building a future where Rwandan snacks are strong
              both at home and throughout the region.
            </p>
          </motion.div>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-primary text-primary-foreground p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-start space-x-4">
              <div className="bg-white/20 p-3 rounded-lg">
                <Target className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 font-barlow">
                  Our Mission
                </h3>
                <p className="text-primary-foreground/90 leading-relaxed font-barlow">
                  To be the best employer by offering direct and indirect Jobs
                  and focus on their personal development. Educate local Potato
                  farmers to Improve their businesses. With Overall goal to add
                  Value to the potato industry in Rwanda by offering the best
                  and affordable snacks to the consumers of the region.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-primary text-primary-foreground p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-start space-x-4">
              <div className="bg-white/20 p-3 rounded-lg">
                <Users className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 font-barlow">
                  Our Vision
                </h3>
                <p className="text-primary-foreground/90 leading-relaxed font-barlow">
                  To be the leading snack company in East Africa, delivering the
                  highest-quality, most beloved brands through strong
                  partnerships with local farmers, empowered young employees, a
                  modern and hygienic factory, and deep connections with our
                  consumers.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
