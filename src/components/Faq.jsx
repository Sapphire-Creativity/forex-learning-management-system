import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Search } from "lucide-react";

const faqs = [
  {
    question: "What is Sapphire Learning?",
    answer:
      "Sapphire Learning is an all-in-one LMS that enables students to access courses, connect with mentors, book sessions, and engage in interactive learning activities.",
    category: "General",
  },
  {
    question: "Can I book one-on-one mentorship sessions?",
    answer:
      "Yes! You can request private sessions with your mentor directly from the platform for personalized guidance.",
    category: "Mentorship",
  },
  {
    question: "Do I need to install any software?",
    answer:
      "No, Sapphire Learning works seamlessly in your browser. Just log in, and you're ready to learn.",
    category: "Technical",
  },
  {
    question: "Is there a mobile version?",
    answer:
      "Absolutely! Our platform is fully responsive and mobile-friendly, so you can learn anywhere, anytime.",
    category: "Technical",
  },
  {
    question: "How do I reset my password?",
    answer:
      "Click on 'Forgot Password' on the login page, and we'll send you a link to reset your password securely.",
    category: "Account",
  },
  {
    question: "Are the courses self-paced?",
    answer:
      "Most courses are self-paced, but some have scheduled live sessions. Check the course details for specific information.",
    category: "Courses",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Get unique categories
  const categories = ["All", ...new Set(faqs.map((faq) => faq.category))];

  // Filter FAQs based on search and category
  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="relative py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-5">
            <HelpCircle className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="font-raleway text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Frequently Asked <span className="text-blue-600">Questions</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Find answers to common questions about Sapphire Learning. Can't find
            what you're looking for?
            <a href="#" className="text-blue-600 hover:underline ml-1">
              Contact our support team
            </a>
            .
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search questions..."
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl bg-white border border-gray-200 shadow-small overflow-hidden hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center p-6 text-left"
                >
                  <div className="flex-1">
                    <span className="font-semibold text-gray-800 text-lg">
                      {faq.question}
                    </span>
                    <span className="block mt-1 text-xs text-blue-600 font-medium">
                      {faq.category}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-4 flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-gray-600 border-t border-gray-100 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-10">
              <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-700">
                No results found
              </h3>
              <p className="text-gray-500 mt-2">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>

        {/* Support CTA */}
        <div className="text-center mt-12 p-6 bg-blue-50 rounded-xl">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-4">
            Our support team is here to help you
          </p>
          <button className="px-6 py-4 btn btn-primary">
            Contact Support
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100/30 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-100/30 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
    </section>
  );
}
