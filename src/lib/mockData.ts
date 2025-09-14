import { Course, Lesson, User, Achievement, Quiz } from '@/types';

export const mockUser: User = {
  id: "user-1",
  name: "Anna Kowalska",
  email: "anna.kowalska@example.com",
  level: "student",
  xp: 2450,
  completedCourses: ["course-1"],
  completedLessons: ["lesson-1", "lesson-2", "lesson-3"],
  achievements: [
    {
      id: "ach-1",
      name: "First Steps",
      description: "Completed your first lesson",
      icon: "🎯",
      xpReward: 50,
      unlockedAt: new Date("2024-01-15"),
      category: "completion"
    },
    {
      id: "ach-2", 
      name: "Week Warrior",
      description: "Maintained a 7-day learning streak",
      icon: "🔥",
      xpReward: 100,
      unlockedAt: new Date("2024-01-20"),
      category: "streak"
    }
  ],
  streakDays: 12,
  totalStudyTime: 1840 // minutes
};

export const mockCourses: Course[] = [
  {
    id: "course-1",
    title: "English Grammar Fundamentals",
    description: "Master the essential grammar rules and structures needed for effective English communication. Perfect for beginners and intermediate learners.",
    level: "beginner",
    category: "grammar",
    duration: "6 weeks",
    lessonsCount: 24,
    studentsEnrolled: 15420,
    rating: 4.8,
    imageUrl: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b3bb1c9d-1564-4309-8a6e-66223f8f4d58.png",
    instructor: "Dr. Sarah Johnson",
    isPopular: true,
    isFeatured: true,
    skills: ["Present & Past Tenses", "Question Formation", "Articles & Pronouns", "Modal Verbs"],
    lessons: [
      {
        id: "lesson-1",
        courseId: "course-1",
        title: "Introduction to English Tenses",
        description: "Learn the basics of English tense system and how to use present simple correctly.",
        type: "theory",
        duration: 25,
        order: 1,
        xpReward: 50,
        content: {
          text: "English has 12 main tenses, but today we'll focus on the Present Simple. This tense is used for habits, facts, and permanent situations.",
          vocabulary: [
            {
              word: "tense",
              pronunciation: "/tens/",
              definition: "A grammatical category that expresses time relationships",
              example: "The present tense describes actions happening now."
            }
          ]
        }
      },
      {
        id: "lesson-2", 
        courseId: "course-1",
        title: "Present Simple Practice",
        description: "Practice using present simple with exercises and real-world examples.",
        type: "practice",
        duration: 30,
        order: 2,
        xpReward: 75,
        content: {
          text: "Let's practice the Present Simple with various exercises.",
          exercises: [
            {
              id: "ex-1",
              type: "multiple-choice",
              question: "She _____ to work every day.",
              options: ["go", "goes", "going", "gone"],
              correctAnswer: "goes",
              explanation: "With third person singular (he/she/it), we add -s to the verb.",
              points: 10
            }
          ]
        }
      }
    ]
  },
  {
    id: "course-2",
    title: "Business English Essentials", 
    description: "Professional English skills for workplace communication, presentations, and business meetings.",
    level: "intermediate",
    category: "business",
    duration: "8 weeks",
    lessonsCount: 32,
    studentsEnrolled: 8930,
    rating: 4.7,
    imageUrl: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/fdde9c53-0d8c-488f-b882-1e694d202166.png",
    instructor: "Michael Thompson",
    isPopular: true,
    skills: ["Email Writing", "Presentation Skills", "Meeting Language", "Negotiation"],
    lessons: [
      {
        id: "lesson-3",
        courseId: "course-2", 
        title: "Professional Email Writing",
        description: "Master the art of writing clear, professional emails in English.",
        type: "writing",
        duration: 35,
        order: 1,
        xpReward: 60,
        content: {
          text: "Professional emails require specific structure and tone. Let's learn the key components.",
          vocabulary: [
            {
              word: "regards",
              pronunciation: "/rɪˈɡɑːdz/",
              definition: "A polite expression used in ending letters or emails",
              example: "Best regards, John Smith"
            }
          ]
        }
      }
    ]
  },
  {
    id: "course-3",
    title: "Advanced Conversation Skills",
    description: "Develop fluent, natural conversation abilities with native-like expressions and idioms.",
    level: "advanced",
    category: "conversation", 
    duration: "10 weeks",
    lessonsCount: 40,
    studentsEnrolled: 5670,
    rating: 4.9,
    imageUrl: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1b99baf4-fc7d-40cc-8c8f-d41097d2f290.png",
    instructor: "Emma Wilson",
    isFeatured: true,
    skills: ["Idioms & Phrases", "Debate Skills", "Storytelling", "Cultural Communication"],
    lessons: [
      {
        id: "lesson-4",
        courseId: "course-3",
        title: "Mastering English Idioms",
        description: "Learn common English idioms and how to use them naturally in conversation.",
        type: "conversation",
        duration: 40,
        order: 1, 
        xpReward: 80,
        content: {
          text: "Idioms are expressions whose meaning cannot be understood from the individual words. They're essential for natural English.",
          vocabulary: [
            {
              word: "break the ice",
              pronunciation: "/breɪk ði aɪs/",
              definition: "To initiate conversation in a social setting",
              example: "She told a joke to break the ice at the party."
            }
          ]
        }
      }
    ]
  },
  {
    id: "course-4",
    title: "English Pronunciation Mastery",
    description: "Perfect your English pronunciation with phonetics, stress patterns, and accent reduction techniques.",
    level: "intermediate",
    category: "pronunciation",
    duration: "5 weeks", 
    lessonsCount: 20,
    studentsEnrolled: 12100,
    rating: 4.6,
    imageUrl: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/87be5bbf-f24e-40c9-88f7-604260fcfdaa.png",
    instructor: "Dr. Robert Chen",
    skills: ["Phonetics", "Word Stress", "Intonation", "Accent Reduction"],
    lessons: [
      {
        id: "lesson-5",
        courseId: "course-4",
        title: "English Phonetics Basics",
        description: "Understanding the International Phonetic Alphabet and English sounds.",
        type: "listening",
        duration: 30,
        order: 1,
        xpReward: 55,
        content: {
          text: "The International Phonetic Alphabet (IPA) helps us understand exact pronunciation of English sounds.",
          vocabulary: [
            {
              word: "phoneme",
              pronunciation: "/ˈfoʊniːm/",
              definition: "The smallest unit of sound in a language",
              example: "The word 'cat' has three phonemes: /k/, /æ/, /t/."
            }
          ]
        }
      }
    ]
  },
  {
    id: "course-5",
    title: "Academic English Writing",
    description: "Master academic writing skills for essays, research papers, and formal presentations.",
    level: "advanced",
    category: "academic", 
    duration: "12 weeks",
    lessonsCount: 48,
    studentsEnrolled: 3420,
    rating: 4.8,
    imageUrl: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/5ae82326-7ee1-4c8b-badb-3cfc87473023.png",
    instructor: "Prof. Jane Miller",
    skills: ["Essay Structure", "Research Writing", "Citations", "Critical Analysis"],
    lessons: [
      {
        id: "lesson-6",
        courseId: "course-5",
        title: "Academic Essay Structure",
        description: "Learn the fundamental structure of academic essays and thesis statements.",
        type: "writing",
        duration: 45,
        order: 1,
        xpReward: 70,
        content: {
          text: "Academic essays follow a specific structure: introduction with thesis, body paragraphs with evidence, and conclusion.",
          vocabulary: [
            {
              word: "thesis statement",
              pronunciation: "/ˈθiːsɪs ˈsteɪtmənt/",
              definition: "The main argument or claim of an essay",
              example: "A strong thesis statement clearly presents your main argument."
            }
          ]
        }
      }
    ]
  }
];

export const mockQuizzes: Quiz[] = [
  {
    id: "quiz-1",
    lessonId: "lesson-1",
    title: "Present Simple Tense Quiz",
    timeLimit: 15,
    passingScore: 70,
    attempts: 3,
    questions: [
      {
        id: "q-1",
        type: "multiple-choice",
        question: "Which sentence uses the present simple correctly?",
        options: [
          "She go to school every day",
          "She goes to school every day", 
          "She going to school every day",
          "She is go to school every day"
        ],
        correctAnswer: "She goes to school every day",
        explanation: "In present simple, third person singular takes -s ending.",
        points: 10
      },
      {
        id: "q-2",
        type: "fill-in-blank",
        question: "I _____ coffee every morning.",
        correctAnswer: "drink",
        explanation: "First person singular uses the base form of the verb.",
        points: 10
      }
    ]
  }
];