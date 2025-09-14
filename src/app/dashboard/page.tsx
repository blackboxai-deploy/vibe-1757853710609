"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockUser, mockCourses } from '@/lib/mockData';

export default function DashboardPage() {
  const [user] = useState(mockUser);
  
  // Mock data for current courses
  const enrolledCourses = mockCourses.filter(course => 
    user.completedCourses.includes(course.id) || course.id === 'course-2'
  );

  const recentActivity = [
    {
      id: 1,
      type: 'lesson_completed',
      title: 'Completed: Present Simple Practice',
      course: 'English Grammar Fundamentals',
      time: '2 hours ago',
      xp: 75,
      icon: '✅'
    },
    {
      id: 2,
      type: 'quiz_passed',
      title: 'Quiz Passed: Present Tense Quiz',
      course: 'English Grammar Fundamentals',
      time: '3 hours ago',
      xp: 100,
      score: 85,
      icon: '🎯'
    },
    {
      id: 3,
      type: 'achievement',
      title: 'Achievement Unlocked: Week Warrior',
      description: '7-day learning streak',
      time: '1 day ago',
      xp: 100,
      icon: '🏆'
    },
    {
      id: 4,
      type: 'course_started',
      title: 'Started: Business English Essentials',
      course: 'Business English Essentials',
      time: '2 days ago',
      icon: '🚀'
    }
  ];

  const learningStats = {
    totalXP: user.xp,
    lessonsCompleted: user.completedLessons.length,
    coursesCompleted: user.completedCourses.length,
    currentStreak: user.streakDays,
    totalStudyTime: Math.floor(user.totalStudyTime / 60), // convert to hours
    averageScore: 87,
    weeklyGoal: 5,
    weeklyProgress: 3
  };

  const upcomingLessons = [
    {
      id: 'lesson-3',
      title: 'Professional Email Writing',
      course: 'Business English Essentials',
      duration: 35,
      difficulty: 'intermediate'
    },
    {
      id: 'lesson-4',
      title: 'Present Continuous Tense',
      course: 'English Grammar Fundamentals', 
      duration: 25,
      difficulty: 'beginner'
    },
    {
      id: 'lesson-5',
      title: 'Common Business Phrases',
      course: 'Business English Essentials',
      duration: 30,
      difficulty: 'intermediate'
    }
  ];

  const getUserLevelInfo = (xp: number) => {
    if (xp < 500) return { level: 'Newbie', next: 500, progress: (xp / 500) * 100 };
    if (xp < 1500) return { level: 'Learner', next: 1500, progress: ((xp - 500) / 1000) * 100 };
    if (xp < 3000) return { level: 'Student', next: 3000, progress: ((xp - 1500) / 1500) * 100 };
    if (xp < 5000) return { level: 'Scholar', next: 5000, progress: ((xp - 3000) / 2000) * 100 };
    return { level: 'Expert', next: 10000, progress: ((xp - 5000) / 5000) * 100 };
  };

  const levelInfo = getUserLevelInfo(user.xp);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome back, {user.name.split(' ')[0]}! 👋
            </h1>
            <p className="text-gray-600 mt-2">
              Ready to continue your English learning journey?
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{user.streakDays}</div>
              <div className="text-sm text-gray-500">Day Streak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{user.xp}</div>
              <div className="text-sm text-gray-500">Total XP</div>
            </div>
            <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2">
              {levelInfo.level}
            </Badge>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Stats */}
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {learningStats.lessonsCompleted}
                    </div>
                    <div className="text-sm text-gray-500">Lessons Completed</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {learningStats.totalStudyTime}h
                    </div>
                    <div className="text-sm text-gray-500">Study Time</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      {learningStats.averageScore}%
                    </div>
                    <div className="text-sm text-gray-500">Average Score</div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="text-2xl">{activity.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">{activity.title}</h4>
                          {activity.course && (
                            <p className="text-sm text-gray-600">{activity.course}</p>
                          )}
                          {activity.description && (
                            <p className="text-sm text-gray-600">{activity.description}</p>
                          )}
                          <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                        </div>
                        <div className="text-right">
                          {activity.xp && (
                            <div className="text-sm font-medium text-blue-600">+{activity.xp} XP</div>
                          )}
                          {activity.score && (
                            <div className="text-sm text-gray-500">{activity.score}%</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Continue Learning */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Continue Learning</CardTitle>
                    <Link href="/courses">
                      <Button variant="outline" size="sm">View All</Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {enrolledCourses.slice(0, 2).map((course) => {
                      const progress = course.id === 'course-1' ? 65 : 25;
                      return (
                        <div key={course.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:shadow-sm transition-shadow">
                          <img 
                            src={course.imageUrl}
                            alt={course.title}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800 mb-1">{course.title}</h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                              <span>{course.instructor}</span>
                              <Badge variant="secondary" className="text-xs">
                                {course.level}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Progress value={progress} className="flex-1" />
                              <span className="text-sm text-gray-500">{progress}%</span>
                            </div>
                          </div>
                          <Link href={`/courses/${course.id}`}>
                            <Button size="sm">Continue</Button>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Level Progress */}
              <Card>
                <CardHeader>
                  <CardTitle>Level Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-3 mx-auto">
                      {levelInfo.level.charAt(0)}
                    </div>
                    <h3 className="font-semibold text-lg">{levelInfo.level}</h3>
                    <p className="text-sm text-gray-500">{user.xp} / {levelInfo.next} XP</p>
                  </div>
                  <Progress value={levelInfo.progress} className="mb-2" />
                  <p className="text-sm text-gray-500 text-center">
                    {levelInfo.next - user.xp} XP to next level
                  </p>
                </CardContent>
              </Card>

              {/* Weekly Goal */}
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Goal</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-green-600">
                      {learningStats.weeklyProgress}/{learningStats.weeklyGoal}
                    </div>
                    <p className="text-sm text-gray-500">Lessons this week</p>
                  </div>
                  <Progress 
                    value={(learningStats.weeklyProgress / learningStats.weeklyGoal) * 100} 
                    className="mb-3" 
                  />
                  <p className="text-sm text-gray-600 text-center">
                    {learningStats.weeklyGoal - learningStats.weeklyProgress} lessons to go!
                  </p>
                </CardContent>
              </Card>

              {/* Upcoming Lessons */}
              <Card>
                <CardHeader>
                  <CardTitle>Up Next</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingLessons.slice(0, 3).map((lesson) => (
                      <div key={lesson.id} className="p-3 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-sm text-gray-800 mb-1">
                          {lesson.title}
                        </h4>
                        <p className="text-xs text-gray-500 mb-2">{lesson.course}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{lesson.duration} min</span>
                          <Badge variant="outline" className="text-xs">
                            {lesson.difficulty}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    View Study Plan
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="courses" className="mt-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">My Courses</h2>
              <Link href="/courses">
                <Button variant="outline">Browse More Courses</Button>
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {enrolledCourses.map((course) => {
                const progress = course.id === 'course-1' ? 65 : 25;
                const lessonsCompleted = course.id === 'course-1' ? 16 : 8;
                
                return (
                  <Card key={course.id} className="hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img 
                        src={course.imageUrl}
                        alt={course.title}
                        className="w-full h-40 object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-3 right-3 bg-blue-600 text-white">
                        {progress}% Complete
                      </Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{course.instructor}</span>
                        <Badge variant="secondary" className="text-xs">
                          {course.level}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">Progress</span>
                            <span className="text-sm text-gray-500">
                              {lessonsCompleted}/{course.lessonsCount} lessons
                            </span>
                          </div>
                          <Progress value={progress} />
                        </div>
                        <div className="flex space-x-2">
                          <Link href={`/courses/${course.id}`} className="flex-1">
                            <Button className="w-full">Continue Learning</Button>
                          </Link>
                          <Button variant="outline" size="icon">
                            📊
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="progress" className="mt-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total XP Earned</span>
                        <span className="font-bold text-blue-600">{learningStats.totalXP}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Lessons Completed</span>
                        <span className="font-bold text-green-600">{learningStats.lessonsCompleted}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Courses Completed</span>
                        <span className="font-bold text-purple-600">{learningStats.coursesCompleted}</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Current Streak</span>
                        <span className="font-bold text-orange-600">{learningStats.currentStreak} days</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Study Time</span>
                        <span className="font-bold text-indigo-600">{learningStats.totalStudyTime} hours</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Average Score</span>
                        <span className="font-bold text-red-600">{learningStats.averageScore}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Weekly Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500">
                    <div className="text-4xl mb-4">📊</div>
                    <p>Activity chart would be displayed here</p>
                    <p className="text-sm">Shows daily learning progress and streaks</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Skill Levels</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { skill: 'Grammar', level: 78 },
                    { skill: 'Vocabulary', level: 65 },
                    { skill: 'Pronunciation', level: 45 },
                    { skill: 'Conversation', level: 52 },
                    { skill: 'Listening', level: 71 },
                    { skill: 'Writing', level: 58 }
                  ].map((item) => (
                    <div key={item.skill}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">{item.skill}</span>
                        <span className="text-sm text-gray-500">{item.level}%</span>
                      </div>
                      <Progress value={item.level} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Study Streak</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-4xl font-bold text-orange-600 mb-2">
                    🔥 {user.streakDays}
                  </div>
                  <p className="text-gray-600 mb-4">Day streak</p>
                  <p className="text-sm text-gray-500">
                    Keep it up! Learning consistently helps you retain information better.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="mt-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Achievements</h2>
              <p className="text-gray-600">Celebrate your learning milestones and unlock new badges!</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {user.achievements.map((achievement) => (
                <Card key={achievement.id} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="text-4xl mb-3">{achievement.icon}</div>
                    <h3 className="font-bold text-lg mb-2">{achievement.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{achievement.description}</p>
                    <Badge className="bg-yellow-100 text-yellow-800">
                      +{achievement.xpReward} XP
                    </Badge>
                    <p className="text-xs text-gray-500 mt-2">
                      Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              ))}

              {/* Locked Achievements */}
              {[
                { name: 'Speed Learner', description: 'Complete 10 lessons in one day', icon: '⚡', xp: 150 },
                { name: 'Perfect Score', description: 'Get 100% on 5 quizzes', icon: '💯', xp: 200 },
                { name: 'Course Master', description: 'Complete 5 courses', icon: '🎓', xp: 300 },
              ].map((achievement, index) => (
                <Card key={index} className="text-center opacity-60 hover:opacity-80 transition-opacity">
                  <CardContent className="pt-6">
                    <div className="text-4xl mb-3 grayscale">{achievement.icon}</div>
                    <h3 className="font-bold text-lg mb-2 text-gray-500">{achievement.name}</h3>
                    <p className="text-gray-400 text-sm mb-3">{achievement.description}</p>
                    <Badge variant="secondary" className="opacity-50">
                      +{achievement.xp} XP
                    </Badge>
                    <p className="text-xs text-gray-400 mt-2">🔒 Locked</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}