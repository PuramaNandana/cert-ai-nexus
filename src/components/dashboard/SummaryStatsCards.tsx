
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, CheckCircle2, Clock, Send } from 'lucide-react';

interface SummaryStatsCardsProps {
  totalDocuments: number;
  verifiedDocuments: number;
  pendingDocuments: number;
  activeRequests: number;
  onCardClick: (cardType: 'total' | 'verified' | 'pending' | 'requests') => void;
}

const SummaryStatsCards = ({
  totalDocuments,
  verifiedDocuments,
  pendingDocuments,
  activeRequests,
  onCardClick
}: SummaryStatsCardsProps) => {
  const cards = [
    {
      id: 'total' as const,
      title: 'Total Documents',
      value: totalDocuments,
      icon: FileText,
      iconBgColor: 'bg-blue-100 dark:bg-blue-900',
      iconColor: 'text-blue-600 dark:text-blue-400',
      textColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      id: 'verified' as const,
      title: 'Verified',
      value: verifiedDocuments,
      icon: CheckCircle2,
      iconBgColor: 'bg-green-100 dark:bg-green-900',
      iconColor: 'text-green-600 dark:text-green-400',
      textColor: 'text-green-600 dark:text-green-400'
    },
    {
      id: 'pending' as const,
      title: 'Pending Review',
      value: pendingDocuments,
      icon: Clock,
      iconBgColor: 'bg-amber-100 dark:bg-amber-900',
      iconColor: 'text-amber-600 dark:text-amber-400',
      textColor: 'text-amber-600 dark:text-amber-400'
    },
    {
      id: 'requests' as const,
      title: 'Active Requests',
      value: activeRequests,
      icon: Send,
      iconBgColor: 'bg-blue-100 dark:bg-blue-900',
      iconColor: 'text-blue-600 dark:text-blue-400',
      textColor: 'text-blue-600 dark:text-blue-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card) => {
        const IconComponent = card.icon;
        return (
          <Card
            key={card.id}
            className="bg-white dark:bg-slate-800 border-0 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer rounded-xl min-h-[80px]"
            onClick={() => onCardClick(card.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between h-full">
                <div className={`${card.iconBgColor} p-3 rounded-lg flex items-center justify-center`}>
                  <IconComponent className={`h-6 w-6 ${card.iconColor}`} />
                </div>
                <div className="flex flex-col items-end justify-center ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    {card.title}
                  </p>
                  <p className={`text-3xl font-bold ${card.textColor}`}>
                    {card.value}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default SummaryStatsCards;
