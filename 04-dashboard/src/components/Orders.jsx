// src/components/Orders.jsx
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search } from 'lucide-react';

// Fetch carts/orders from DummyJSON
const fetchOrders = async () => {
  const res = await fetch('https://dummyjson.com/carts');
  if (!res.ok) throw new Error('Failed to fetch orders');
  return res.json();
};

// Helper function to render status badge
const getStatusBadge = (id) => {
  const statuses = ['Completed', 'Pending', 'Shipped'];
  const status = statuses[id % 3];
  
  const styles = {
    Completed: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    Pending: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    Shipped: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
      {status}
    </span>
  );
};

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  });

  if (isLoading) return <div className="text-center py-10 text-neutral-500">Loading orders...</div>;
  if (isError) return <div className="text-center py-10 text-red-500">Error fetching orders.</div>;

  // Filter orders based on search (Order ID or User ID)
  const filteredOrders = data.carts.filter(
    (order) => 
      order.id.toString().includes(searchTerm) || 
      order.userId.toString().includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Orders</h2>
      </div>

      <Card className="bg-neutral-900 border-neutral-800">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-lg font-semibold text-neutral-200">All Orders</CardTitle>
          
          {/* Search Input */}
          <div className="flex items-center gap-2 bg-neutral-950 px-3 py-2 rounded-md border border-neutral-800 w-72">
            <Search size={16} className="text-neutral-500" />
            <input 
              type="text" 
              placeholder="Search by Order ID or User ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none outline-none text-sm text-neutral-200 w-full placeholder:text-neutral-500"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-neutral-800 hover:bg-transparent">
                  <TableHead className="text-neutral-400">Order ID</TableHead>
                  <TableHead className="text-neutral-400">Customer ID</TableHead>
                  <TableHead className="text-neutral-400">Total Items</TableHead>
                  <TableHead className="text-neutral-400">Total Price</TableHead>
                  <TableHead className="text-neutral-400">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-neutral-500">
                      No orders found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id} className="border-neutral-800 hover:bg-neutral-800/50">
                      <TableCell className="font-medium text-neutral-200">#{order.id}</TableCell>
                      <TableCell className="text-neutral-400">User {order.userId}</TableCell>
                      <TableCell className="text-neutral-200">{order.totalProducts} items</TableCell>
                      <TableCell className="text-neutral-200">${order.total.toFixed(2)}</TableCell>
                      <TableCell>{getStatusBadge(order.id)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}