import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import {
  Users,
  Briefcase,
  Clock,
  FileText,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle
} from "lucide-react";
import { motion } from "framer-motion";

// Modern Stat Card Component
const StatCard = ({
  title,
  value,
  icon: Icon,
  color,
  trend,
  description
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{
      scale: 1.02,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
    }}
    className={`bg-white rounded-2xl p-6 transition-all duration-300 border-l-4 ${color.border} shadow-sm hover:shadow-xl`}
  >
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-xl ${color.bg} bg-opacity-10`}>
        <Icon className={`w-6 h-6 ${color.text}`} />
      </div>
      {trend && (
        <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${trend.color}`}>
          <TrendingUp className="w-3 h-3 mr-1" />
          {trend.value}
        </div>
      )}
    </div>

    <div className="space-y-2">
      <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      <p className="text-sm font-medium text-gray-600">{title}</p>
      {description && (
        <p className="text-xs text-gray-500 mt-2">{description}</p>
      )}
    </div>
  </motion.div>
);

// Chart Container Component
const ChartCard = ({
  title,
  children,
  subtitle,
  action,
  className = ""
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 ${className}`}
  >
    <div className="flex items-center justify-between mb-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        {subtitle && (
          <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
        )}
      </div>
      {action && (
        <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
          {action}
        </button>
      )}
    </div>
    {children}
  </motion.div>
);

// Status Badge Component
const StatusBadge = ({ status, count }) => {
  const statusConfig = {
    pending: { color: "bg-amber-100 text-amber-800", icon: Clock },
    approved: { color: "bg-emerald-100 text-emerald-800", icon: CheckCircle },
    rejected: { color: "bg-rose-100 text-rose-800", icon: XCircle }
  };

  const config = statusConfig[status] || statusConfig.pending;
  const Icon = config.icon;

  return (
    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className={`p-2 rounded-full ${config.color} bg-opacity-20`}>
        <Icon className={`w-4 h-4 ${config.color.split(' ')[1]}`} />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900 capitalize">{status}</p>
        <p className="text-2xl font-bold text-gray-900">{count}</p>
      </div>
    </div>
  );
};

// Quick Stats Component
const QuickStats = ({ works }) => {
  const statusCounts = works.reduce((acc, work) => {
    const status = work.status?.toLowerCase() || 'pending';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatusBadge status="pending" count={statusCounts.pending || 0} />
      <StatusBadge status="approved" count={statusCounts.approved || 0} />
      <StatusBadge status="rejected" count={statusCounts.rejected || 0} />
    </div>
  );
};

// Recent Works Component
const RecentWorks = ({ works }) => (
  <div className="space-y-3">
    {works.slice(0, 5).map((work, index) => (
      <motion.div
        key={work._id}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
          <FileText className="w-4 h-4 text-indigo-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {work.workName}
          </p>
          <p className="text-xs text-gray-500 truncate">
            {work.submitterName} • {work.workCategory}
          </p>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${work.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
          work.status === 'rejected' ? 'bg-rose-100 text-rose-800' :
            'bg-amber-100 text-amber-800'
          }`}>
          {work.status}
        </div>
      </motion.div>
    ))}
  </div>
);

const AdminDashboard = () => {
  const axiosPublic = useAxiosPublic();
  const [stats, setStats] = useState({
    members: 0,
    projects: 0,
    works: 0
  });
  const [works, setWorks] = useState([]);
  const [memberData, setMemberData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [worksData, setWorksData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Color palettes for charts
  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  // Function to calculate monthly data
  const getMonthlyData = (items, dateKey) => {
    const months = Array.from({ length: 12 }, (_, i) => ({
      name: new Date(0, i).toLocaleString("default", { month: "short" }),
      count: 0,
    }));

    items.forEach((item) => {
      const date = new Date(item[dateKey]);
      if (!isNaN(date)) {
        months[date.getMonth()].count++;
      }
    });

    return months;
  };

  // Function to get works by category for pie chart
  const getWorksByCategory = (works) => {
    const categories = works.reduce((acc, work) => {
      const category = work.workCategory || 'Uncategorized';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(categories).map(([name, value], index) => ({
      name,
      value,
      color: COLORS[index % COLORS.length]
    }));
  };

  // Fetch all data
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [membersRes, projectsRes, worksRes] = await Promise.all([
        axiosPublic.get("/members"),
        axiosPublic.get("/projects"),
        axiosPublic.get("/api/works")
      ]);

      const members = membersRes.data || [];
      const projects = projectsRes.data || [];
      const worksData = worksRes.data || [];

      // Process data for charts
      const memberDateKey = members[0]?.joinDate ? "joinDate" : "createdAt";
      const projectDateKey = projects[0]?.startDate ? "startDate" : "createdAt";
      const workDateKey = worksData[0]?.submissionDate ? "submissionDate" : "createdAt";

      const monthlyMemberData = getMonthlyData(members, memberDateKey);
      const monthlyProjectData = getMonthlyData(projects, projectDateKey);
      const monthlyWorksData = getMonthlyData(worksData, workDateKey);

      // Update state
      setStats({
        members: members.length,
        projects: projects.length,
        works: worksData.length
      });

      setWorks(worksData);
      setMemberData(monthlyMemberData);
      setProjectData(monthlyProjectData);
      setWorksData(monthlyWorksData);

    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    // Refresh every 5 minutes
    const interval = setInterval(fetchDashboardData, 300000);
    return () => clearInterval(interval);
  }, []);

  // Compute statistics
  const worksByCategory = getWorksByCategory(works);
  const totalSubmissions = works.length;
  const approvalRate = totalSubmissions > 0
    ? Math.round((works.filter(w => w.status === 'approved').length / totalSubmissions) * 100)
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-500 border-t-transparent mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-gray-900">Loading Dashboard</h3>
          <p className="text-gray-600">Please wait while we load your data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-rose-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Dashboard Error</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors font-medium"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-blue-50 p-4 lg:p-6">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg">
            <Briefcase className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-gray-600">Welcome to your workspace analytics</p>
          </div>
        </div>

      </motion.header>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Members"
          value={stats.members}
          icon={Users}
          color={{
            border: "border-blue-500",
            bg: "bg-blue-500",
            text: "text-blue-500"
          }}
          trend={{ value: "+12%", color: "text-emerald-600 bg-emerald-50" }}
        />
        <StatCard
          title="Total Projects"
          value={stats.projects}
          icon={Briefcase}
          color={{
            border: "border-emerald-500",
            bg: "bg-emerald-500",
            text: "text-emerald-500"
          }}
        />
        <StatCard
          title="Work Submissions"
          value={stats.works}
          icon={FileText}
          color={{
            border: "border-indigo-500",
            bg: "bg-indigo-500",
            text: "text-indigo-500"
          }}
          trend={{ value: "+24%", color: "text-emerald-600 bg-emerald-50" }}
        />
        <StatCard
          title="Approval Rate"
          value={`${approvalRate}%`}
          icon={CheckCircle}
          color={{
            border: "border-amber-500",
            bg: "bg-amber-500",
            text: "text-amber-500"
          }}
          description="Of total submissions"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-1 gap-6 mb-8">
        {/* Left Column - Charts */}
        <div className="xl:col-span-2 space-y-6">
          {/* Works Growth Chart */}
          <ChartCard
            title="Work Submissions Trend"
            subtitle="Monthly submission growth"
            action="View Report"
          >
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={worksData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis
                    dataKey="name"
                    stroke="#6b7280"
                    fontSize={12}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="#6b7280"
                    fontSize={12}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar
                    dataKey="count"
                    fill="#6366f1"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          {/* Comparison Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Member Growth">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={memberData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis
                      dataKey="name"
                      stroke="#6b7280"
                      fontSize={12}
                    />
                    <YAxis
                      stroke="#6b7280"
                      fontSize={12}
                    />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ fill: '#3b82f6' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>

            <ChartCard title="Project Creation">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={projectData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis
                      dataKey="name"
                      stroke="#6b7280"
                      fontSize={12}
                    />
                    <YAxis
                      stroke="#6b7280"
                      fontSize={12}
                    />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={{ fill: '#10b981' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>
          </div>
        </div>

        {/* Right Column - Works Overview */}
        <div className="space-y-6">
          {/* Status Overview */}
          <ChartCard title="Submission Status">
            <QuickStats works={works} />
          </ChartCard>

          {/* Works by Category */}
          <ChartCard
            title="Works by Category"
            subtitle="Distribution across categories"
          >
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={worksByCategory}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {worksByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {worksByCategory.map((category, index) => (
                <div key={category.name} className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-xs text-gray-600 truncate">
                    {category.name} ({category.value})
                  </span>
                </div>
              ))}
            </div>
          </ChartCard>

          {/* Recent Submissions */}
          <ChartCard
            title="Recent Submissions"
            action="View All"
          >
            <RecentWorks works={works} />
          </ChartCard>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;