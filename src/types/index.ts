export interface User {
  id: string;
  name: string;
  email: string;
  level: UserLevel;
  xp: number;
  completedCourses: string[];
  completedLessons: string[];
  achievements: Achievement[];
  streakDays: number;
  totalStudyTime: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  level: DifficultyLevel;
  category: CourseCategory;
  duration: string;
  lessonsCount: number;
  studentsEnrolled: number;
  rating: number;
  imageUrl: string;
  instructor: string;
  lessons: Lesson[];
  prerequisites?: string[];
  skills: string[];
  isPopular?: boolean;
  isFeatured?: boolean;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  type: LessonType;
  duration: number; // in minutes
  content: LessonContent;
  quiz?: Quiz;
  order: number;
  isCompleted?: boolean;
  xpReward: number;
}

export interface LessonContent {
  text?: string;
  audio?: string;
  video?: string;
  images?: string[];
  vocabulary?: VocabularyItem[];
  exercises?: Exercise[];
}

export interface VocabularyItem {
  word: string;
  pronunciation: string;
  definition: string;
  example: string;
  audioUrl?: string;
}

export interface Exercise {
  id: string;
  type: ExerciseType;
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  points: number;
}

export interface Quiz {
  id: string;
  lessonId: string;
  title: string;
  questions: QuizQuestion[];
  timeLimit?: number; // in minutes
  passingScore: number; // percentage
  attempts: number;
}

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  points: number;
  audioUrl?: string;
  imageUrl?: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  xpReward: number;
  unlockedAt: Date;
  category: AchievementCategory;
}

export interface UserProgress {
  courseId: string;
  completedLessons: number;
  totalLessons: number;
  averageScore: number;
  timeSpent: number;
  lastAccessed: Date;
}

export interface LearningStats {
  totalXP: number;
  totalLessonsCompleted: number;
  totalQuizzesCompleted: number;
  averageQuizScore: number;
  currentStreak: number;
  longestStreak: number;
  totalStudyTime: number;
  weeklyProgress: DailyProgress[];
}

export interface DailyProgress {
  date: string;
  lessonsCompleted: number;
  xpEarned: number;
  timeSpent: number;
}

// Enums
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export type UserLevel = 'newbie' | 'learner' | 'student' | 'scholar' | 'expert' | 'master';

export type CourseCategory = 'grammar' | 'vocabulary' | 'conversation' | 'pronunciation' | 'business' | 'academic';

export type LessonType = 'theory' | 'practice' | 'conversation' | 'listening' | 'reading' | 'writing';

export type ExerciseType = 'multiple-choice' | 'fill-in-blank' | 'true-false' | 'matching' | 'ordering' | 'audio-recognition';

export type QuestionType = 'multiple-choice' | 'fill-in-blank' | 'true-false' | 'matching' | 'audio-choice' | 'image-choice';

export type AchievementCategory = 'completion' | 'streak' | 'score' | 'time' | 'special';