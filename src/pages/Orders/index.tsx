import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Search } from 'lucide-react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import OrdersTable from './components/OrdersTable';
import OrderTabs from './components/OrderTabs';
import ReasonModal from '../../components/ReasonModal';
import { useOrders } from './hooks/useOrders';
import { OrderStatus } from './types';

export default function Orders() {
  const [selectedTab, setSelectedTab] = useState<OrderStatus | 'all'>('all');
  const [search, setSearch] = useState('');
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const {
    orders,
    handleDispute,
    handleAcceptDelivery,
    handleArchive
  } = useOrders();

  const filteredOrders = orders.filter(order => {
    if (selectedTab !== 'all' && order.status !== selectedTab) return false;
    if (search && !order.influencer.username.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Commandes</h2>
          <p className="mt-1 text-sm text-gray-500">
            Gérez et suivez vos commandes d'engagement
          </p>
        </div>

        <div className="flex justify-between items-center">
          <OrderTabs
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
          />
          
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <OrdersTable
          orders={filteredOrders}
          onAcceptDelivery={handleAcceptDelivery}
          onDispute={(id) => {
            setSelectedOrderId(id);
            setShowDisputeModal(true);
          }}
          onArchive={handleArchive}
        />

        <ReasonModal
          isOpen={showDisputeModal}
          onClose={() => {
            setShowDisputeModal(false);
            setSelectedOrderId(null);
          }}
          onSubmit={(reason) => {
            if (selectedOrderId) {
              handleDispute(selectedOrderId, reason);
            }
          }}
          title="Contester la livraison"
          description="Veuillez indiquer le motif de votre contestation"
        />
      </div>
    </DashboardLayout>
  );
}