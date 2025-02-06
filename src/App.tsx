import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Brain, 
  Database, 
  MessageSquareCode, 
  Table, 
  Bot, 
  ChevronDown,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { supabase } from './lib/supabase';

type LeadFormData = {
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  company_size: string;
  service_interests: string[];
  budget_range: string;
  project_timeline: string;
};

function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LeadFormData>();

  const onSubmit = async (data: LeadFormData) => {
    try {
      const { error } = await supabase
        .from('leads')
        .insert([data]);
      
      if (error) throw error;
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-blue-950">
      {/* Hero Section */}
      <header className="container mx-auto px-6 lg:px-12 2xl:px-24 py-16 text-white">
        <nav className="flex justify-between items-center mb-16">
          <div className="text-2xl font-bold">TruSponse Solutions</div>
          <div className="space-x-8">
            <a href="#services" className="hover:text-blue-300 transition">Services</a>
            <a href="#contact" className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-full transition">
              Get Started
            </a>
          </div>
        </nav>
        
        <div className="max-w-4xl">
          <h1 className="text-5xl font-bold mb-6">
            Empowering SMBs with Cutting-Edge Tech Solutions
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            From Excel automation to AI-powered chatbots, we deliver tailored solutions
            that drive efficiency and growth for your business.
          </p>
          <a href="#contact" className="inline-flex items-center bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-full text-lg font-semibold transition">
            Transform Your Business
            <ArrowRight className="ml-2" />
          </a>
        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12 2xl:px-24">
          <h2 className="text-3xl font-bold text-center mb-16">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              icon={<Table className="w-8 h-8 text-blue-500" />}
              title="Microsoft Excel Solutions"
              description="Custom spreadsheet solutions, automation, and data analysis tools."
            />
            <ServiceCard
              icon={<Database className="w-8 h-8 text-blue-500" />}
              title="Database Development"
              description="Robust database design and management systems for efficient data handling."
            />
            <ServiceCard
              icon={<Brain className="w-8 h-8 text-blue-500" />}
              title="AI Integration"
              description="Implementation of AI solutions to automate and optimize business processes."
            />
            <ServiceCard
              icon={<Bot className="w-8 h-8 text-blue-500" />}
              title="Custom Chatbots"
              description="AI-powered chatbots for customer service and internal processes."
            />
            <ServiceCard
              icon={<MessageSquareCode className="w-8 h-8 text-blue-500" />}
              title="Custom Software Development"
              description="Tailored software solutions designed for your specific needs."
            />
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12 2xl:px-24">
          <div className="max-w-3xl mx-auto">
            {!isSubmitted ? (
              <>
                <h2 className="text-3xl font-bold text-center mb-8">
                  Let's Discuss Your Project
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-lg shadow-lg">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company Name *
                      </label>
                      <input
                        {...register('company_name', { required: true })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.company_name && (
                        <span className="text-red-500 text-sm">This field is required</span>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Contact Name *
                      </label>
                      <input
                        {...register('contact_name', { required: true })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.contact_name && (
                        <span className="text-red-500 text-sm">This field is required</span>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        {...register('email', { required: true })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.email && (
                        <span className="text-red-500 text-sm">This field is required</span>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                        {...register('phone')}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Size *
                    </label>
                    <select
                      {...register('company_size', { required: true })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select company size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="500+">500+ employees</option>
                    </select>
                    {errors.company_size && (
                      <span className="text-red-500 text-sm">This field is required</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Services of Interest *
                    </label>
                    <select
                      multiple
                      {...register('service_interests', { required: true })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="excel">Microsoft Excel Solutions</option>
                      <option value="database">Database Development</option>
                      <option value="ai">AI Integration</option>
                      <option value="chatbot">Custom Chatbots</option>
                      <option value="software">Custom Software Development</option>
                    </select>
                    {errors.service_interests && (
                      <span className="text-red-500 text-sm">Please select at least one service</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Budget Range *
                    </label>
                    <select
                      {...register('budget_range', { required: true })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select budget range</option>
                      <option value="<5k">Less than $5,000</option>
                      <option value="5k-10k">$5,000 - $10,000</option>
                      <option value="10k-25k">$10,000 - $25,000</option>
                      <option value="25k-50k">$25,000 - $50,000</option>
                      <option value="50k+">$50,000+</option>
                    </select>
                    {errors.budget_range && (
                      <span className="text-red-500 text-sm">This field is required</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Project Timeline *
                    </label>
                    <select
                      {...register('project_timeline', { required: true })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select timeline</option>
                      <option value="immediate">Immediate (within 1 month)</option>
                      <option value="soon">Soon (1-3 months)</option>
                      <option value="future">Future (3-6 months)</option>
                      <option value="planning">Still in planning phase</option>
                    </select>
                    {errors.project_timeline && (
                      <span className="text-red-500 text-sm">This field is required</span>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition"
                  >
                    Submit
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-16 bg-white rounded-lg shadow-lg">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h3>
                <p className="text-gray-600">
                  We've received your information and will be in touch shortly to discuss your project.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6 lg:px-12 2xl:px-24">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold">TruSponse Solutions</h3>
              <p className="text-gray-400 mt-2">Empowering businesses through technology</p>
            </div>
            <div className="flex space-x-6">
              <a href="#services" className="hover:text-blue-400 transition">Services</a>
              <a href="#contact" className="hover:text-blue-400 transition">Contact</a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} TruSponse Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ServiceCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 bg-gray-50 rounded-lg hover:shadow-lg transition">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default App;