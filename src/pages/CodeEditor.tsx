'use client';

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { ArrowLeft, Trophy, Lightbulb, Terminal } from "lucide-react"
import { useAuth } from "../hooks/useAuth"
//import CodeExecutor from "../components/CodeExecutor"
//import { getCodeTemplate } from "../utils/codeTemplates"
import type { Challenge } from "../lib/auth"
//import type { SupportedLanguage } from "../services/judge0"


export default function CodeEditor() {
  const params = useParams()
  const navigate = useNavigate();
  const { currentUser, updateUser } = useAuth()
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [code, setCode] = useState("")
  const [language,setLanguage] = useState<SupportedLanguage>("javascript")
  const [executionResults, setExecutionResults] = useState<any[]>([])
  const [hasEarnedPoints, setHasEarnedPoints] = useState(false)

  useEffect(()=>{
    if(!currentUser){
      navigate("/auth/login")
      return
    }
  

  // Mock challenge data with real test cases
  const mockChallenge: Challenge = {
    id: params.challengeId as string,
    title: "Array Sum Challenge",
    difficulty: "Beginner",
    points: 50,
    description: "Find the sum of all elements in an array",
    problemStatement: `Given an array of integers, return the sum of all elements.

**Example:**
- Input: [1, 2, 3, 4, 5]
- Output: 15

**Constraints:**
- Array length: 1 ≤ n ≤ 1000
- Element range: -1000 ≤ arr[i] ≤ 1000

**Note:** Your solution will be tested with multiple test cases including edge cases.`,
    testCases: [
      { input: "[1, 2, 3, 4, 5]", expectedOutput: "15", isHidden: false },
      { input: "[10, -5, 3]", expectedOutput: "8", isHidden: false },
      { input: "[-1, -2, -3]", expectedOutput: "-6", isHidden: true },
      { input: "[0]", expectedOutput: "0", isHidden: true },
      { input: "[100, 200, 300]", expectedOutput: "600", isHidden: true },
    ],
    category: "Arrays",
    createdBy: "admin",
    createdAt: new Date(),
    isActive: true,
  }

  setChallenge(mockChallenge)
  setCode(getCodeTemplate(language, mockChallenge.title))
}, [params.challengeId, navigate, currentUser, language])


const handleLanguagaeChange = (newLanguage: SupportedLanguage) => {
  setLanguage(newLanguage)
  if(challenge)
  {
    setCode(getCodeTemplate(newLanguage, challenge.title))
  }
  setExecutionResults([])
  setHasEarnedPoints(false)
}

const handlePointsEarned = (points:number)=>{
  if(!hasEarnedPoints && currentUser)
  {
    const updatedUser = {
      ...currentUser,
      stats: {
        ...currentUser.stats,
        currentPoints: currentUser.stats.currentPoints + points,
        totalPoints: currentUser.stats.totalPoints+points,
        completedChallenges: currentUser.stats.completedChallenges+1,
        streak: currentUser.stats.streak + 1,
      },
    }
    updateUser(updatedUser)
    setHasEarnedPoints(true)
  }
}

const getDifficultyColor = (difficulty:string) => {
  switch(difficulty)
  {
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

if(!challenge || !currentUser)return null

const allTesttsPassed = executionResults.length>0 && executionResults.every((r)=>r.passed)

  return (
  <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-6">
        <div className="flex items-center space-x-4">
          <Button onClick={()=>navigate("/game")} variant="outline" className="border-white/20 text-white hover:bg-white/10">
            <ArrowLeft className="h-4 w-4 mr-2"/>
            Back to Game
          </Button>
        </div>
      </div>
    </div>
  </div>
  );
}
