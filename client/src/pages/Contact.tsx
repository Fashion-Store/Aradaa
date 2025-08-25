import * as React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Contact = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-gray-600" />,
      title: 'Email',
      details: 'info@adaraafashion.com',
      description: 'Send us an email anytime'
    },
    {
      icon: <Phone className="h-6 w-6 text-gray-600" />,
      title: 'Phone',
      details: '+92 300 123 4567',
      description: 'Mon-Fri from 9am to 6pm'
    },
    {
      icon: <MapPin className="h-6 w-6 text-gray-600" />,
      title: 'Address',
      details: 'Karachi, Pakistan',
      description: 'Visit our showroom'
    },
    {
      icon: <Clock className="h-6 w-6 text-gray-600" />,
      title: 'Business Hours',
      details: '9:00 AM - 6:00 PM',
      description: 'Monday to Friday'
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert('Thank you for your message! We\'ll get back to you soon.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      alert('Sorry, there was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-8 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-serif font-light text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you. Whether you have questions about our products, 
            need styling advice, or want to share feedback, we're here to help.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-serif font-light">
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 resize-vertical"
                      required
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                    disabled={isSubmitting}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-serif font-light">
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className="flex items-start space-x-4"
                  >
                    <div className="flex-shrink-0 p-2">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">
                        {info.title}
                      </h3>
                      <p className="text-gray-900 font-semibold mb-1">
                        {info.details}
                      </p>
                      <p className="text-sm text-gray-600">
                        {info.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-serif font-light">
                  Quick Questions?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">
                      Do you offer international shipping?
                    </h4>
                    <p className="text-sm text-gray-600">
                      Currently, we ship within Pakistan only. International shipping is coming soon.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">
                      What are your return policies?
                    </h4>
                    <p className="text-sm text-gray-600">
                      We offer 7-day returns for unused items in original condition.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">
                      How can I track my order?
                    </h4>
                    <p className="text-sm text-gray-600">
                      You'll receive tracking information via SMS and email once your order ships.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Map or Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <Card>
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-serif font-light text-gray-900 mb-4">
                Visit Our Showroom
              </h2>
              <p className="text-gray-600 mb-6">
                Experience our collection in person. Our showroom is located in the heart of Karachi, 
                where you can try on our latest designs and get personalized styling advice from our team.
              </p>
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Showroom Location Map</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
