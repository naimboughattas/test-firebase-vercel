import { useState } from 'react';
import { useNotifications } from '../../../lib/notifications';
import { Order } from '../types';

// Mock data
const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 5,
    date: new Date(),
    influencer: {
      id: '1',
      username: '@fashion_style',
      profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop'
    },
    service: 'follow',
    target: '@target_account2',
    price: 4.00,
    status: 'pending',
    acceptedAt: null,
    deliveredAt: null
  },
  {
    id: '2',
    orderNumber: 4,
    date: new Date(Date.now() - 3600000),
    influencer: {
      id: '2',
      username: '@tech_guru',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop'
    },
    service: 'repost_story',
    target: 'https://instagram.com/p/xyz',
    price: 4.00,
    status: 'in_progress',
    acceptedAt: new Date(Date.now() - 1800000),
    deliveredAt: null
  }
];

export function useOrders() {
  const { addNotification } = useNotifications();
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const handleDispute = (orderId: string, reason: string) => {
    setOrders(orders.map(o => 
      o.id === orderId ? {
        ...o,
        status: 'refused',
        disputeReason: reason
      } : o
    ));

    addNotification({
      type: 'success',
      message: 'Livraison contestée'
    });
  };

  const handleAcceptDelivery = (orderId: string) => {
    setOrders(orders.map(o => 
      o.id === orderId ? {
        ...o,
        status: 'completed'
      } : o
    ));

    addNotification({
      type: 'success',
      message: 'Livraison acceptée'
    });
  };

  const handleArchive = (orderId: string) => {
    setOrders(orders.map(o => 
      o.id === orderId ? {
        ...o,
        status: 'archived'
      } : o
    ));

    addNotification({
      type: 'success',
      message: 'Commande archivée'
    });
  };

  return {
    orders,
    handleDispute,
    handleAcceptDelivery,
    handleArchive
  };
}