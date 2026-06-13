/**
 * Anambra State ICT Agency Premium Platform - TypeScript Type Definitions
 */

export interface Project {
  id: string;
  title: string;
  category: 'Digital Infrastructure' | 'Connectivity Infrastructure' | 'Government Communications' | 'Digital Governance' | 'Citizen Engagement' | 'Health Technology' | 'Health Infrastructure' | 'Digital Health' | 'Digital Identity' | 'Artificial Intelligence' | 'Digital Enablement' | 'Recognition & Awards';
  description: string;
  highlights: string[];
  image: string;
}

export interface NewsItem {
  id: string;
  title: string;
  category: 'Press Release' | 'Announcement' | 'Innovation Story' | 'Media';
  summary: string;
  content: string;
  date: string;
  author: string;
  image: string;
}

export interface SOPDocument {
  id: string;
  title: string;
  category: 'Digital Security' | 'Government Standards' | 'Infrastructure Guide' | 'Administrative Procedure';
  fileUrl: string;
  fileSize: string;
  version: string;
  lastUpdated: string;
  content?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Events' | 'Infrastructure' | 'Ecosystem' | 'Awards';
  imageUrl: string;
  videoUrl?: string;
  mediaType?: 'image' | 'video';
  description: string;
  date: string;
}

export interface AwardItem {
  id: string;
  year: string;
  location: string;
  title: string;
  recognitionDetails: string[];
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: string;
}

export interface SystemStats {
  projectsCount: number;
  newsCount: number;
  sopsCount: number;
  galleryCount: number;
  unreadContactsCount: number;
  analyticsHistory: {
    label: string;
    servicesAccessed: number;
    userQueries: number;
  }[];
  subscribersCount?: number;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
}

