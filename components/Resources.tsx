'use client';

import { motion } from 'framer-motion';
import { Download, ExternalLink, FileText, Video, Github } from 'lucide-react';

const resources = [
  {
    category: "Course Materials",
    items: [
      {
        title: "Complete Course Slides",
        description: "All presentation slides in PDF format",
        icon: <FileText className="w-5 h-5" />,
        type: "download",
        link: "#"
      },
      {
        title: "Exercise Files",
        description: "Hands-on exercises and sample datasets",
        icon: <Download className="w-5 h-5" />,
        type: "download",
        link: "#"
      },
      {
        title: "Code Examples",
        description: "All code examples from the course",
        icon: <Github className="w-5 h-5" />,
        type: "external",
        link: "https://github.com/mongodb/course-examples"
      }
    ]
  },
  {
    category: "Official Documentation",
    items: [
      {
        title: "MongoDB Documentation",
        description: "Official MongoDB documentation and guides",
        icon: <ExternalLink className="w-5 h-5" />,
        type: "external",
        link: "https://docs.mongodb.com/"
      },
      {
        title: "MongoDB University",
        description: "Free online courses from MongoDB",
        icon: <Video className="w-5 h-5" />,
        type: "external",
        link: "https://university.mongodb.com/"
      },
      {
        title: "Community Forums",
        description: "Get help from the MongoDB community",
        icon: <ExternalLink className="w-5 h-5" />,
        type: "external",
        link: "https://community.mongodb.com/"
      }
    ]
  }
];

export default function Resources() {
  return (
    <section id="resources" className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Resources & Materials
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Everything you need to continue learning and building with MongoDB
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {resources.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.2 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                {category.category}
              </h3>
              
              <div className="space-y-4">
                {category.items.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.link}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="block p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-[#13AA52] dark:hover:border-[#13AA52] transition-all group"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-[#13AA52]/10 rounded-lg group-hover:bg-[#13AA52]/20 transition-colors">
                        <div className="text-[#13AA52]">
                          {item.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-[#13AA52] dark:group-hover:text-[#13AA52] transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                          {item.description}
                        </p>
                      </div>
                      <div className="text-gray-400 group-hover:text-[#13AA52] transition-colors">
                        {item.type === 'download' ? (
                          <Download className="w-5 h-5" />
                        ) : (
                          <ExternalLink className="w-5 h-5" />
                        )}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Resources Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-[#13AA52] to-[#0F8A42] rounded-2xl p-8 text-center text-white"
        >
          <h3 className="text-2xl font-bold mb-4">
            Want More Advanced Content?
          </h3>
          <p className="text-lg opacity-90 mb-6">
            Join our premium MongoDB course for advanced topics like sharding, replication, and enterprise features.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-white text-[#13AA52] rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Learn More
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}