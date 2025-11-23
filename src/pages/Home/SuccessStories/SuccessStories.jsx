import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar, FaArrowRight } from "react-icons/fa";

const stories = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Freelance Designer",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    earnings: "$12,500",
    tasks: 145,
    rating: 5,
    quote: "TaskCoin has completely transformed my freelance career. I've earned over $12K in just 6 months working on projects I love!",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Content Writer",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    earnings: "$8,900",
    tasks: 98,
    rating: 5,
    quote: "The flexibility and variety of tasks on TaskCoin is amazing. I can work from anywhere and choose projects that match my expertise.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Web Developer",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    earnings: "$15,200",
    tasks: 167,
    rating: 5,
    quote: "As a developer, TaskCoin gives me access to real-world projects. The payment system is fast and reliable. Highly recommended!",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Video Editor",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    earnings: "$10,800",
    tasks: 112,
    rating: 5,
    quote: "I've built a steady income stream through TaskCoin. The platform is user-friendly and the community is supportive.",
    gradient: "from-orange-500 to-red-500",
  },
];

const SuccessStories = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-base-200 via-base-100 to-base-200">
      <div className="max-w-[95%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Success Stories
            </span>
          </h2>
          <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
            Real people, real earnings. See how TaskCoin is helping freelancers achieve their goals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-base-100 rounded-2xl p-8 shadow-xl border border-base-300 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${story.gradient} p-0.5`}>
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-base-content mb-1">{story.name}</h3>
                  <p className="text-sm text-base-content/60 mb-2">{story.role}</p>
                  <div className="flex items-center gap-1">
                    {[...Array(story.rating)].map((_, i) => (
                      <FaStar key={i} className="text-accent text-sm" />
                    ))}
                  </div>
                </div>
                <FaQuoteLeft className="text-4xl text-primary/20" />
              </div>

              <p className="text-base-content/80 mb-6 italic leading-relaxed">
                "{story.quote}"
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-base-300">
                <div>
                  <p className="text-2xl font-bold text-primary">{story.earnings}</p>
                  <p className="text-xs text-base-content/60">Total Earnings</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-secondary">{story.tasks}</p>
                  <p className="text-xs text-base-content/60">Tasks Completed</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary via-secondary to-accent text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300"
          >
            <span>Read More Stories</span>
            <FaArrowRight />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default SuccessStories;


