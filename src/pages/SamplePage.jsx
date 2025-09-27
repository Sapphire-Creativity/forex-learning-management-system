import React, { useState } from 'react';
import { 
  FiTrendingUp, 
  FiBook, 
  FiAward, 
  FiClock, 
  FiDollarSign, 
  FiPieChart,
  FiCalendar,
  FiBell,
  FiUser,
  FiMenu,
  FiX
} from 'react-icons/fi';

const ForexLMSDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Mock data for the dashboard
  const [dashboardData] = useState({
    progress: 65,
    activeCourses: 3,
    completedLessons: 24,
    totalLessons: 37,
    accountBalance: 1250.75,
    tradingLevel: 'Intermediate',
    weeklyProgress: [
      { day: 'Mon', value: 40 },
      { day: 'Tue', value: 55 },
      { day: 'Wed', value: 35 },
      { day: 'Thu', value: 70 },
      { day: 'Fri', value: 65 },
      { day: 'Sat', value: 80 },
      { day: 'Sun', value: 75 }
    ],
    recentActivities: [
      { id: 1, course: 'Forex Basics', action: 'Completed Lesson 5', time: '2 hours ago' },
      { id: 2, course: 'Technical Analysis', action: 'Started new module', time: '1 day ago' },
      { id: 3, course: 'Risk Management', action: 'Submitted assignment', time: '2 days ago' }
    ],
    upcomingEvents: [
      { id: 1, title: 'Live Trading Session', time: 'Today, 3:00 PM', instructor: 'John Forex' },
      { id: 2, title: 'Q&A Session', time: 'Tomorrow, 11:00 AM', instructor: 'Sarah Trader' }
    ]
  });

  const StatCard = ({ title, value, icon, color, change }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold mt-2">{value}</p>
          {change && (
            <div className={`flex items-center mt-1 ${change > 0 ? 'text-green-500' : 'text-red-500'}`}>
              <FiTrendingUp className={change > 0 ? '' : 'transform rotate-180'} />
              <span className="ml-1 text-sm">{change}% from last week</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full ${color} text-white`}>
          {icon}
        </div>
      </div>
    </div>
  );

  const ProgressBar = ({ percentage, label }) => (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm font-medium">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-blue-600 h-2.5 rounded-full" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block fixed md:relative z-20 bg-white w-64 shadow-lg md:shadow-none`}>
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-blue-600">ForexPro LMS</h1>
        </div>
        
        <nav className="mt-6">
          <a href="#" className="flex items-center px-6 py-3 text-blue-600 bg-blue-50 border-r-4 border-blue-600">
            <FiTrendingUp className="mr-3" />
            <span>Dashboard</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100">
            <FiBook className="mr-3" />
            <span>My Courses</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100">
            <FiAward className="mr-3" />
            <span>Certificates</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100">
            <FiDollarSign className="mr-3" />
            <span>Trading Account</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100">
            <FiPieChart className="mr-3" />
            <span>Analytics</span>
          </a>
          <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100">
            <FiCalendar className="mr-3" />
            <span>Schedule</span>
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <button 
                className="md:hidden text-gray-500 focus:outline-none"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
              <h2 className="ml-4 md:ml-0 text-xl font-semibold">Student Dashboard</h2>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative text-gray-500">
                <FiBell size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">3</span>
              </button>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <FiUser className="text-blue-600" />
                </div>
                <span className="ml-2 font-medium">Alex Trader</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Welcome back, Alex!</h1>
            <p className="text-gray-600">Continue your Forex trading journey. You're making great progress!</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard 
              title="Overall Progress" 
              value={`${dashboardData.progress}%`} 
              icon={<FiTrendingUp size={24} />} 
              color="bg-blue-500"
              change={5}
            />
            <StatCard 
              title="Active Courses" 
              value={dashboardData.activeCourses} 
              icon={<FiBook size={24} />} 
              color="bg-green-500"
            />
            <StatCard 
              title="Completed Lessons" 
              value={`${dashboardData.completedLessons}/${dashboardData.totalLessons}`} 
              icon={<FiAward size={24} />} 
              color="bg-purple-500"
            />
            <StatCard 
              title="Account Balance" 
              value={`$${dashboardData.accountBalance}`} 
              icon={<FiDollarSign size={24} />} 
              color="bg-yellow-500"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Progress Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">Your Learning Progress</h3>
                  <span className="text-sm text-blue-600 font-medium">View Details</span>
                </div>
                
                <ProgressBar percentage={dashboardData.progress} label="Overall Progress" />
                <ProgressBar percentage={75} label="Forex Basics" />
                <ProgressBar percentage={60} label="Technical Analysis" />
                <ProgressBar percentage={45} label="Risk Management" />
                
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Weekly Activity</h4>
                  <div className="flex items-end justify-between h-32">
                    {dashboardData.weeklyProgress.map((day, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div 
                          className="w-full bg-blue-500 rounded-t-lg"
                          style={{ height: `${day.value}%` }}
                        ></div>
                        <span className="text-xs mt-1">{day.day}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Trading Level */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Your Trading Level</h3>
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {dashboardData.tradingLevel.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold">{dashboardData.tradingLevel} Trader</p>
                    <p className="text-sm text-gray-600">Keep learning to reach Advanced level</p>
                  </div>
                </div>
                <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-200">
                  Take Level Test
                </button>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {dashboardData.recentActivities.map(activity => (
                    <div key={activity.id} className="flex">
                      <div className="w-2 bg-blue-500 rounded-full mr-3"></div>
                      <div>
                        <p className="font-medium">{activity.course}</p>
                        <p className="text-sm text-gray-600">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
                <div className="space-y-4">
                  {dashboardData.upcomingEvents.map(event => (
                    <div key={event.id} className="p-3 bg-blue-50 rounded-lg">
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-gray-600">{event.time}</p>
                      <p className="text-xs text-gray-500">Instructor: {event.instructor}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default ForexLMSDashboard;