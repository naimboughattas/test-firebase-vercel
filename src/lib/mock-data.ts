import { subHours, subDays } from 'date-fns';
import { SocialAccount } from './types';

// Mock influencers data
export const mockInfluencers: SocialAccount[] = [
  // Instagram Influencers
  {
    id: '1',
    platform: 'instagram',
    username: '@fashion_style',
    displayName: 'Fashion Style',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop',
    followers: 345000,
    category: 'Fashion',
    country: 'France',
    city: 'Paris',
    language: 'French',
    isVerified: true,
    isActive: true,
    hideIdentity: false,
    prices: {
      follow: 4,
      like: 2,
      comment: 8,
      repost_story: 6,
      repost: 5
    },
    availableServices: ['follow', 'like', 'comment', 'repost_story', 'repost'],
    avgDeliveryTime: 25,
    completedOrders: 1245,
    rating: 4.9,
    pk: '123456789'
  },
  {
    id: '2',
    platform: 'instagram',
    username: '@food_lover',
    displayName: 'Food Lover',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop',
    followers: 230000,
    category: 'Food',
    country: 'France',
    city: 'Lyon',
    language: 'French',
    isVerified: true,
    isActive: true,
    hideIdentity: false,
    prices: {
      follow: 3,
      like: 1.5,
      comment: 6,
      repost_story: 4,
      repost: 3.5
    },
    availableServices: ['follow', 'like', 'comment', 'repost_story', 'repost'],
    avgDeliveryTime: 20,
    completedOrders: 789,
    rating: 4.9,
    pk: '987654321'
  },
  {
    id: '13',
    platform: 'instagram',
    username: '@art_gallery',
    displayName: 'Art Gallery',
    profileImage: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=300&h=300&fit=crop',
    followers: 275000,
    category: 'Art',
    country: 'France',
    city: 'Paris',
    language: 'French',
    isVerified: true,
    isActive: true,
    hideIdentity: false,
    prices: {
      follow: 3.5,
      like: 1.75,
      comment: 7,
      repost_story: 5,
      repost: 4
    },
    availableServices: ['follow', 'like', 'comment', 'repost_story', 'repost'],
    avgDeliveryTime: 29,
    completedOrders: 387,
    rating: 4.7,
    pk: '741852963'
  },
  {
    id: '14',
    platform: 'instagram',
    username: '@music_vibes',
    displayName: 'Music Vibes',
    profileImage: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop',
    followers: 420000,
    category: 'Music',
    country: 'France',
    city: 'Marseille',
    language: 'French',
    isVerified: true,
    isActive: true,
    hideIdentity: false,
    prices: {
      follow: 4,
      like: 2,
      comment: 8,
      repost_story: 6,
      repost: 5
    },
    availableServices: ['follow', 'like', 'comment', 'repost_story', 'repost'],
    avgDeliveryTime: 27,
    completedOrders: 542,
    rating: 4.8,
    pk: '963741852'
  },
  {
    id: '15',
    platform: 'instagram',
    username: '@travel_addict',
    displayName: 'Travel Addict',
    profileImage: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=300&h=300&fit=crop',
    followers: 420000,
    category: 'Travel',
    country: 'France',
    city: 'Nice',
    language: 'French',
    isVerified: true,
    isActive: true,
    hideIdentity: false,
    prices: {
      follow: 5,
      like: 2.5,
      comment: 10,
      repost_story: 8,
      repost: 7
    },
    availableServices: ['follow', 'like', 'comment', 'repost_story', 'repost'],
    avgDeliveryTime: 24,
    completedOrders: 567,
    rating: 4.8,
    pk: '456789123'
  },
  {
    id: '16',
    platform: 'instagram',
    username: '@beauty_guru',
    displayName: 'Beauty Guru',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop',
    followers: 180000,
    category: 'Beauty',
    country: 'France',
    city: 'Paris',
    language: 'French',
    isVerified: true,
    isActive: true,
    hideIdentity: false,
    prices: {
      follow: 3,
      like: 1.5,
      comment: 6,
      repost_story: 4,
      repost: 3.5
    },
    availableServices: ['follow', 'like', 'comment', 'repost_story', 'repost'],
    avgDeliveryTime: 28,
    completedOrders: 432,
    rating: 4.7,
    pk: '741852963'
  },
  {
    id: '17',
    platform: 'instagram',
    username: '@fitness_coach',
    displayName: 'Fitness Coach',
    profileImage: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=300&h=300&fit=crop',
    followers: 290000,
    category: 'Sports',
    country: 'France',
    city: 'Marseille',
    language: 'French',
    isVerified: true,
    isActive: true,
    hideIdentity: false,
    prices: {
      follow: 4,
      like: 2,
      comment: 8,
      repost_story: 6,
      repost: 5
    },
    availableServices: ['follow', 'like', 'comment', 'repost_story', 'repost'],
    avgDeliveryTime: 26,
    completedOrders: 678,
    rating: 4.8,
    pk: '963852741'
  },

  // TikTok Influencers
  {
    id: '3',
    platform: 'tiktok',
    username: '@dance_queen',
    displayName: 'Dance Queen',
    profileImage: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=300&h=300&fit=crop',
    followers: 890000,
    category: 'Dance',
    country: 'France',
    city: 'Paris',
    language: 'French',
    isVerified: true,
    isActive: true,
    hideIdentity: false,
    prices: {
      follow: 5,
      like: 2.5,
      comment: 10,
      repost_story: 8,
      repost: 7
    },
    availableServices: ['follow', 'like', 'comment', 'repost_story', 'repost'],
    avgDeliveryTime: 24,
    completedOrders: 567,
    rating: 4.8,
    pk: '456789123'
  },
  {
    id: '4',
    platform: 'tiktok',
    username: '@comedy_central',
    displayName: 'Comedy Central',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop',
    followers: 650000,
    category: 'Entertainment',
    country: 'France',
    city: 'Lyon',
    language: 'French',
    isVerified: true,
    isActive: true,
    hideIdentity: false,
    prices: {
      follow: 4,
      like: 2,
      comment: 8,
      repost_story: 6,
      repost: 5
    },
    availableServices: ['follow', 'like', 'comment', 'repost_story', 'repost'],
    avgDeliveryTime: 28,
    completedOrders: 432,
    rating: 4.7,
    pk: '741852963'
  },
  {
    id: '18',
    platform: 'tiktok',
    username: '@fashion_trends',
    displayName: 'Fashion Trends',
    profileImage: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&h=300&fit=crop',
    followers: 520000,
    category: 'Fashion',
    country: 'France',
    city: 'Paris',
    language: 'French',
    isVerified: true,
    isActive: true,
    hideIdentity: false,
    prices: {
      follow: 4.5,
      like: 2.25,
      comment: 9,
      repost_story: 7,
      repost: 6
    },
    availableServices: ['follow', 'like', 'comment', 'repost_story', 'repost'],
    avgDeliveryTime: 25,
    completedOrders: 623,
    rating: 4.9,
    pk: '852963741'
  },
  {
    id: '19',
    platform: 'tiktok',
    username: '@diy_crafts',
    displayName: 'DIY Crafts',
    profileImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop',
    followers: 380000,
    category: 'DIY',
    country: 'France',
    city: 'Lyon',
    language: 'French',
    isVerified: true,
    isActive: true,
    hideIdentity: false,
    prices: {
      follow: 3.5,
      like: 1.75,
      comment: 7,
      repost_story: 5,
      repost: 4
    },
    availableServices: ['follow', 'like', 'comment', 'repost_story', 'repost'],
    avgDeliveryTime: 31,
    completedOrders: 456,
    rating: 4.7,
    pk: '741963852'
  },
  {
    id: '20',
    platform: 'tiktok',
    username: '@gaming_master',
    displayName: 'Gaming Master',
    profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop',
    followers: 420000,
    category: 'Gaming',
    country: 'France',
    city: 'Paris',
    language: 'French',
    isVerified: true,
    isActive: true,
    hideIdentity: false,
    prices: {
      follow: 4,
      like: 2,
      comment: 8,
      repost_story: 6,
      repost: 5
    },
    availableServices: ['follow', 'like', 'comment', 'repost_story', 'repost'],
    avgDeliveryTime: 23,
    completedOrders: 789,
    rating: 4.8,
    pk: '159753456'
  },

  // YouTube Influencers
  {
    id: '5',
    platform: 'youtube',
    username: '@tech_reviews',
    displayName: 'Tech Reviews FR',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
    followers: 450000,
    category: 'Tech',
    country: 'France',
    city: 'Paris',
    language: 'French',
    isVerified: true,
    isActive: true,
    hideIdentity: false,
    prices: {
      follow: 6,
      like: 3,
      comment: 12,
      repost_story: 9,
      repost: 8
    },
    availableServices: ['follow', 'like', 'comment', 'repost_story', 'repost'],
    avgDeliveryTime: 32,
    completedOrders: 345,
    rating: 4.9,
    pk: '963852741'
  },
  {
    id: '6',
    platform: 'youtube',
    username: '@gaming_pro',
    displayName: 'Gaming Pro FR',
    profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop',
    followers: 320000,
    category: 'Gaming',
    country: 'France',
    city: 'Lyon',
    language: 'French',
    isVerified: true,
    isActive: true,
    hideIdentity: false,
    prices: {
      follow: 5,
      like: 2.5,
      comment: 10,
      repost_story: 7,
      repost: 6
    },
    availableServices: ['follow', 'like', 'comment', 'repost_story', 'repost'],
    avgDeliveryTime: 36,
    completedOrders: 289,
    rating: 4.8,
    pk: '147258369'
  },
  {
    id: '21',
    platform: 'youtube',
    username: '@science_explained',
    displayName: 'Science Explained',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
    followers: 620000,
    category: 'Education',
    country: 'France',
    city: 'Paris',
    language: 'French',
    isVerified: true,
    isActive: true,
    hideIdentity: false,
    prices: {
      follow: 5,
      like: 2.5,
      comment: 10,
      repost_story: 8,
      repost: 7
    },
    availableServices: ['follow', 'like', 'comment', 'repost_story', 'repost'],
    avgDeliveryTime: 33,
    completedOrders: 478,
    rating: 4.9,
    pk: '852741963'
  },
  {
    id: '22',
    platform: 'youtube',
    username: '@movie_reviews',
    displayName: 'Movie Reviews',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop',
    followers: 480000,
    category: 'Entertainment',
    country: 'France',
    city: 'Lyon',
    language: 'French',
    isVerified: true,
    isActive: true,
    hideIdentity: false,
    prices: {
      follow: 4,
      like: 2,
      comment: 8,
      repost_story: 6,
      repost: 5
    },
    availableServices: ['follow', 'like', 'comment', 'repost_story', 'repost'],
    avgDeliveryTime: 35,
    completedOrders: 389,
    rating: 4.8,
    pk: '963852741'
  },

  // X (Twitter) Influencers
  {
    id: '7',
    platform: 'x',
    username: '@news_flash',
    displayName: 'News Flash FR',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
    followers: 280000,
    category: 'News',
    country: 'France',
    city: 'Paris',
    language: 'French',
    isVerified: true,
    isActive: true,
    hideIdentity: false,
    prices: {
      follow: 3,
      like: 1.5,
      comment: 6,
      repost_story: 4,
      repost: 3.5
    },
    availableServices: ['follow', 'like', 'comment', 'repost_story', 'repost'],
    avgDeliveryTime: 22,
    completedOrders: 678,
    rating: 4.7,
    pk: '852147963'
  },
  {
    id: '8',
    platform: 'x',
    username: '@crypto_expert',
    displayName: 'Crypto Expert FR',
    profileImage: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=300&h=300&fit=crop',
    followers: 195000,
    category: 'Finance',
    country: 'France',
    city: 'Lyon',
    language: 'French',
    isVerified: true,
    isActive: true,
    hideIdentity: false,
    prices: {
      follow: 2.5,
      like: 1,
      comment: 5,
      repost_story: 3,
      repost: 2.5
    },
    availableServices: ['follow', 'like', 'comment', 'repost_story', 'repost'],
    avgDeliveryTime: 26,
    completedOrders: 432,
    rating: 4.6,
    pk: '741963852'
  },
  {
    id: '23',
    platform: 'x',
    username: '@tech_news',
    displayName: 'Tech News FR',
    profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop',
    followers: 340000,
    category: 'Tech',
    country: 'France',
    city: 'Paris',
    language: 'French',
    isVerified: true,
    isActive: true,
    hideIdentity: false,
    prices: {
      follow: 3.5,
      like: 1.75,
      comment: 7,
      repost_story: 5,
      repost: 4
    },
    availableServices: ['follow', 'like', 'comment', 'repost_story', 'repost'],
    avgDeliveryTime: 24,
    completedOrders: 567,
    rating: 4.8,
    pk: '741852963'
  },
  {
    id: '24',
    platform: 'x',
    username: '@sports_updates',
    displayName: 'Sports Updates',
    profileImage: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=300&h=300&fit=crop',
    followers: 290000,
    category: 'Sports',
    country: 'France',
    city: 'Marseille',
    language: 'French',
    isVerified: true,
    isActive: true,
    hideIdentity: false,
    prices: {
      follow: 3,
      like: 1.5,
      comment: 6,
      repost_story: 4,
      repost: 3.5
    },
    availableServices: ['follow', 'like', 'comment', 'repost_story', 'repost'],
    avgDeliveryTime: 28,
    completedOrders: 423,
    rating: 4.7,
    pk: '852369741'
  },

  // Facebook Influencers
  {
    id: '9',
    platform: 'facebook',
    username: '@lifestyle_tips',
    displayName: 'Lifestyle Tips FR',
    profileImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=300&fit=crop',
    followers: 420000,
    category: 'Lifestyle',
    country: 'France',
    city: 'Paris',
    language: 'French',
    isVerified: true,
    isActive: true,
    hideIdentity: false,
    prices: {
      follow: 4,
      like: 2,
      comment: 8,
      repost_story: 6,
      repost: 5
    },
    availableServices: ['follow', 'like', 'comment', 'repost_story', 'repost'],
    avgDeliveryTime: 30,
    completedOrders: 543,
    rating: 4.8,
    pk: '963741852'
  },
  {
    id: '10',
    platform: 'facebook',
    username: '@beauty_guru',
    displayName: 'Beauty Guru FR',
    profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop',
    followers: 310000,
    category: 'Beauty',
    country: 'France',
    city: 'Lyon',
    language: 'French',
    isVerified: true,
    isActive: true,
    hideIdentity: false,
    prices: {
      follow: 3.5,
      like: 1.75,
      comment: 7,
      repost_story: 5,
      repost: 4
    },
    availableServices: ['follow', 'like', 'comment', 'repost_story', 'repost'],
    avgDeliveryTime: 28,
    completedOrders: 421,
    rating: 4.7,
    pk: '852369741'
  },
  {
    id: '25',
    platform: 'facebook',
    username: '@health_wellness',
    displayName: 'Health & Wellness',
    profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop',
    followers: 380000,
    category: 'Health',
    country: 'France',
    city: 'Nice',
    language: 'French',
    isVerified: true,
    isActive: true,
    hideIdentity: false,
    prices: {
      follow: 3.5,
      like: 1.75,
      comment: 7,
      repost_story: 5,
      repost: 4
    },
    availableServices: ['follow', 'like', 'comment', 'repost_story', 'repost'],
    avgDeliveryTime: 32,
    completedOrders: 478,
    rating: 4.8,
    pk: '963147852'
  },
  {
    id: '26',
    platform: 'facebook',
    username: '@food_recipes',
    displayName: 'Food & Recipes',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop',
    followers: 290000,
    category: 'Food',
    country: 'France',
    city: 'Bordeaux',
    language: 'French',
    isVerified: true,
    isActive: true,
    hideIdentity: false,
    prices: {
      follow: 3,
      like: 1.5,
      comment: 6,
      repost_story: 4,
      repost: 3.5
    },
    availableServices: ['follow', 'like', 'comment', 'repost_story', 'repost'],
    avgDeliveryTime: 29,
    completedOrders: 345,
    rating: 4.7,
    pk: '741852963'
  },

  // LinkedIn Influencers
  {
    id: '11',
    platform: 'linkedin',
    username: '@business_coach',
    displayName: 'Business Coach FR',
    profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop',
    followers: 180000,
    category: 'Business',
    country: 'France',
    city: 'Paris',
    language: 'French',
    isVerified: true,
    isActive: true,
    hideIdentity: false,
    prices: {
      follow: 8,
      like: 4,
      comment: 15,
      repost_story: 12,
      repost: 10,
      connect: 8
    },
    availableServices: ['follow', 'like', 'comment', 'repost_story', 'repost', 'connect'],
    avgDeliveryTime: 40,
    completedOrders: 234,
    rating: 4.9,
    pk: '147963852'
  },
  {
    id: '12',
    platform: 'linkedin',
    username: '@startup_mentor',
    displayName: 'Startup Mentor FR',
    profileImage: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=300&h=300&fit=crop',
    followers: 150000,
    category: 'Business',
    country: 'France',
    city: 'Lyon',
    language: 'French',
    isVerified: true,
    isActive: true,
    hideIdentity: false,
    prices: {
      follow: 7,
      like: 3.5,
      comment: 12,
      repost_story: 10,
      repost: 8,
      connect: 7
    },
    availableServices: ['follow', 'like', 'comment', 'repost_story', 'repost', 'connect'],
    avgDeliveryTime: 38,
    completedOrders: 198,
    rating: 4.8,
    pk: '369258147'
  },
  {
    id: '27',
    platform: 'linkedin',
    username: '@marketing_pro',
    displayName: 'Marketing Pro FR',
    profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop',
    followers: 220000,
    category: 'Marketing',
    country: 'France',
    city: 'Paris',
    language: 'French',
    isVerified: true,
    isActive: true,
    hideIdentity: false,
    prices: {
      follow: 8.5,
      like: 4.25,
      comment: 16,
      repost_story: 13,
      repost: 11,
      connect: 8.5
    },
    availableServices: ['follow', 'like', 'comment', 'repost_story', 'repost', 'connect'],
    avgDeliveryTime: 36,
    completedOrders: 312,
    rating: 4.9,
    pk: '258147369'
  },
  {
    id: '28',
    platform: 'linkedin',
    username: '@tech_recruiter',
    displayName: 'Tech Recruiter FR',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
    followers: 165000,
    category: 'Tech',
    country: 'France',
    city: 'Lyon',
    language: 'French',
    isVerified: true,
    isActive: true,
    hideIdentity: false,
    prices: {
      follow: 7.5,
      like: 3.75,
      comment: 14,
      repost_story: 11,
      repost: 9,
      connect: 7.5
    },
    availableServices: ['follow', 'like', 'comment', 'repost_story', 'repost', 'connect'],
    avgDeliveryTime: 34,
    completedOrders: 267,
    rating: 4.8,
    pk: '147258369'
  }
];

// Autres données mock existantes...</content>