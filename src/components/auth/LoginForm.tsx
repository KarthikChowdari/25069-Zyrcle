'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseClientComponent } from '@/lib/supabaseClient'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Link from 'next/link'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createSupabaseClientComponent()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw error
      }

      if (data.user) {
        router.push('/')
        router.refresh()
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }



  return (
    <div className="min-h-screen flex flex-col bg-[#122315] text-white relative overflow-hidden">
      {/* Background Illustration with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://cdn.prod.website-files.com/635273ea37c256ef2835d522/654a36b6f78e92b5209148af_Kikin_Illustrations_Scene_01_RGB%202.svg"
          alt="Background"
          className="w-full h-full object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-[#122315]/80"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-white">Welcome Back</CardTitle>
            <CardDescription className="text-white/80">
              Sign in to continue analyzing metal circularity
            </CardDescription>
          </CardHeader>
        <CardContent>
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-green-400 focus:ring-green-400"
                placeholder="Enter your email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-green-400 focus:ring-green-400"
                placeholder="Enter your password"
              />
            </div>
            
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>



          <div className="mt-4 text-center text-sm">
            Don't have an account?{' '}
            <Link href="/signup" className="text-green-400 hover:text-green-300 hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  )
}