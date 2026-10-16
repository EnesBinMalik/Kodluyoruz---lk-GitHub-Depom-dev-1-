export interface ProjectFile {
  name: string;
  path: string;
  content: string;
  language: 'markdown' | 'html' | 'text' | 'gitignore';
  size: string;
  lastCommitMessage: string;
  lastCommitTime: string;
}

export interface GitCommit {
  hash: string;
  message: string;
  author: string;
  email: string;
  date: string;
  filesChanged: number;
}

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  category: 'github' | 'local' | 'fork';
}

export interface SubmissionDetails {
  projectName: string;
  projectUrl: string;
  projectDescription: string;
  isPublic: boolean;
  githubUsername: string;
  studentName: string;
  studentEmail: string;
}
