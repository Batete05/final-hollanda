import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Award, Users, Heart } from "lucide-react";

const PillarsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const pillars = [
    {
      icon: Award,
      title: "QUALITY FIRST",
      description:
        "We craft delicious, affordable snacks with the highest standards of hygiene and care, setting the bar for excellence in East Africa.",
    },
    {
      icon: Users,
      title: "EMPOWERING FARMERS",
      description:
        "By partnering with local potato farmers, we provide education and support that helps them grow stronger, more sustainable businesses.",
    },
    {
      icon: Heart,
      title: "CUSTOMER CONNECTION",
      description:
        "Our success lies in strong relationships. We listen, adapt, and deliver snacks that people truly love.",
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            WE ARE <span className="text-primary">HOLLANDA</span>
          </h2>
          <p className="text-primary text-lg font-semibold">OUR PILLARS</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group"
            >
              <div className="border-2 border-black/20 rounded-2xl p-8 h-full hover:border-primary transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-primary/20 p-4 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    <pillar.icon className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-4">
                    {pillar.title}
                  </h3>
                  <p className="text-black/80 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PillarsSection;
