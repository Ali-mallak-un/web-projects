// src/components/RecentOrders.jsx
import { useQuery } from '@tanstack/react-query';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Function to fetch products from API
const fetchProducts = async () => {
  const res = await fetch('https://dummyjson.com/products?limit=5');
  if (!res.ok) throw new Error('Network response was not ok');
  return res.json();
};

export default function RecentOrders() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return <div className="text-center py-10 text-neutral-500">Loading data...</div>;
  }

  if (isError) {
    return <div className="text-center py-10 text-red-500">Error fetching data.</div>;
  }

  return (
    <Card className="bg-neutral-900 border-neutral-800 mt-6">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-neutral-200">Recent Products</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-neutral-800 hover:bg-transparent">
              <TableHead className="text-neutral-400">Product</TableHead>
              <TableHead className="text-neutral-400">Category</TableHead>
              <TableHead className="text-neutral-400">Price</TableHead>
              <TableHead className="text-neutral-400">Stock</TableHead>
              <TableHead className="text-neutral-400 text-right">Rating</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.products.map((product) => (
              <TableRow key={product.id} className="border-neutral-800 hover:bg-neutral-800/50">
                <TableCell className="font-medium text-neutral-200 flex items-center gap-3">
                  <img src={product.thumbnail} alt={product.title} className="w-10 h-10 rounded-md object-cover bg-neutral-800" />
                  {product.title}
                </TableCell>
                <TableCell className="text-neutral-400 capitalize">{product.category}</TableCell>
                <TableCell className="text-neutral-200">${product.price}</TableCell>
                <TableCell className="text-neutral-400">{product.stock} in stock</TableCell>
                <TableCell className="text-right text-emerald-500 font-medium">⭐ {product.rating}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}