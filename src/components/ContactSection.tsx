import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="contact" className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Information */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 font-barlow">Contact us</h2>
            <p className="text-muted-foreground mb-8 md:mb-12 font-barlow">
              We’d love to hear from you! Leave your details below if you have any inquiries, 
              <br></br>
              feedback, or simply want to connect with us. 
            </p>

            {/* Contact Information in 2x2 Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              {/* Email */}
              <div>
                <h3 className="font-bold font-barlow text-lg mb-4">Email</h3>
                <div className="space-y-1">
                  <p className="text-muted-foreground font-barlow">
                    info@hollandafairfoods.com
                  </p>
                  <p className="text-muted-foreground font-barlow">
                    
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div>
                <h3 className="font-bold font-barlow text-lg mb-4">Phone</h3>
                <div className="space-y-1">
                  <p className="text-muted-foreground font-barlow">
                    Tel: +250786050540
                  </p>
                  <p className="text-muted-foreground font-barlow">
                    
                  </p>
                </div>
              </div>

              {/* Mobile */}
              <div>
                <h3 className="font-bold font-barlow text-lg mb-4">Factory Address</h3>
                <div className="space-y-1">
                  <p className="text-muted-foreground font-barlow">
                  Musanze, Karwasa, Gacaca, Cyanika Road

                  </p>
                </div>
              </div>

              {/* Office */}
              <div>
                <h3 className="font-bold font-barlow text-lg mb-4">Kigali Office</h3>
                <div className="space-y-1">
                  <p className="text-muted-foreground font-barlow">
                    Office Address: KK 261 St-Kigali
                  </p>
                 
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-card border rounded-3xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 font-barlow">Write a message</h3>
              <form action="https://formspree.io/f/mqayvlnz" method="POST" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 font-barlow">
                      First Name*
                    </label>
                    <Input type="text" name="firstName" placeholder="Ange" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 font-barlow">
                      Last Name*
                    </label>
                    <Input type="text" name="lastName" placeholder="Ange" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 font-barlow">
                    Email*
                  </label>
                  <Input type="email" name="email" placeholder="Ange" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 font-barlow">
                    Message*
                  </label>
                  <Textarea
                    name="message"
                    placeholder="Write down your message"
                    rows={5}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold font-barlow"
                >
                  Submit
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
