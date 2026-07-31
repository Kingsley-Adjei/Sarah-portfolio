export interface WorkItem {
  id: string;
  title: string;
  category: 'directing' | 'writing' | 'acting' | 'production' | 'behind-the-scenes';
  role: string;
  year: string;
  description: string;
  imageSrc: string;
  featured?: boolean;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  colorBg?: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}
