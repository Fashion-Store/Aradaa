import * as React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const OrderHistory = () => {
  const location = useLocation();
  const { user } = useAuth();
  const orderPlaced = location.state?.orderPlaced;
  const orderId = location.state?.orderId;

  // Sample order data
  const orders = [
    {
      id: orderId || 'ORD1700123456',
      date: new Date().toLocaleDateString(),
      status: 'pending',
      total: 25000,
      items: 2,
      trackingId: 'TRK001',
      products: [
        { name: 'Classic Black Dress', size: 'M', quantity: 1, price: 12500 },
        { name: 'Silk Evening Gown', size: 'L', quantity: 1, price: 12500 }
      ]
    },
    {
      id: 'ORD1699987654',
      date: '2024-11-10',
      status: 'delivered',
      total: 18500,
      items: 1,
      trackingId: 'TRK002',
      products: [
        { name: 'Professional Blazer Set', size: 'S', quantity: 1, price: 18500 }
      ]
    },
    {
      id: 'ORD1699876543',
      date: '2024-11-05',
      status: 'shipped',
      total: 8500,
      items: 1,
      trackingId: 'TRK003',
      products: [
        { name: 'Floral Summer Dress', size: 'M', quantity: 1, price: 8500 }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'packed':
        return <Package className="h-5 w-5 text-blue-500" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'packed':
        return 'text-blue-600 bg-blue-50';
      case 'shipped':
        return 'text-purple-600 bg-purple-50';
      case 'delivered':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif font-light text-gray-900 mb-4">
            Please log in to view your orders
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-8 pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-serif font-light text-gray-900 mb-2">
            Order History
          </h1>
          <p className="text-gray-600">
            Track your orders and view your purchase history
          </p>
        </motion.div>

        {/* Success Message */}
        {orderPlaced && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <div>
                    <h3 className="font-medium text-green-900">
                      Order Placed Successfully!
                    </h3>
                    <p className="text-green-700 text-sm">
                      Your order {orderId} has been received and is being processed.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg font-medium">
                        Order #{order.id}
                      </CardTitle>
                      <p className="text-sm text-gray-600">
                        Placed on {order.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="ml-2">{getStatusText(order.status)}</span>
                      </div>
                      {order.trackingId && (
                        <p className="text-xs text-gray-500 mt-1">
                          Tracking: {order.trackingId}
                        </p>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {order.products.map((product, productIndex) => (
                      <div
                        key={productIndex}
                        className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                      >
                        <div>
                          <p className="font-medium text-gray-900">{product.name}</p>
                          <p className="text-sm text-gray-600">
                            Size: {product.size} × {product.quantity}
                          </p>
                        </div>
                        <p className="font-medium">
                          Rs. {product.price.toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                    <div>
                      <span className="text-sm text-gray-600">
                        {order.items} {order.items === 1 ? 'item' : 'items'}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">
                        Total: Rs. {order.total.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {orders.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-6" />
            <h2 className="text-xl font-serif font-light text-gray-900 mb-4">
              No Orders Yet
            </h2>
            <p className="text-gray-600 mb-8">
              You haven't placed any orders yet. Start shopping to see your order history here.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
