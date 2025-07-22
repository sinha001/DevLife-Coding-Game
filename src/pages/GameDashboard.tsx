'use client';

import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Progress } from "../components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import {
  Code,
  Home,
  ShoppingCart,
  Trophy,
  MapPin,
  Coins,
  Calendar,
  Coffee,
  Car,
  Gamepad2,
  Laptop,
  Heart,
  Zap,
  LogOut,
  Play,
  HeadphoneOff,
} from "lucide-react"

import type { Challenge, ShopItem } from "../lib/auth"

export default function GameDashboard() {

  const navigate = useNavigate();
  const { currentUser, logout, updateUser } = useAuth();
  const [dailyChallenges, setDailyChallenges] = useState<Challenge[]>([]);
  const [shopItems, setShopItems] = useState<ShopItem[]>([]);

  useEffect(() => {
    loadGameData()
  }, [])

  const loadGameData = () => {
    // Mock daily challenges
    const mockChallenges: Challenge[] = [
      {
        id: "1",
        title: "Array Sum Challenge",
        difficulty: "Beginner",
        points: 50,
        description: "Find the sum of all elements in an array",
        problemStatement: "Given an array of integers, return the sum of all elements.",
        testCases: [],
        category: "Arrays",
        createdBy: "admin",
        createdAt: new Date(),
        isActive: true,
      },
      {
        id: "2",
        title: "String Palindrome",
        difficulty: "Beginner",
        points: 50,
        description: "Check if a string is a palindrome",
        problemStatement: "Check if a string reads the same forwards and backwards.",
        testCases: [],
        category: "Strings",
        createdBy: "admin",
        createdAt: new Date(),
        isActive: true,
      },
      {
        id: "3",
        title: "Binary Tree Traversal",
        difficulty: "Intermediate",
        points: 100,
        description: "Implement inorder traversal of binary tree",
        problemStatement: "Given a binary tree, return the inorder traversal.",
        testCases: [],
        category: "Trees",
        createdBy: "admin",
        createdAt: new Date(),
        isActive: true,
      },
      {
        id: "4",
        title: "Two Sum Problem",
        difficulty: "Intermediate",
        points: 100,
        description: "Find two numbers that add up to target",
        problemStatement: "Find two numbers in array that sum to target.",
        testCases: [],
        category: "Hash Maps",
        createdBy: "admin",
        createdAt: new Date(),
        isActive: true,
      },
      {
        id: "5",
        title: "Dynamic Programming",
        difficulty: "Advanced",
        points: 200,
        description: "Solve the coin change problem",
        problemStatement: "Find minimum coins needed to make change.",
        testCases: [],
        category: "DP",
        createdBy: "admin",
        createdAt: new Date(),
        isActive: true,
      },
    ]

    const mockShopItems: ShopItem[] = [
      {
        id: "coffee-snacks",
        name: "Coffee & Snacks",
        price: 50,
        category: "food",
        description: "Essential fuel for coding sessions",
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "studio-apartment",
        name: "Studio Apartment",
        price: 500,
        category: "housing",
        description: "Your first place in Tech City",
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "gaming-setup",
        name: "Gaming Setup",
        price: 300,
        category: "lifestyle",
        description: "Unwind after coding sessions",
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "macbook-pro",
        name: "MacBook Pro",
        price: 800,
        category: "tech",
        description: "Upgrade your development setup",
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "electric-scooter",
        name: "Electric Scooter",
        price: 200,
        category: "transport",
        description: "Navigate the city efficiently",
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "premium-headphones",
        name: "Premium Headphones",
        price: 150,
        category: "tech",
        description: "Focus with noise cancellation",
        image: "/placeholder.svg?height=100&width=100",
      },
    ]

    setDailyChallenges(mockChallenges)
    setShopItems(mockShopItems)
  }

  const startChallenge = (challengeId: string) => {
    navigate(`/game/code/${challengeId}`)
  }

  const buyItem = (itemId: string) => {
    const item = shopItems.find((i) => i.id === itemId)
    if (item && currentUser && currentUser.stats.currentPoints >= item.price) {
      const updatedUser = {
        ...currentUser,
        stats: {
          ...currentUser.stats,
          currentPoints: currentUser.stats.currentPoints - item.price,
        },
        inventory: [...currentUser.inventory, itemId],
      }
      updateUser(updatedUser)
    }
  }

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-500"
      case "Intermediate":
        return "bg-yellow-500"
      case "Advanced":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "food":
        return Coffee
      case "housing":
        return Home;
      case "transport":
        return Car
      case "tech":
        return Laptop
      case "lifestyle":
        return Gamepad2
      default:
        return ShoppingCart
    }
  }

  if (!currentUser) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16 border-4 border-yellow-400">
                <AvatarImage src="/placeholder.svg?height=64&width=64" />
                <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl font-bold">
                  {currentUser.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-white">{currentUser.name}</h1>
                <div className="flex items-center space-x-4 text-white/80">
                  <span className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {currentUser.stats.location}
                  </span>
                  <span className="flex items-center">
                    <Trophy className="h-4 w-4 mr-1" />
                    Level {currentUser.stats.level}
                  </span>
                </div>
              </div>
            </div>


            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="flex items-center text-yellow-400 text-2xl font-bold">
                  <Coins className="h-6 w-6 mr-2" />
                  {currentUser.stats.currentPoints}
                </div>
                <p className="text-white/60 text-sm">Dev Coins</p>
              </div>
              <div className="text-center">
                <div className="flex items-center text-orange-400 text-2xl font-bold">
                  <Zap className="h-6 w-6 mr-2" />
                  {currentUser.stats.streak}
                </div>
                <p className="text-white/60 text-sm">Day Streak</p>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="challenges" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-md border border-white/20">
            <TabsTrigger value="challenges" className="data-[state=active]:bg-white/20">
              <Code className="h-4 w-4 mr-2" />
              Daily Challenges
            </TabsTrigger>
            <TabsTrigger value="shop" className="data-[state=active]:bg-white/20">
              <Code className="h-4 w-4 mr-2" />
              Life Shop
            </TabsTrigger>
            <TabsTrigger value="progress" className="data-[state=active]:bg-white/20">
              <Code className="h-4 w-4 mr-2" />
              Progress
            </TabsTrigger>
            <TabsTrigger value="inventory" className="data-[state=active]:bg-white/20">
              <Code className="h-4 w-4 mr-2" />
              My Life
            </TabsTrigger>
          </TabsList>

          {/* Daily Challenges */}
          <TabsContent value="challenges" className="space-y-4">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Calendar className="h-5 w-5 mr-2" /> Today&apos;s Coding Challenges
                </CardTitle>
                <CardDescription className="text-white/70">
                  Complete challenges to earn Dev coins and build your virtual life!
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="grid gap-4 md:grids-cols-2 lg:grid-cols-3">
              {dailyChallenges.map((challenge) => (
                <Card key={challenge.id} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge className={`${getDifficultyColor(challenge.difficulty)} text-white`}>{challenge.difficulty}</Badge>
                      <div className="flex items-center text-yellow-400 font-bold">
                        <Coins className="h-4 w-4 mr-1" />
                        {challenge.points}
                      </div>
                    </div>
                    <CardTitle className="text-white text-lg">
                      {challenge.title}
                    </CardTitle>
                    <CardDescription className="text-white/70">
                      {challenge.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-white border-white">
                        {challenge.category}
                      </Badge>
                      <Button onClick={() => startChallenge(challenge.id)} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                        <Play className="h-4 w-4 mr-2" />
                        Start Coding
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Life Shop */}
          <TabsContent value="shop" className="space-y-4">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <ShoppingCart className="h-5 w-5 mr-2" /> Life Marketplace
                </CardTitle>
                <CardDescription className="text-white/70">
                  Spend your Dev coins to build your dream developer life!
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="grid gap-4 md:grids-cols-2 lg:grid-cols-3">
              {shopItems.map((item) => {
                const IconComponent = getCategoryIcon(item.category);
                const isOwned = currentUser.inventory.includes(item.id);

                return (
                  <Card key={item.id} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <IconComponent className="h-8 w-8 text-blue-400" />
                        <div className="flex items-center text-yellow-400 font-bold">
                          <Coins className="h-5 w-5 mr-1" />
                          {item.price}
                        </div>
                      </div>
                      <CardTitle className="text-white text-lg">
                        {item.name}
                      </CardTitle>
                      <CardDescription className="text-white/70">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {isOwned ? (
                        <Badge className="bg-green-500 text-white w-full justify-center">
                          <Heart className="h-3 w-3 mr-1" />
                          Owned
                        </Badge>
                      ) : (
                        <Button onClick={() => buyItem(item.id)} className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 disabled:opacity-50 w-full">
                          {currentUser.stats.currentPoints >= item.price ? "Buy Now" : "Not Enough Coins"}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                )

              })}
            </div>
          </TabsContent>

          {/* Progress */}
          <TabsContent value="progress" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">
                    Coding Journey
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <div className="flex text-white mb-2 justify-between">
                      <span>Level Progress</span>
                      <span>{currentUser.stats.level}/10</span>
                    </div>
                    <Progress value={(currentUser.stats.level / 10) * 100} className="h-3" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="text-2xl font-bold text-blue-400">
                        {currentUser.stats.totalPoints}
                      </div>
                      <div className="text-white/70 text-sm">
                        Total Points
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="text-2xl font-bold text-blue-400">
                        {currentUser.stats.completedChallenges}
                      </div>
                      <div className="text-white/70 text-sm">
                        Challenges Done
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">
                    Achievement Badges
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="bg-yellow-500 rounded-full p-3 mx-auto w-fit mb-2">
                        <Trophy className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-white/80 text-xs">
                        First Week
                      </div>
                      <div className="text-center">
                        <div className="bg-purple-500 rounded-full p-3 mx-auto w-fit mb-2">
                          <Code className="h-6 w-6 text-white" />
                        </div>
                        <div className="text-white/80 text-xs">Code Master</div>
                      </div>
                      <div className="text-center">
                        <div className="bg-green-500 rounded-full p-3 mx-auto w-fit mb-2">
                          <Zap className="h-6 w-6 text-white" />
                        </div>
                        <div className="text-white/80 text-xs">Streak King</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Inventory */}
          <TabsContent value="inventory" className="space-y-4">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <ShoppingCart className="h-5 w-5 mr-2" /> My Developer Life
                </CardTitle>
                <CardDescription className="text-white/70">
                  Your virtual life built through coding achievements.
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="grid gap-4 md:grids-cols-2 lg:grid-cols-3">
              {shopItems.filter((item) => currentUser.inventory.includes(item.id)).map((item) => {
                const IconComponent = getCategoryIcon(item.category);

                return (
                  <Card key={item.id} className="bg-gradient-to-r from-green-500/20 backdrop-blur-md border-green-400/30">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <IconComponent className="h-8 w-8 text-green-400" />
                        <Badge className="bg-green-500 text-white">
                          <Heart className="h-3 w-3 mr-1" />
                          Owned
                        </Badge>
                      </div>
                      <CardTitle className="text-white">
                        {item.name}
                      </CardTitle>
                      <CardDescription className="text-white/70">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                )
              })}
              {currentUser.inventory.length === 0 && (
                <Card className="bg-white/10 backdrop-blur-md border-white/20 col-span-full">
                  <CardContent className="text-center py-12">
                    <ShoppingCart className="h-12 w-12 text-white/50 mx-auto mb-4"/>
                    <p className="text-white/70">Complete challenges to start building your developer life!</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div >
  );
}
