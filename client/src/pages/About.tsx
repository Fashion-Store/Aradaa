import * as React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  const values = [
    {
      icon: <Heart className="h-8 w-8 text-gray-600" />,
      title: 'Crafted with Love',
      description: 'Every piece in our collection is carefully selected and crafted with attention to detail and quality.'
    },
    {
      icon: <Star className="h-8 w-8 text-gray-600" />,
      title: 'Premium Quality',
      description: 'We use only the finest fabrics and materials to ensure our garments stand the test of time.'
    },
    {
      icon: <Users className="h-8 w-8 text-gray-600" />,
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We strive to provide exceptional service and support.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl font-serif font-light text-gray-900 mb-6">
              About Adaraa
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              We believe that every woman deserves to feel confident, elegant, and beautiful. 
              Our mission is to provide premium fashion that celebrates femininity and sophistication.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-serif font-light text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded with a vision to bring premium fashion to modern women, Adaraa represents 
                  the perfect blend of traditional elegance and contemporary style. Our name, meaning 
                  'respect' and 'honor', reflects our commitment to celebrating every woman's unique beauty.
                </p>
                <p>
                  From our humble beginnings, we've grown into a trusted name in women's fashion, 
                  known for our attention to detail, quality craftsmanship, and commitment to 
                  customer satisfaction. Each piece in our collection tells a story of elegance, 
                  sophistication, and timeless appeal.
                </p>
                <p>
                  Today, Adaraa continues to evolve, always staying true to our core values of 
                  quality, elegance, and exceptional service. We're not just a fashion brand; 
                  we're a celebration of femininity in all its forms.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                <img
                  src="/api/placeholder/600/450"
                  alt="About Adaraa"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-serif font-light text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do and shape the way we serve our customers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center h-full border-none shadow-md">
                  <CardContent className="p-8">
                    <div className="flex justify-center mb-6">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-serif font-medium text-gray-900 mb-4">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-serif font-light text-gray-900 mb-8">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              "To empower women through fashion that celebrates their individuality, 
              enhances their confidence, and honors their unique style. We are committed 
              to providing exceptional quality, timeless designs, and an unparalleled 
              shopping experience."
            </p>
            <div className="w-24 h-px bg-gray-300 mx-auto"></div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '5000+', label: 'Happy Customers' },
              { number: '200+', label: 'Premium Products' },
              { number: '50+', label: 'Cities Served' },
              { number: '99%', label: 'Customer Satisfaction' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h3 className="text-4xl font-bold mb-2">{stat.number}</h3>
                <p className="text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
