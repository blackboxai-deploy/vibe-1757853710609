"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/courses', label: 'Courses' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/progress', label: 'Progress' }
  ];

  const userLevel = "Student";
  const userXP = 2450;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="font-bold text-xl text-gray-900">EnglishMaster</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* User Info & Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {userLevel}
              </Badge>
              <span className="text-sm font-medium text-gray-600">
                {userXP} XP
              </span>
            </div>
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              Start Learning
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-6 mt-6">
                {/* User Info */}
                <div className="flex items-center space-x-3 pb-4 border-b">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                    <span className="text-white font-bold">A</span>
                  </div>
                  <div>
                    <div className="font-medium">Anna Kowalska</div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                        {userLevel}
                      </Badge>
                      <span>{userXP} XP</span>
                    </div>
                  </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-gray-600 hover:text-blue-600 transition-colors font-medium py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                {/* Action Buttons */}
                <div className="flex flex-col space-y-3 pt-4 border-t">
                  <Button variant="outline" onClick={() => setIsOpen(false)}>
                    Sign In
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsOpen(false)}>
                    Start Learning
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}