"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { mockCourses } from '@/lib/mockData';

export default function HomePage() {
  const featuredCourses = mockCourses.filter(course => course.isFeatured);
  const popularCourses = mockCourses.filter(course => course.isPopular);

  const stats = [
    { label: "Active Students", value: "50,000+", description: "Learning worldwide" },
    { label: "Courses Available", value: "200+", description: "Expert-designed content" },
    { label: "Success Rate", value: "94%", description: "Student satisfaction" },
    { label: "Languages Supported", value: "15+", description: "Native instructors" }
  ];

  const features = [
    {
      title: "Interactive Lessons",
      description: "Engaging content with audio, video, and interactive exercises",
      icon: "🎯"
    },
    {
      title: "Progress Tracking", 
      description: "Monitor your learning journey with detailed analytics",
      icon: "📊"
    },
    {
      title: "Expert Instructors",
      description: "Learn from certified teachers and native speakers",
      icon: "👨‍🏫"
    },
    {
      title: "Flexible Learning",
      description: "Study at your own pace, anywhere, anytime",
      icon: "⏰"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Master English with
                <span className="block text-yellow-300">Interactive Learning</span>
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-blue-100">
                Join thousands of students improving their English skills through our 
                comprehensive courses, interactive exercises, and expert guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8">
                  Start Free Trial
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-800">
                  Browse Courses
                </Button>
              </div>
              <div className="flex items-center space-x-6 text-blue-100">
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-300">⭐⭐⭐⭐⭐</span>
                  <span>4.8/5 Rating</span>
                </div>
                <div>50,000+ Happy Students</div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <img 
                  src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/bdf6edf5-613b-4ab2-8ca7-a41fdb674bdf.png" 
                  alt="English Learning Platform Dashboard Interface"
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <div className="text-white">
                  <h3 className="font-semibold mb-2">Quick Start: Grammar Basics</h3>
                  <Progress value={65} className="mb-2" />
                  <p className="text-sm text-blue-100">65% Complete • 12 lessons remaining</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="font-semibold text-gray-800 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-500">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Featured Courses
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Start your English learning journey with our most popular and effective courses
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  <img 
                    src={course.imageUrl}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge 
                    className="absolute top-3 left-3 bg-yellow-500 text-black font-medium"
                  >
                    {course.level}
                  </Badge>
                  {course.isPopular && (
                    <Badge 
                      className="absolute top-3 right-3 bg-red-500 text-white"
                    >
                      Popular
                    </Badge>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="text-xl mb-2">{course.title}</CardTitle>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{course.instructor}</span>
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-500">⭐</span>
                      <span>{course.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500">{course.lessonsCount} lessons</span>
                    <span className="text-sm text-gray-500">{course.duration}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.skills?.slice(0, 2).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Start Course
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/courses">
              <Button variant="outline" size="lg" className="px-8">
                View All Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Why Choose EnglishMaster?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the most effective way to learn English with our innovative platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Start Your English Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have improved their English skills with our platform. 
            Start your free trial today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-800">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">E</span>
                </div>
                <span className="font-bold text-xl">EnglishMaster</span>
              </div>
              <p className="text-gray-300">
                Empowering learners worldwide to master English through innovative, interactive learning experiences.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Courses</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/courses" className="hover:text-white">Grammar</Link></li>
                <li><Link href="/courses" className="hover:text-white">Vocabulary</Link></li>
                <li><Link href="/courses" className="hover:text-white">Conversation</Link></li>
                <li><Link href="/courses" className="hover:text-white">Business English</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
                <li><Link href="/progress" className="hover:text-white">Progress</Link></li>
                <li><Link href="#" className="hover:text-white">Study Tips</Link></li>
                <li><Link href="#" className="hover:text-white">Community</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="#" className="hover:text-white">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white">Contact Us</Link></li>
                <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 EnglishMaster. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}