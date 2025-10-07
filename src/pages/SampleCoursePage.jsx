// CoursePage.jsx
import React, { useState } from "react";
import {
  PlayCircle,
  Clock,
  CheckCircle,
  Download,
  MessageCircle,
  BookOpen,
  BarChart3,
  Users,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  Star,
  Eye,
  Bookmark,
  Share2,
  ThumbsUp,
} from "lucide-react";

const SampleCoursePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [expandedVideo, setExpandedVideo] = useState(null);

  // Mock data - replace with actual API data
  const courseData = {
    title: "Professional Forex Trading Mastery",
    mentor: {
      name: "Sarah Johnson",
      role: "Senior Forex Analyst",
      avatar: "/api/placeholder/60/60",
      rating: 4.9,
      students: 1247,
      experience: "8+ years",
    },
    progress: {
      overall: 65,
      completedVideos: 13,
      totalVideos: 20,
      totalHours: 8.5,
    },
    categories: [
      {
        id: 1,
        title: "Market Fundamentals",
        description:
          "Understand the core principles of forex markets and trading mechanics",
        icon: "📊",
        progress: 100,
        videos: [
          {
            id: 1,
            title: "Introduction to Forex Trading",
            description:
              "Learn the basics of currency trading and market structure",
            duration: "18:30",
            thumbnail: "/api/placeholder/320/180",
            isCompleted: true,
            isPreview: true,
            resources: ["Trading Guide PDF", "Market Terms Glossary"],
            views: 1247,
            likes: 89,
          },
          {
            id: 2,
            title: "Understanding Currency Pairs",
            description:
              "Deep dive into major, minor, and exotic currency pairs",
            duration: "22:15",
            thumbnail: "/api/placeholder/320/180",
            isCompleted: true,
            isPreview: false,
            resources: ["Currency Pairs Cheat Sheet"],
            views: 987,
            likes: 76,
          },
          {
            id: 3,
            title: "Market Hours & Trading Sessions",
            description:
              "Master the different trading sessions and their characteristics",
            duration: "15:45",
            thumbnail: "/api/placeholder/320/180",
            isCompleted: true,
            isPreview: true,
            resources: ["Session Times PDF", "Volatility Chart"],
            views: 856,
            likes: 67,
          },
        ],
      },
      {
        id: 2,
        title: "Technical Analysis",
        description:
          "Master chart patterns, indicators, and price action strategies",
        icon: "📈",
        progress: 75,
        videos: [
          {
            id: 4,
            title: "Support and Resistance Mastery",
            description:
              "Learn to identify and trade key support and resistance levels",
            duration: "28:20",
            thumbnail: "/api/placeholder/320/180",
            isCompleted: true,
            isPreview: false,
            resources: ["S/R Trading Guide", "Practice Exercises"],
            views: 734,
            likes: 92,
          },
          {
            id: 5,
            title: "Candlestick Patterns Deep Dive",
            description:
              "Comprehensive guide to reading and trading candlestick patterns",
            duration: "32:10",
            thumbnail: "/api/placeholder/320/180",
            isCompleted: true,
            isPreview: true,
            resources: ["Candlestick Patterns PDF"],
            views: 689,
            likes: 84,
          },
          {
            id: 6,
            title: "Moving Averages & Trends",
            description:
              "Using moving averages to identify and follow market trends",
            duration: "25:35",
            thumbnail: "/api/placeholder/320/180",
            isCompleted: false,
            isPreview: false,
            resources: ["Indicator Settings", "Trend Analysis"],
            views: 512,
            likes: 45,
          },
          {
            id: 7,
            title: "Advanced Chart Patterns",
            description:
              "Trading triangles, flags, head and shoulders patterns",
            duration: "35:40",
            thumbnail: "/api/placeholder/320/180",
            isCompleted: false,
            isPreview: false,
            resources: ["Pattern Recognition Guide"],
            views: 423,
            likes: 38,
          },
        ],
      },
      {
        id: 3,
        title: "Risk Management",
        description:
          "Learn proper position sizing and risk management techniques",
        icon: "🛡️",
        progress: 40,
        videos: [
          {
            id: 8,
            title: "Position Sizing Strategies",
            description:
              "Calculate optimal position sizes for different account sizes",
            duration: "20:45",
            thumbnail: "/api/placeholder/320/180",
            isCompleted: true,
            isPreview: true,
            resources: ["Position Size Calculator", "Risk Management Plan"],
            views: 567,
            likes: 71,
          },
          {
            id: 9,
            title: "Stop Loss & Take Profit Techniques",
            description: "Advanced techniques for setting stops and targets",
            duration: "26:30",
            thumbnail: "/api/placeholder/320/180",
            isCompleted: false,
            isPreview: false,
            resources: ["SL/TP Guide"],
            views: 389,
            likes: 42,
          },
        ],
      },
      {
        id: 4,
        title: "Trading Psychology",
        description: "Develop the mindset of successful traders",
        icon: "🧠",
        progress: 20,
        videos: [
          {
            id: 10,
            title: "Mastering Trading Psychology",
            description: "Overcome fear, greed, and other emotional barriers",
            duration: "24:15",
            thumbnail: "/api/placeholder/320/180",
            isCompleted: false,
            isPreview: false,
            resources: ["Psychology Exercises", "Trading Journal Template"],
            views: 298,
            likes: 56,
          },
        ],
      },
    ],
  };

  const toggleVideoExpand = (videoId) => {
    setExpandedVideo(expandedVideo === videoId ? null : videoId);
  };

  const filteredCategories = courseData.categories
    .map((category) => ({
      ...category,
      videos: category.videos.filter(
        (video) =>
          video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          video.description.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.videos.length > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-blue-600">
                  ForexMaster
                </h1>
              </div>
              <nav className="hidden md:ml-8 md:flex space-x-8">
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-700 font-medium px-1"
                >
                  Dashboard
                </a>
                <a
                  href="#"
                  className="text-blue-600 font-medium border-b-2 border-blue-600 px-1"
                >
                  Courses
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-700 font-medium px-1"
                >
                  Mentor
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-700 font-medium px-1"
                >
                  Community
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl text-white p-8 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-3">
                <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-medium">
                  Professional Course
                </span>
                <span className="px-3 py-1 bg-green-500 rounded-full text-sm font-medium flex items-center">
                  <Star className="w-4 h-4 mr-1 fill-current" />
                  4.9 (1247 reviews)
                </span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-3">
                {courseData.title}
              </h1>
              <p className="text-blue-100 text-lg mb-4">
                Master forex trading with comprehensive lessons, real-world
                examples, and personalized mentor guidance
              </p>
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>{courseData.categories.length} Modules</span>
                </div>
                <div className="flex items-center space-x-2">
                  <PlayCircle className="w-5 h-5" />
                  <span>{courseData.progress.totalVideos} Lessons</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>{courseData.progress.totalHours} Hours</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>{courseData.progress.overall}% Completed</span>
                </div>
              </div>
            </div>

            {/* Progress Circle */}
            <div className="mt-6 lg:mt-0 lg:ml-8">
              <div className="relative w-24 h-24">
                <svg
                  className="w-24 h-24 transform -rotate-90"
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="white"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray="251.2"
                    strokeDashoffset={
                      251.2 * (1 - courseData.progress.overall / 100)
                    }
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">
                    {courseData.progress.overall}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Mentor Card */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Your Mentor
              </h3>
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={courseData.mentor.avatar}
                  alt={courseData.mentor.name}
                  className="w-16 h-16 rounded-full border-2 border-blue-500"
                />
                <div>
                  <p className="font-semibold text-gray-900">
                    {courseData.mentor.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {courseData.mentor.role}
                  </p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">
                      {courseData.mentor.rating}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({courseData.mentor.students})
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Experience:</span>
                  <span className="font-medium">
                    {courseData.mentor.experience}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Success Rate:</span>
                  <span className="font-medium text-green-600">87%</span>
                </div>
              </div>
              <button className="w-full mt-4 bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                <MessageCircle className="w-4 h-4" />
                <span>Message Mentor</span>
              </button>
            </div>

            {/* Course Progress */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Your Progress
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Overall Progress</span>
                    <span>{courseData.progress.overall}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${courseData.progress.overall}%` }}
                    ></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-2xl font-bold text-blue-600">
                      {courseData.progress.completedVideos}
                    </p>
                    <p className="text-xs text-gray-600">Completed</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-2xl font-bold text-green-600">
                      {courseData.progress.totalVideos}
                    </p>
                    <p className="text-xs text-gray-600">Total Videos</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <Download className="w-5 h-5" />
                  <span>Download Resources</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <Bookmark className="w-5 h-5" />
                  <span>Save for Later</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  <Share2 className="w-5 h-5" />
                  <span>Share Course</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filter Bar */}
            <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search lessons..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex space-x-3">
                  <select
                    className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="default">Sort by Default</option>
                    <option value="duration">Sort by Duration</option>
                    <option value="progress">Sort by Progress</option>
                  </select>
                  <button className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Filter className="w-5 h-5" />
                    <span>Filter</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Course Content */}
            <div className="space-y-6">
              {filteredCategories.map((category) => (
                <div
                  key={category.id}
                  className="bg-white rounded-xl shadow-sm border overflow-hidden"
                >
                  {/* Category Header */}
                  <div className="p-6 border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-2xl">{category.icon}</span>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">
                            {category.title}
                          </h3>
                          <p className="text-gray-600 mt-1">
                            {category.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-1">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${category.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                            {category.progress}%
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">
                          {category.videos.filter((v) => v.isCompleted).length}/
                          {category.videos.length} completed
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Videos List */}
                  <div className="divide-y">
                    {category.videos.map((video) => (
                      <div
                        key={video.id}
                        className="p-6 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-start space-y-4 lg:space-y-0 lg:space-x-6">
                          {/* Video Thumbnail */}
                          <div className="relative flex-shrink-0">
                            <img
                              src={video.thumbnail}
                              alt={video.title}
                              className="w-full lg:w-64 h-36 object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                              <button className="bg-white bg-opacity-90 p-3 rounded-full hover:bg-opacity-100 transition-all transform hover:scale-105">
                                <PlayCircle className="w-8 h-8 text-blue-600" />
                              </button>
                            </div>
                            <div className="absolute bottom-2 left-2">
                              <span className="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                                {video.duration}
                              </span>
                            </div>
                            {video.isPreview && (
                              <div className="absolute top-2 left-2">
                                <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                                  Preview
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Video Content */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <h4 className="text-lg font-semibold text-gray-900">
                                    {video.title}
                                  </h4>
                                  {video.isCompleted && (
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                  )}
                                </div>
                                <p className="text-gray-600 mb-3">
                                  {video.description}
                                </p>

                                {/* Video Stats */}
                                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                                  <div className="flex items-center space-x-1">
                                    <Eye className="w-4 h-4" />
                                    <span>{video.views} views</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <ThumbsUp className="w-4 h-4" />
                                    <span>{video.likes} likes</span>
                                  </div>
                                </div>

                                {/* Resources */}
                                {expandedVideo === video.id &&
                                  video.resources && (
                                    <div className="bg-gray-50 rounded-lg p-4 mb-3">
                                      <p className="text-sm font-medium text-gray-700 mb-2">
                                        Resources:
                                      </p>
                                      <div className="flex flex-wrap gap-2">
                                        {video.resources.map(
                                          (resource, index) => (
                                            <button
                                              key={index}
                                              className="flex items-center space-x-1 px-3 py-1 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                            >
                                              <Download className="w-3 h-3" />
                                              <span>{resource}</span>
                                            </button>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  )}
                              </div>

                              <button
                                onClick={() => toggleVideoExpand(video.id)}
                                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                              >
                                {expandedVideo === video.id ? (
                                  <ChevronUp className="w-5 h-5" />
                                ) : (
                                  <ChevronDown className="w-5 h-5" />
                                )}
                              </button>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center space-x-3">
                              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                <PlayCircle className="w-4 h-4" />
                                <span>
                                  {video.isCompleted
                                    ? "Watch Again"
                                    : "Start Lesson"}
                                </span>
                              </button>
                              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                                <Bookmark className="w-4 h-4" />
                                <span>Save</span>
                              </button>
                              {video.resources &&
                                video.resources.length > 0 && (
                                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                                    <Download className="w-4 h-4" />
                                    <span>Resources</span>
                                  </button>
                                )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {filteredCategories.length === 0 && (
                <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
                  <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No lessons found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search terms or filters
                  </p>
                  <button
                    onClick={() => setSearchTerm("")}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Clear search
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SampleCoursePage;
