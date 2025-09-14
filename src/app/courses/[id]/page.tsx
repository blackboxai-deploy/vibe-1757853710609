"use client";

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { mockCourses } from '@/lib/mockData';
import { DifficultyLevel } from '@/types';

export default function CourseDetailsPage() {
  const params = useParams();
  const courseId = params.id as string;
  
  const course = mockCourses.find(c => c.id === courseId);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [completedLessons] = useState(['lesson-1']); // Mock completed lessons

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Course Not Found</h1>
        <p className="text-gray-600 mb-8">The course you're looking for doesn't exist.</p>
        <Link href="/courses">
          <Button>Browse All Courses</Button>
        </Link>
      </div>
    );
  }

  const completionPercentage = (completedLessons.length / course.lessons.length) * 100;

  const getLevelColor = (level: DifficultyLevel) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-orange-100 text-orange-800';
      case 'expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEnroll = () => {
    setIsEnrolled(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Badge className={getLevelColor(course.level)}>
                  {course.level}
                </Badge>
                <Badge className="bg-blue-700 text-blue-100">
                  {course.category}
                </Badge>
                {course.isPopular && (
                  <Badge className="bg-red-500 text-white">
                    Popular
                  </Badge>
                )}
              </div>
              
              <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl text-blue-100 mb-6">{course.description}</p>
              
              <div className="flex flex-wrap gap-6 text-blue-100">
                <div className="flex items-center space-x-2">
                  <span>👨‍🏫</span>
                  <span>{course.instructor}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>⭐</span>
                  <span>{course.rating}/5</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>👥</span>
                  <span>{course.studentsEnrolled.toLocaleString()} students</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>📚</span>
                  <span>{course.lessonsCount} lessons</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>⏱️</span>
                  <span>{course.duration}</span>
                </div>
              </div>
            </div>
            
            {/* Course Preview Card */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src={course.imageUrl}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                {isEnrolled ? (
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Progress</span>
                        <span className="text-sm text-gray-500">
                          {completedLessons.length}/{course.lessons.length} lessons
                        </span>
                      </div>
                      <Progress value={completionPercentage} className="mb-2" />
                      <p className="text-sm text-gray-500">
                        {Math.round(completionPercentage)}% Complete
                      </p>
                    </div>
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Continue Learning
                    </Button>
                    <Link href={`/courses/${course.id}/lessons`}>
                      <Button variant="outline" className="w-full">
                        View All Lessons
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Button 
                      onClick={handleEnroll}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3"
                    >
                      Enroll Now - Free
                    </Button>
                    <Button variant="outline" className="w-full">
                      Add to Wishlist
                    </Button>
                    <div className="text-center text-sm text-gray-500">
                      Start learning immediately after enrollment
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="instructor">Instructor</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-8">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>What You'll Learn</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {course.skills?.map((skill, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span className="text-gray-700">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Course Description</CardTitle>
                  </CardHeader>
                  <CardContent className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {course.description}
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      This comprehensive course is designed for {course.level} level students who want to 
                      improve their {course.category} skills. Through interactive lessons, practical exercises, 
                      and real-world applications, you'll develop the confidence to use English effectively 
                      in various situations.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Each lesson includes video content, interactive exercises, vocabulary building activities, 
                      and practical assignments to reinforce your learning. You'll also have access to 
                      downloadable resources and progress tracking tools.
                    </p>
                  </CardContent>
                </Card>

                {course.prerequisites && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Prerequisites</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {course.prerequisites.map((prereq, index) => (
                          <li key={index} className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            <span className="text-gray-700">{prereq}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Level</span>
                      <Badge className={getLevelColor(course.level)}>
                        {course.level}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-medium">{course.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lessons</span>
                      <span className="font-medium">{course.lessonsCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Students</span>
                      <span className="font-medium">{course.studentsEnrolled.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rating</span>
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-500">⭐</span>
                        <span className="font-medium">{course.rating}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Certificate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center p-4">
                      <div className="text-4xl mb-3">🏆</div>
                      <p className="text-sm text-gray-600 mb-4">
                        Earn a certificate of completion after finishing all lessons and passing the final assessment.
                      </p>
                      <Badge variant="secondary">
                        Shareable Certificate
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="curriculum" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Course Curriculum</CardTitle>
                <p className="text-gray-600">
                  {course.lessons.length} lessons • {course.duration} total duration
                </p>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  {course.lessons.map((lesson, index) => (
                    <AccordionItem key={lesson.id} value={lesson.id}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center justify-between w-full mr-4">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                              completedLessons.includes(lesson.id) 
                                ? 'bg-green-500 text-white' 
                                : 'bg-gray-200 text-gray-600'
                            }`}>
                              {completedLessons.includes(lesson.id) ? '✓' : index + 1}
                            </div>
                            <div className="text-left">
                              <h4 className="font-medium">{lesson.title}</h4>
                              <p className="text-sm text-gray-500">{lesson.type} • {lesson.duration} min</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {lesson.quiz && (
                              <Badge variant="secondary" className="text-xs">Quiz</Badge>
                            )}
                            <Badge variant="outline" className="text-xs">
                              {lesson.xpReward} XP
                            </Badge>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pl-11 pr-4 pb-4">
                          <p className="text-gray-600 mb-3">{lesson.description}</p>
                          {lesson.content.vocabulary && lesson.content.vocabulary.length > 0 && (
                            <div className="mb-3">
                              <h5 className="font-medium text-sm mb-2">Key Vocabulary:</h5>
                              <div className="flex flex-wrap gap-2">
                                {lesson.content.vocabulary.slice(0, 3).map((vocab, vIndex) => (
                                  <Badge key={vIndex} variant="secondary" className="text-xs">
                                    {vocab.word}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          {isEnrolled ? (
                            <Link href={`/courses/${course.id}/lessons/${lesson.id}`}>
                              <Button size="sm" className="mt-2">
                                {completedLessons.includes(lesson.id) ? 'Review Lesson' : 'Start Lesson'}
                              </Button>
                            </Link>
                          ) : (
                            <p className="text-sm text-gray-500 italic mt-2">
                              Enroll to access this lesson
                            </p>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="instructor" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Meet Your Instructor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {course.instructor.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{course.instructor}</h3>
                    <p className="text-gray-600 mb-4">
                      Certified English instructor with over 10 years of experience in teaching 
                      {course.category} to international students. Specialized in creating engaging, 
                      interactive learning experiences that help students achieve their language goals.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      <div>
                        <div className="font-bold text-2xl text-blue-600">10+</div>
                        <div className="text-sm text-gray-500">Years Experience</div>
                      </div>
                      <div>
                        <div className="font-bold text-2xl text-blue-600">25K+</div>
                        <div className="text-sm text-gray-500">Students Taught</div>
                      </div>
                      <div>
                        <div className="font-bold text-2xl text-blue-600">4.9</div>
                        <div className="text-sm text-gray-500">Average Rating</div>
                      </div>
                      <div>
                        <div className="font-bold text-2xl text-blue-600">50+</div>
                        <div className="text-sm text-gray-500">Courses Created</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-8">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {[1, 2, 3].map((_, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                          {index === 0 ? 'M' : index === 1 ? 'S' : 'A'}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-medium">
                              {index === 0 ? 'Maria García' : index === 1 ? 'Steven Chen' : 'Amira Hassan'}
                            </h4>
                            <div className="flex text-yellow-500">
                              {'⭐'.repeat(5)}
                            </div>
                            <span className="text-sm text-gray-500">2 days ago</span>
                          </div>
                          <p className="text-gray-600">
                            {index === 0 
                              ? "Excellent course! The instructor explains everything very clearly and the exercises are practical. I've improved my English significantly."
                              : index === 1
                              ? "Great structure and content. The lessons are well-organized and easy to follow. Highly recommend for anyone wanting to improve their English."
                              : "Perfect for my level. The course content is engaging and the progress tracking helps me stay motivated. Thank you!"
                            }
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Student Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-6">
                      <div className="text-4xl font-bold text-gray-800 mb-2">{course.rating}</div>
                      <div className="flex justify-center text-yellow-500 text-lg mb-2">
                        {'⭐'.repeat(Math.floor(course.rating))}
                      </div>
                      <p className="text-gray-500">Based on 1,234 reviews</p>
                    </div>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((stars) => (
                        <div key={stars} className="flex items-center space-x-3">
                          <span className="text-sm w-8">{stars}★</span>
                          <Progress 
                            value={stars === 5 ? 78 : stars === 4 ? 15 : stars === 3 ? 5 : stars === 2 ? 1 : 1} 
                            className="flex-1 h-2"
                          />
                          <span className="text-sm text-gray-500 w-8">
                            {stars === 5 ? '78%' : stars === 4 ? '15%' : stars === 3 ? '5%' : '1%'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}