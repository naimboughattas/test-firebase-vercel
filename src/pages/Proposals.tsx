import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Search, UserPlus, Heart, MessageCircle, Share2, ExternalLink, AlertCircle, Clock } from 'lucide-react';
import { useNotifications } from '../lib/notifications';
import { formatDate } from '../lib/utils';
import Button from '../components/Button';
import Input from '../components/Input';
import ReasonModal from '../components/ReasonModal';
import ProofModal from '../components/ProofModal';
import * as Tooltip from '@radix-ui/react-tooltip';
import { getTimeLeft } from '../components/TimeRemaining';

type ProposalStatus = 'pending' | 'accepted' | 'delivered' | 'completed' | 'refused' | 'archived';

const ServiceIcon = ({ service }: { service: 'follow' | 'like' | 'comment' | 'repost_story' }) => {
  switch (service) {
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

const StatusBadge = ({ status, reason, date, type }: { 
  status: string; 
  reason?: string;
  date?: Date;
  type?: 'delivery' | 'validation';
}) => {
  const styles = {
    pending: 'bg-yellow-100 text-yellow-800',
    accepted: 'bg-blue-100 text-blue-800',
    delivered: 'bg-purple-100 text-purple-800',
    completed: 'bg-green-100 text-green-800',
    refused: 'bg-red-100 text-red-800',
    archived: 'bg-gray-100 text-gray-800'
  };

  const labels = {
    pending: 'Non traitée',
    accepted: 'À livrer',
    delivered: 'Livrée',
    completed: 'Terminée',
    refused: 'Refusée',
    archived: 'Archivée'
  };

  return (
    <div className="flex items-center space-x-2">
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
      {(status === 'accepted' || status === 'delivered') && date && (
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button className="text-gray-400 hover:text-gray-600">
                <Clock className="h-4 w-4" />
              </button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className="bg-gray-900 text-white px-2 py-1 rounded text-sm"
                sideOffset={5}
              >
                {getTimeLeft(date, type || 'delivery')}
                <Tooltip.Arrow className="fill-gray-900" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      )}
      {reason && (
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button className="text-red-500 hover:text-red-600">
                <AlertCircle className="h-4 w-4" />
              </button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className="bg-gray-900 text-white px-2 py-1 rounded text-sm"
                sideOffset={5}
              >
                {reason}
                <Tooltip.Arrow className="fill-gray-900" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      )}
    </div>
  );
};

export default function Proposals() {
  const { addNotification } = useNotifications();
  const [selectedTab, setSelectedTab] = useState<ProposalStatus | 'all'>('all');
  const [notificationsTab, setNotificationsTab] = useState(false);
  const [showProofModal, setShowProofModal] = useState(false);
  const [showRefuseModal, setShowRefuseModal] = useState(false);
  const [selectedProposalId, setSelectedProposalId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [proposals, setProposals] = useState([
    {
      id: '1',
      orderNumber: 6,
      date: new Date(),
      client: {
        id: '1',
        username: '@business_account1',
        profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop'
      },
      service: 'follow' as const,
      target: '@target_account1',
      price: 4.00,
      status: 'pending' as ProposalStatus,
      acceptedAt: null,
      deliveredAt: null
    },
    {
      id: '2',
      orderNumber: 5,
      date: new Date(Date.now() - 3600000),
      client: {
        id: '2',
        username: '@business_account2',
        profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop'
      },
      service: 'repost_story' as const,
      target: 'https://instagram.com/p/xyz',
      price: 4.00,
      status: 'accepted' as ProposalStatus,
      acceptedAt: new Date(Date.now() - 1800000),
      deliveredAt: null
    }
  ]);

  const handleAccept = (id: string) => {
    setProposals(proposals.map(p => 
      p.id === id ? {
        ...p,
        status: 'accepted' as ProposalStatus,
        acceptedAt: new Date()
      } : p
    ));

    addNotification({
      type: 'success',
      message: 'Proposition acceptée'
    });
  };

  const handleRefuse = (id: string, reason: string) => {
    setProposals(proposals.map(p => 
      p.id === id ? {
        ...p,
        status: 'refused' as ProposalStatus,
        refusalReason: reason
      } : p
    ));

    addNotification({
      type: 'success',
      message: 'Proposition refusée'
    });
  };

  const handleDeliver = (id: string, file: File) => {
    setProposals(proposals.map(p => 
      p.id === id ? {
        ...p,
        status: 'delivered' as ProposalStatus,
        deliveredAt: new Date(),
        proofUrl: URL.createObjectURL(file)
      } : p
    ));

    addNotification({
      type: 'success',
      message: 'Preuve de livraison envoyée'
    });
  };

  const handleArchive = (id: string) => {
    setProposals(proposals.map(p => 
      p.id === id ? {
        ...p,
        status: 'archived' as ProposalStatus
      } : p
    ));

    addNotification({
      type: 'success',
      message: 'Proposition archivée'
    });
  };

  const filteredProposals = proposals.filter(proposal => {
    if (selectedTab !== 'all' && proposal.status !== selectedTab) return false;
    if (search && !proposal.client.username.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Propositions reçues</h2>
          <p className="mt-1 text-sm text-gray-500">
            Gérez les propositions de services reçues
          </p>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <Button
              variant={selectedTab === 'all' ? 'primary' : 'outline'}
              onClick={() => setSelectedTab('all')}
            >
              Toutes
            </Button>
            <Button
              variant={selectedTab === 'pending' ? 'primary' : 'outline'}
              onClick={() => setSelectedTab('pending')}
            >
              Non traitées
            </Button>
            <Button
              variant={selectedTab === 'accepted' ? 'primary' : 'outline'}
              onClick={() => setSelectedTab('accepted')}
            >
              À livrer
            </Button>
            <Button
              variant={selectedTab === 'delivered' ? 'primary' : 'outline'}
              onClick={() => setSelectedTab('delivered')}
            >
              Livrée
            </Button>
            <Button
              variant={selectedTab === 'completed' ? 'primary' : 'outline'}
              onClick={() => setSelectedTab('completed')}
            >
              Terminée
            </Button>
            <Button
              variant={selectedTab === 'refused' ? 'primary' : 'outline'}
              onClick={() => setSelectedTab('refused')}
            >
              Refusée
            </Button>
            <Button
              variant={selectedTab === 'archived' ? 'primary' : 'outline'}
              onClick={() => setSelectedTab('archived')}
            >
              Archives
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant={notificationsTab ? 'primary' : 'outline'}
              onClick={() => setNotificationsTab(!notificationsTab)}
            >
              Notifications
            </Button>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  N°
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Compte
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cible
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prix
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProposals.map((proposal) => (
                <tr key={proposal.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{proposal.orderNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(proposal.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Tooltip.Provider>
                      <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                          <div className="flex items-center">
                            <img
                              src={proposal.client.profileImage}
                              alt={proposal.client.username}
                              className="h-8 w-8 rounded-full"
                            />
                          </div>
                        </Tooltip.Trigger>
                        <Tooltip.Portal>
                          <Tooltip.Content
                            className="bg-gray-900 text-white px-2 py-1 rounded text-sm"
                            sideOffset={5}
                          >
                            {proposal.client.username}
                            <Tooltip.Arrow className="fill-gray-900" />
                          </Tooltip.Content>
                        </Tooltip.Portal>
                      </Tooltip.Root>
                    </Tooltip.Provider>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Tooltip.Provider>
                      <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                          <div className="flex items-center">
                            <ServiceIcon service={proposal.service} />
                          </div>
                        </Tooltip.Trigger>
                        <Tooltip.Portal>
                          <Tooltip.Content
                            className="bg-gray-900 text-white px-2 py-1 rounded text-sm"
                            sideOffset={5}
                          >
                            {proposal.service}
                            <Tooltip.Arrow className="fill-gray-900" />
                          </Tooltip.Content>
                        </Tooltip.Portal>
                      </Tooltip.Root>
                    </Tooltip.Provider>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {proposal.service === 'follow' ? (
                      proposal.target
                    ) : (
                      <a
                        href={proposal.target}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-purple-600 hover:text-purple-700"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Voir le post
                      </a>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {proposal.price.toFixed(2)} €
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge 
                      status={proposal.status}
                      reason={proposal.refusalReason}
                      date={proposal.acceptedAt || proposal.deliveredAt}
                      type={proposal.status === 'accepted' ? 'delivery' : 'validation'}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {proposal.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleAccept(proposal.id)}
                          >
                            Accepter
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedProposalId(proposal.id);
                              setShowRefuseModal(true);
                            }}
                          >
                            Refuser
                          </Button>
                        </>
                      )}
                      {(proposal.status === 'accepted' || proposal.status === 'refused') && (
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedProposalId(proposal.id);
                            setShowProofModal(true);
                          }}
                        >
                          Livrer
                        </Button>
                      )}
                      {proposal.status === 'completed' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleArchive(proposal.id)}
                        >
                          Archiver
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ProofModal
        isOpen={showProofModal}
        onClose={() => {
          setShowProofModal(false);
          setSelectedProposalId(null);
        }}
        onSubmit={(file) => {
          if (selectedProposalId) {
            handleDeliver(selectedProposalId, file);
          }
        }}
      />

      <ReasonModal
        isOpen={showRefuseModal}
        onClose={() => {
          setShowRefuseModal(false);
          setSelectedProposalId(null);
        }}
        onSubmit={(reason) => {
          if (selectedProposalId) {
            handleRefuse(selectedProposalId, reason);
          }
        }}
        title="Refuser la proposition"
        description="Veuillez indiquer le motif de votre refus"
      />
    </DashboardLayout>
  );
}