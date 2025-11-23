import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaUser, FaArrowRight, FaTag, FaSearch, FaFire, FaStar } from "react-icons/fa";
import { Link } from "react-router";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const blogPosts = [
    {
      id: 1,
      title: "10 Proven Strategies to Maximize Your Earnings on TaskCoin",
      excerpt: "Discover expert tips and tricks to boost your income and become a top earner on our platform. Learn how to select high-value tasks and optimize your workflow.",
      content: "Maximizing your earnings on TaskCoin requires a strategic approach. In this comprehensive guide, we'll explore 10 proven strategies that have helped thousands of workers increase their income by up to 300%. From choosing the right tasks to building your reputation, we cover everything you need to know...",
      author: "Sarah Johnson",
      authorImage: "https://randomuser.me/api/portraits/women/44.jpg",
      date: "2025-01-15",
      category: "Tips & Tricks",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      readTime: "8 min read",
      featured: true,
      tags: ["Earnings", "Productivity", "Success"],
      views: 1250,
      likes: 89
    },
    {
      id: 2,
      title: "How to Build a Strong Profile That Attracts Top Buyers",
      excerpt: "Your profile is your digital business card. Learn how to create an impressive profile that stands out and attracts premium buyers looking for quality work.",
      content: "Your TaskCoin profile is the first impression buyers have of your skills and professionalism. A well-crafted profile can significantly increase your chances of landing high-paying tasks. In this article, we'll walk you through creating a profile that showcases your expertise...",
      author: "Mike Chen",
      authorImage: "https://randomuser.me/api/portraits/men/46.jpg",
      date: "2025-01-12",
      category: "Career Growth",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
      readTime: "6 min read",
      featured: false,
      tags: ["Profile", "Branding", "Career"],
      views: 890,
      likes: 67
    },
    {
      id: 3,
      title: "The Ultimate Guide to TaskCoin for Beginners",
      excerpt: "New to TaskCoin? Start your journey right with our comprehensive beginner's guide covering everything from registration to your first payout.",
      content: "Welcome to TaskCoin! If you're just getting started, you might feel overwhelmed by all the features and opportunities. Don't worry - we've got you covered. This guide will walk you through every step of your TaskCoin journey, from creating your account to completing your first task and receiving payment...",
      author: "Emily Davis",
      authorImage: "https://randomuser.me/api/portraits/women/65.jpg",
      date: "2025-01-10",
      category: "Getting Started",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
      readTime: "10 min read",
      featured: true,
      tags: ["Beginner", "Guide", "Tutorial"],
      views: 2150,
      likes: 145
    },
    {
      id: 4,
      title: "5 Common Mistakes to Avoid as a New Worker",
      excerpt: "Learn from others' mistakes! Discover the most common pitfalls new workers face and how to avoid them for a smoother experience.",
      content: "Starting a new journey on TaskCoin is exciting, but it's easy to make mistakes when you're learning the ropes. We've analyzed thousands of worker profiles and identified the 5 most common mistakes that can hinder your success. By avoiding these pitfalls, you'll set yourself up for long-term success...",
      author: "Alex Rodriguez",
      authorImage: "https://randomuser.me/api/portraits/men/52.jpg",
      date: "2025-01-08",
      category: "Tips & Tricks",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
      readTime: "5 min read",
      featured: false,
      tags: ["Mistakes", "Learning", "Advice"],
      views: 720,
      likes: 52
    },
    {
      id: 5,
      title: "Understanding TaskCoin's Payment System",
      excerpt: "Everything you need to know about how payments work, from coin earning to withdrawal options and payment schedules.",
      content: "TaskCoin's payment system is designed to be transparent, fast, and reliable. Whether you're a worker earning coins or a buyer purchasing them, understanding how the system works is crucial. This article breaks down every aspect of our payment ecosystem...",
      author: "Jessica Williams",
      authorImage: "https://randomuser.me/api/portraits/women/32.jpg",
      date: "2025-01-05",
      category: "Finance",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      readTime: "7 min read",
      featured: false,
      tags: ["Payments", "Coins", "Finance"],
      views: 980,
      likes: 73
    },
    {
      id: 6,
      title: "Success Stories: How TaskCoin Changed My Life",
      excerpt: "Read inspiring stories from real workers who have achieved financial freedom and career growth through TaskCoin.",
      content: "TaskCoin has transformed the lives of thousands of workers around the world. In this special feature, we share the inspiring journeys of workers who started with nothing and built successful careers through our platform. Their stories will motivate and inspire you...",
      author: "David Brown",
      authorImage: "https://randomuser.me/api/portraits/men/28.jpg",
      date: "2025-01-03",
      category: "Success Stories",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
      readTime: "12 min read",
      featured: true,
      tags: ["Success", "Inspiration", "Stories"],
      views: 1890,
      likes: 156
    }
  ];

  const categories = ["all", "Tips & Tricks", "Career Growth", "Getting Started", "Finance", "Success Stories"];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured || !featuredPosts.includes(post));

  return (
    <div className="min-h-screen bg-base-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[95%] xl:max-w-[1400px] mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            📝 TaskCoin Blog
          </h1>
          <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
            Discover tips, insights, and success stories to help you maximize your earnings and grow on TaskCoin
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-base-200 p-4 rounded-xl">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input input-bordered w-full pl-10 bg-base-100 border-base-300"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                      : "bg-base-100 text-base-content hover:bg-base-300 border border-base-300"
                  }`}
                >
                  {category === "all" ? "All Posts" : category}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <div className="flex items-center gap-2 mb-6">
              <FaFire className="text-accent text-2xl" />
              <h2 className="text-3xl font-bold text-base-content">Featured Articles</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredPosts.slice(0, 2).map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-base-100 border border-base-300 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col"
                >
                  <div className="relative h-64 overflow-hidden flex-shrink-0">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-primary to-secondary text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <FaFire className="text-xs" /> Featured
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-base-100/90 backdrop-blur-sm text-base-content px-3 py-1 rounded-full text-xs font-semibold">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-base-content line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-base-content/70 mb-4 line-clamp-2 flex-grow">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm text-base-content/60 mb-4 gap-2 flex-shrink-0">
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                        <div className="flex items-center gap-2">
                          <img
                            src={post.authorImage}
                            alt={post.author}
                            className="w-8 h-8 rounded-full"
                          />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaCalendarAlt />
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                        <span>{post.readTime}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <FaStar className="text-accent" />
                          {post.likes}
                        </span>
                        <span>{post.views} views</span>
                      </div>
                    </div>
                    <div className="mt-auto flex-shrink-0">
                      <button className="btn btn-primary w-full group">
                        Read More
                        <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.section>
        )}

        {/* Regular Posts Grid */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <FaTag className="text-secondary text-2xl" />
            <h2 className="text-3xl font-bold text-base-content">Latest Articles</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="bg-base-100 border border-base-300 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute bottom-2 right-2">
                    <span className="bg-base-100/90 backdrop-blur-sm text-base-content px-2 py-1 rounded text-xs font-semibold">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-secondary/10 text-secondary px-2 py-0.5 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-base-content line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-base-content/70 text-sm mb-4 line-clamp-2 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-base-content/60 mb-3">
                    <div className="flex items-center gap-2">
                      <img
                        src={post.authorImage}
                        alt={post.author}
                        className="w-6 h-6 rounded-full"
                      />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-base-content/60">{post.readTime}</span>
                    <button className="text-primary hover:text-secondary font-medium text-sm flex items-center gap-1 group">
                      Read More
                      <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <FaSearch className="text-6xl text-base-content/30 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-base-content mb-2">No articles found</h3>
            <p className="text-base-content/70">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl p-8 md:p-12 text-center text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Earning?
          </h2>
          <p className="text-xl mb-6 text-white/90 max-w-2xl mx-auto">
            Join thousands of workers already earning on TaskCoin. Create your account today and start your journey to financial freedom!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="btn btn-lg bg-white text-primary hover:bg-base-200 font-bold"
            >
              Get Started Now
            </Link>
            <Link
              to="/tasks"
              className="btn btn-lg bg-white/20 text-white hover:bg-white/30 font-bold border border-white/30"
            >
              Browse Tasks
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Blog;

