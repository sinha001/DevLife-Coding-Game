'use client';

import type React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert"
import { Code, Mail, Lock, User, ArrowRight } from "lucide-react"
import { useAuth } from "../hooks/useAuth"

export default function RegisterPage() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const {register} = useAuth();

  const handleRegister = async (e: React.FormEvent)=>{
      e.preventDefault();
      setLoading(true)
      setError("")

      if(formData.password !== formData.confirmPassword){
        setError("Passwords do not match");
        setLoading(false)
        return
      }

      try{
        await register(formData.email, formData.password, formData.name)
        navigate("/game")
      }
      catch(err)
      {
        setError("Registration failed. Please try again.")
      }
      finally{
        setLoading(false)
      }
    }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-purple-500 to-purple-500 p-3 rounded-2xl">
              <Code className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Join DevLife</h1>
          <p className="text-white/70">Start your coding journey today!</p>
        </div>
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white/70 text-center">
              Create Account
            </CardTitle>
            <CardDescription className="text-white/70 text-center">
              Sign up to begin your developer adventure
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                  <Input id="name" name="name" type="text" placeholder="Enter your full name" value={formData.name} onChange={handleInputChange} className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                  <Input id="email" name="email" type="email" placeholder="Enter your email" value={formData.email} onChange={handleInputChange} className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                  <Input id="password" name="password" type="password" placeholder="Create a password" value={formData.password} onChange={handleInputChange} className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                  <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleInputChange} className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50" required />
                </div>
              </div>

              {error && (
                <Alert className="bg-red-500/20 border-red-500/50">
                  <AlertDescription className="text-white">{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                {loading ? "Creating Account..." : "Create Account"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-white/70">
                Already have an account?{" "}
                <Link to="/auth/login" className="text-purple-400 hover:text-purple-300 font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
