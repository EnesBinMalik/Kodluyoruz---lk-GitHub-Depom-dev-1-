export type Page = 'home' | 'about' | 'blog' | 'blog-detail';

export interface Project {
  id: string;
  title: string;
  category: 'web' | 'mobile' | 'system' | 'opensource';
  categoryLabel: string;
  year: string;
  summary: string;
  description: string;
  imageUrl: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  features: string[];
  demoUrl?: string;
  githubUrl?: string;
  highlights: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  coverImage: string;
  featured?: boolean;
  content: {
    intro: string;
    sections: {
      heading: string;
      text: string;
      codeSnippet?: {
        language: string;
        code: string;
      };
      quote?: string;
    }[];
    conclusion: string;
  };
  tags: string[];
  likesCount: number;
}

export interface BlogComment {
  id: string;
  postId: string;
  author: string;
  date: string;
  content: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  items: {
    name: string;
    level: number; // percentage
    experience: string;
  }[];
}
