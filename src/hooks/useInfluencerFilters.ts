import { useState } from 'react';
import { Platform, SocialAccount } from '../lib/types';

interface Filters {
  category: string;
  language: string;
  country: string;
  minFollowers: string;
  maxFollowers: string;
  minPrice: string;
  maxPrice: string;
}

const defaultFilters: Filters = {
  category: '',
  language: '',
  country: '',
  minFollowers: '',
  maxFollowers: '',
  minPrice: '',
  maxPrice: ''
};

export function useInfluencerFilters(
  influencers: SocialAccount[],
  platform: Platform,
  search: string
) {
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const resetFilters = () => setFilters(defaultFilters);

  const filteredInfluencers = influencers.filter(influencer => {
    if (influencer.platform !== platform) return false;
    if (search && !influencer.username.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    
    if (filters.category && influencer.category !== filters.category) return false;
    if (filters.language && influencer.language !== filters.language) return false;
    if (filters.country && influencer.country !== filters.country) return false;
    if (filters.minFollowers && influencer.followers < parseInt(filters.minFollowers)) return false;
    if (filters.maxFollowers && influencer.followers > parseInt(filters.maxFollowers)) return false;
    
    const minPrice = parseFloat(filters.minPrice);
    const maxPrice = parseFloat(filters.maxPrice);
    const prices = Object.values(influencer.prices).filter(p => p !== undefined);
    const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
    
    if (!isNaN(minPrice) && avgPrice < minPrice) return false;
    if (!isNaN(maxPrice) && avgPrice > maxPrice) return false;
    
    return true;
  });

  return {
    filters,
    setFilters,
    resetFilters,
    filteredInfluencers
  };
}