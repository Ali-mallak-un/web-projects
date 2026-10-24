// src/components/DashboardCharts.jsx
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Mock data for charts
const revenueData = [
  { name: 'Jan', revenue: 4000, sales: 2400 },
  { name: 'Feb', revenue: 3000, sales: 1398 },
  { name: 'Mar', revenue: 2000, sales: 9800 },
  { name: 'Apr', revenue: 2780, sales: 3908 },
  { name: 'May', revenue: 1890, sales: 4800 },
  { name: 'Jun', revenue: 2390, sales: 3800 },
  { name: 'Jul', revenue: 3490, sales: 4300 },
];

const categoryData = [
  { name: 'Electronics', sales: 4000 },
  { name: 'Clothing', sales: 3000 },
  { name: 'Home', sales: 2000 },
  { name: 'Beauty', sales: 2780 },
  { name: 'Sports', sales: 1890 },
];

export default function DashboardCharts() {
  // Custom tooltip style to match dark mode
  const tooltipStyle = {
    backgroundColor: '#171717', // neutral-900
    borderColor: '#262626', // neutral-800
    borderRadius: '8px',
    color: '#f5f5f5'
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      {/* Line Chart - Revenue Overview */}
      <Card className="bg-neutral-900 border-neutral-800">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-neutral-200">Revenue Overview</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
              <XAxis dataKey="name" stroke="#737373" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#737373" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#6366f1" // indigo-500
                strokeWidth={3}
                dot={{ r: 4, fill: '#6366f1', strokeWidth: 0 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Bar Chart - Sales by Category */}
      <Card className="bg-neutral-900 border-neutral-800">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-neutral-200">Sales by Category</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
              <XAxis dataKey="name" stroke="#737373" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#737373" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: '#262626' }} />
              <Bar 
                dataKey="sales" 
                fill="#6366f1" 
                radius={[4, 4, 0, 0]} 
                barSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}