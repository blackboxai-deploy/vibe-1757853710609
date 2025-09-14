"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockCourses } from '@/lib/mockData';
import { DifficultyLevel, CourseCategory } from '@/types';

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory | 'all'>('all');

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    
    return matchesSearch && matchesLevel && matchesCategory;
  });

  const getLevelColor = (level: DifficultyLevel) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-orange-100 text-orange-800';
      case 'expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: CourseCategory) => {
    switch (category) {
      case 'grammar': return '📚';
      case 'vocabulary': return '📝';
      case 'conversation': return '💬';
      case 'pronunciation': return '🗣️';
      case 'business': return '💼';
      case 'academic': return '🎓';
      default: return '📖';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          English Courses
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Choose from our comprehensive collection of English courses designed for all levels. 
          From basic grammar to advanced business communication.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Courses
            </label>
            <Input
              type="text"
              placeholder="Search by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Difficulty Level
            </label>
            <Select value={selectedLevel} onValueChange={(value) => setSelectedLevel(value as DifficultyLevel | 'all')}>
              <SelectTrigger>
                <SelectValue placeholder="All Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
                <SelectItem value="expert">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as CourseCategory | 'all')}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="grammar">Grammar</SelectItem>
                <SelectItem value="vocabulary">Vocabulary</SelectItem>
                <SelectItem value="conversation">Conversation</SelectItem>
                <SelectItem value="pronunciation">Pronunciation</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="academic">Academic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setSelectedLevel('all');
                setSelectedCategory('all');
              }}
              className="w-full"
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-600">
          Showing {filteredCourses.length} of {mockCourses.length} courses
        </p>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Sort by:</span>
          <Select defaultValue="popularity">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">Popularity</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="duration">Duration</SelectItem>
              <SelectItem value="level">Level</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No courses found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search criteria or browse all available courses.
          </p>
          <Button 
            onClick={() => {
              setSearchTerm('');
              setSelectedLevel('all');
              setSelectedCategory('all');
            }}
          >
            Show All Courses
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="relative">
                <img 
                  src={course.imageUrl}
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                  <Badge className={getLevelColor(course.level)}>
                    {course.level}
                  </Badge>
                  {course.isPopular && (
                    <Badge className="bg-red-500 text-white">
                      Popular
                    </Badge>
                  )}
                  {course.isFeatured && (
                    <Badge className="bg-purple-500 text-white">
                      Featured
                    </Badge>
                  )}
                </div>
                <div className="absolute top-3 right-3">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 text-lg">
                    {getCategoryIcon(course.category)}
                  </div>
                </div>
              </div>
              
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl mb-2 line-clamp-2">
                    {course.title}
                  </CardTitle>
                </div>
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
                
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-500">
                  <div>
                    <span className="font-medium">📚 {course.lessonsCount} lessons</span>
                  </div>
                  <div>
                    <span className="font-medium">⏱️ {course.duration}</span>
                  </div>
                  <div>
                    <span className="font-medium">👥 {course.studentsEnrolled.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="font-medium text-green-600">📖 {course.category}</span>
                  </div>
                </div>

                {course.skills && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Skills you'll learn:</p>
                    <div className="flex flex-wrap gap-1">
                      {course.skills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {course.skills.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{course.skills.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <Link href={`/courses/${course.id}`}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      View Course
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full" size="sm">
                    Add to Wishlist
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Load More Section */}
      {filteredCourses.length > 0 && (
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Want to explore more learning options?
          </p>
          <Button variant="outline" size="lg">
            Load More Courses
          </Button>
        </div>
      )}
    </div>
  );
}