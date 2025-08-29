
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useReferralTracking } from "@/hooks/useReferralTracking";
import { supabase } from "@/integrations/supabase/client";
import { Eye, EyeOff, Mail, Lock, User, Shield, Zap, Award, TrendingUp } from "lucide-react";

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { processReferral } = useReferralTracking();

  const validateSignUp = () => {
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return false;
    }

    if (password.length < 6) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return false;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return false;
    }
    
    if (username.length < 3) {
      toast({
        title: "Invalid Username",
        description: "Username must be at least 3 characters long",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        console.log('Attempting login for:', email);
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        
        if (error) {
          console.error('Login error:', error);
          
          // Handle specific error cases
          if (error.message.includes('Invalid login credentials')) {
            throw new Error('Invalid email or password. Please check your credentials and try again.');
          } else if (error.message.includes('Email not confirmed')) {
            throw new Error('Please check your email and click the confirmation link before signing in.');
          } else {
            throw error;
          }
        }
        
        console.log('Login successful:', data.user?.email);
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        });
        navigate("/");
      } else {
        if (!validateSignUp()) {
          setLoading(false);
          return;
        }

        console.log('Attempting signup for:', email);
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              username: username.trim(),
            },
            emailRedirectTo: `${window.location.origin}/`
          },
        });
        
        if (error) {
          console.error('Signup error:', error);
          
          // Handle specific error cases
          if (error.message.includes('User already registered')) {
            throw new Error('An account with this email already exists. Please sign in instead.');
          } else {
            throw error;
          }
        }
        
        console.log('Signup successful:', data.user?.email);
        
        // Process referral for new user
        if (data.user?.id) {
          processReferral(data.user.id, 'free');
        }
        
        toast({
          title: "Account Created!",
          description: "Please check your email to verify your account. The verification link will expire in 24 hours.",
          duration: 10000,
        });

        toast({
          title: "Welcome to PostPro AI!",
          description: "Your free plan has been activated. Start enhancing your posts now!",
          duration: 5000,
        });
        
        // Auto-switch to login after successful signup
        setTimeout(() => {
          setIsLogin(true);
          setPassword("");
          setConfirmPassword("");
        }, 2000);
      }
    } catch (error: unknown) {
      const err = error as Error;
      console.error('Auth error:', err);
      toast({
        title: isLogin ? "Sign In Failed" : "Sign Up Failed",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });
      
      if (error) {
        console.error('Google auth error:', error);
        toast({
          title: "Google Sign In Failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error('Google auth error:', error);
      toast({
        title: "Google Sign In Failed",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: Zap,
      title: "AI Enhancement",
      description: "Transform posts with intelligent AI"
    },
    {
      icon: TrendingUp,
      title: "Boost Engagement",
      description: "Increase social media reach"
    },
    {
      icon: Award,
      title: "Premium Templates",
      description: "Access professional templates"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex">
      {/* Left Side - Features Section - Hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 xl:px-16 bg-gradient-to-br from-blue-600 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="mb-8">
            <h1 className="text-4xl xl:text-5xl font-bold mb-4 leading-tight">
              Transform Your Social Media
            </h1>
            <p className="text-xl opacity-90 leading-relaxed">
              Join creators using AI to enhance content and boost engagement.
            </p>
          </div>
          
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4 group">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300">
                  <feature.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
                  <p className="text-blue-100 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-6 lg:mb-8">
            <div className="flex items-center justify-center mb-4 lg:mb-6">
              <img 
                src="/lovable-uploads/01519854-3b9c-4c6b-99bc-bbb2f1e7aa5a.png" 
                alt="PostPro AI" 
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl object-contain shadow-lg mr-3"
              />
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">PostPro AI</h1>
            </div>
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2 lg:mb-3">
              {isLogin ? "Welcome Back" : "Get Started"}
            </h2>
            <p className="text-gray-600 text-sm lg:text-base">
              {isLogin
                ? "Sign in to enhance your content"
                : "Create your account"}
            </p>
          </div>

          {/* Form Card */}
          <Card className="p-4 lg:p-6 bg-white border border-gray-200 shadow-xl rounded-2xl">
            <form onSubmit={handleAuth} className="space-y-4 lg:space-y-5">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-900 font-medium text-sm">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 h-11 lg:h-12 bg-white border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-sm rounded-lg transition-all duration-200"
                  />
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-gray-900 font-medium text-sm">Username</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="johndoe"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      minLength={3}
                      className="pl-10 h-11 lg:h-12 bg-white border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-sm rounded-lg transition-all duration-200"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-900 font-medium text-sm">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="pl-10 pr-10 h-11 lg:h-12 bg-white border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-sm rounded-lg transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-900 font-medium text-sm">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="pl-10 pr-10 h-11 lg:h-12 bg-white border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-sm rounded-lg transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-11 lg:h-12 text-white font-medium text-sm lg:text-base transition-all duration-200 hover:shadow-lg rounded-lg"
                style={{ backgroundColor: 'rgba(57,107,255,1)' }}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  isLogin ? "Sign In" : "Create Account"
                )}
              </Button>
            </form>

            {/* Google Sign In */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full h-11 lg:h-12 font-medium text-sm lg:text-base border-gray-200 hover:bg-gray-50"
              onClick={handleGoogleAuth}
              disabled={loading}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {loading ? "Processing..." : "Continue with Google"}
            </Button>

            <div className="text-center mt-4 lg:mt-6">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setUsername("");
                  setConfirmPassword("");
                  setPassword("");
                  setShowPassword(false);
                  setShowConfirmPassword(false);
                }}
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors text-sm"
              >
                {isLogin
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"}
              </button>
            </div>
          </Card>

          {/* Trust Indicators - Simplified for mobile */}
          <div className="text-center mt-4 lg:mt-6">
            <div className="flex items-center justify-center space-x-4 text-gray-500">
              <div className="flex items-center space-x-1">
                <Shield className="w-3 h-3" />
                <span className="text-xs">Secure</span>
              </div>
              <div className="flex items-center space-x-1">
                <Zap className="w-3 h-3" />
                <span className="text-xs">Fast</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
