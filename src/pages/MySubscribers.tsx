import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { Search, UserPlus, Heart, MessageCircle, Share2, History } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';
import { useNotifications } from '../lib/notifications';
import * as Tooltip from '@radix-ui/react-tooltip';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

type SubscriptionType = 'follow' | 'like' | 'comment' | 'repost_story';
type SubscriptionStatus = 'active' | 'paused' | 'cancelled';

interface Subscriber {
  id: string;
  type: SubscriptionType;
  client: {
    id: string;
    username: string;
    profileImage: string;
  };
  influencer: {
    id: string;
    username: string;
    profileImage: string;
  };
  price: number;
  status: SubscriptionStatus;
  createdAt: Date;
  history: {
    total: number;
    url: string;
  };
}

const ServiceIcon = ({ type }: { type: SubscriptionType }) => {
  switch (type) {
    case 'follow':
      return <UserPlus className="h-4 w-4" />;
    case 'like':
      return <Heart className="h-4 w-4" />;
    case 'comment':
      return <MessageCircle className="h-4 w-4" />;
    case 'repost_story':
      return <Share2 className="h-4 w-4" />;
  }
};

const StatusBadge = ({ status }: { status: SubscriptionStatus }) => {
  const styles = {
    active: 'bg-green-100 text-green-800',
    paused: 'bg-yellow-100 text-yellow-800',
    cancelled: 'bg-red-100 text-red-800'
  };

  const labels = {
    active: 'Actif',
    paused: 'En pause',
    cancelled: 'Annulé'
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};

export default function MySubscribers() {
  const navigate = useNavigate();
  const { addNotification } = useNotifications();
  const [selectedType, setSelectedType] = useState<'all' | SubscriptionType>('all');
  const [search, setSearch] = useState('');

  // Mock data
  const [subscribers] = useState<Subscriber[]>([
    {
      id: '1',
      type: 'follow',
      client: {
        id: 'client1',
        username: '@business_account1',
        profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      influencer: {
        id: 'influencer1',
        username: '@fashion_style',
        profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop'
      },
      price: 4.00,
      status: 'active',
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      history: {
        total: 3,
        url: '/dashboard/proposals?client=client1'
      }
    },
    {
      id: '2',
      type: 'like',
      client: {
        id: 'client2',
        username: '@business_account2',
        profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      influencer: {
        id: 'influencer1',
        username: '@fashion_style',
        profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop'
      },
      price: 2.00,
      status: 'active',
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      history: {
        total: 12,
        url: '/dashboard/proposals?client=client2'
      }
    }
  ]);

  const filteredSubscribers = subscribers.filter(subscriber => {
    if (selectedType !== 'all' && subscriber.type !== selectedType) return false;
    if (search && !subscriber.client.username.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Mes abonnés</h2>
          <p className="mt-1 text-sm text-gray-500">
            Gérez vos abonnés et leurs services récurrents
          </p>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <Button
              variant={selectedType === 'all' ? 'primary' : 'outline'}
              onClick={() => setSelectedType('all')}
            >
              Tous
            </Button>
            <Button
              variant={selectedType === 'follow' ? 'primary' : 'outline'}
              onClick={() => setSelectedType('follow')}
            >
              Follow
            </Button>
            <Button
              variant={selectedType === 'like' ? 'primary' : 'outline'}
              onClick={() => setSelectedType('like')}
            >
              Like
            </Button>
            <Button
              variant={selectedType === 'comment' ? 'primary' : 'outline'}
              onClick={() => setSelectedType('comment')}
            >
              Comment
            </Button>
            <Button
              variant={selectedType === 'repost_story' ? 'primary' : 'outline'}
              onClick={() => setSelectedType('repost_story')}
            >
              Repost
            </Button>
          </div>
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

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Compte concerné
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prix
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Créé le
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Historique
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSubscribers.map((subscriber) => (
                <tr key={subscriber.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    #{subscriber.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <ServiceIcon type={subscriber.type} />
                      <span className="capitalize">{subscriber.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={subscriber.client.profileImage}
                        alt={subscriber.client.username}
                        className="h-8 w-8 rounded-full"
                      />
                      <span className="ml-2">{subscriber.client.username}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={subscriber.influencer.profileImage}
                        alt={subscriber.influencer.username}
                        className="h-8 w-8 rounded-full"
                      />
                      <span className="ml-2">{subscriber.influencer.username}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {subscriber.price.toFixed(2)} €
                    {subscriber.type === 'follow' ? '/mois' : '/post'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={subscriber.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {format(subscriber.createdAt, 'dd/MM/yyyy', { locale: fr })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Tooltip.Provider>
                      <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                          <button
                            onClick={() => navigate(subscriber.history.url)}
                            className="flex items-center text-purple-600 hover:text-purple-700"
                          >
                            <History className="h-4 w-4 mr-1" />
                            {subscriber.type === 'follow' ? 
                              `${subscriber.history.total} mois` : 
                              `${subscriber.history.total} commandes`}
                          </button>
                        </Tooltip.Trigger>
                        <Tooltip.Portal>
                          <Tooltip.Content
                            className="bg-gray-900 text-white px-2 py-1 rounded text-sm"
                            sideOffset={5}
                          >
                            Voir l'historique
                            <Tooltip.Arrow className="fill-gray-900" />
                          </Tooltip.Content>
                        </Tooltip.Portal>
                      </Tooltip.Root>
                    </Tooltip.Provider>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredSubscribers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Aucun abonné trouvé</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}