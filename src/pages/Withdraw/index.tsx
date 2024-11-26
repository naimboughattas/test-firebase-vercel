import { useState } from 'react';
import { Tab } from '@headlessui/react';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../lib/auth';
import { useNotifications } from '../../lib/notifications';
import { cn } from '../../lib/utils';

import WithdrawSection from './WithdrawSection';
import WithdrawMethodList from './WithdrawMethodList';
import BillingProfileList from './BillingProfileList';

export default function Withdraw() {
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Retirer mes gains</h2>
          <p className="mt-1 text-sm text-gray-500">
            Gérez vos retraits et informations de paiement
          </p>
        </div>

        <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
          <Tab.List className="flex space-x-1 rounded-xl bg-purple-100 p-1">
            <Tab
              className={({ selected }) =>
                cn(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-purple-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white text-purple-700 shadow'
                    : 'text-purple-600 hover:bg-white/[0.12] hover:text-purple-800'
                )
              }
            >
              Retirer mes gains
            </Tab>
            <Tab
              className={({ selected }) =>
                cn(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-purple-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white text-purple-700 shadow'
                    : 'text-purple-600 hover:bg-white/[0.12] hover:text-purple-800'
                )
              }
            >
              Méthodes de retrait
            </Tab>
            <Tab
              className={({ selected }) =>
                cn(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-purple-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white text-purple-700 shadow'
                    : 'text-purple-600 hover:bg-white/[0.12] hover:text-purple-800'
                )
              }
            >
              Profils de facturation
            </Tab>
          </Tab.List>

          <Tab.Panels>
            <Tab.Panel>
              <WithdrawSection onChangeTab={setSelectedTab} />
            </Tab.Panel>

            <Tab.Panel>
              <WithdrawMethodList />
            </Tab.Panel>

            <Tab.Panel>
              <BillingProfileList />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </DashboardLayout>
  );
}