// src/App.jsx
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardCharts from './components/DashboardCharts';
import RecentOrders from './components/RecentOrders';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="pl-64 flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 p-8">
          {/* Dashboard Tab Content */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Overview</h2>
              
              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-neutral-900 border-neutral-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-neutral-400">Total Revenue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$45,231.89</div>
                    <p className="text-xs text-emerald-500 mt-1">+20.1% from last month</p>
                  </CardContent>
                </Card>

                <Card className="bg-neutral-900 border-neutral-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-neutral-400">Subscriptions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+2350</div>
                    <p className="text-xs text-emerald-500 mt-1">+180.1% from last month</p>
                  </CardContent>
                </Card>

                <Card className="bg-neutral-900 border-neutral-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-neutral-400">Sales</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+12,234</div>
                    <p className="text-xs text-emerald-500 mt-1">+19% from last month</p>
                  </CardContent>
                </Card>

                <Card className="bg-neutral-900 border-neutral-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-neutral-400">Active Now</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+573</div>
                    <p className="text-xs text-neutral-400 mt-1">+201 since last hour</p>
                  </CardContent>
                </Card>
              </div>

              {/* Charts */}
              <DashboardCharts />

              {/* Table (ONLY inside dashboard tab) */}
              <RecentOrders />
            </div>
          )}

          {/* Other Tabs Placeholder */}
          {activeTab !== 'dashboard' && (
            <div className="flex items-center justify-center h-96 border border-dashed border-neutral-800 rounded-xl">
              <p className="text-neutral-500 capitalize">{activeTab} Page coming soon...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;