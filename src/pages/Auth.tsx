
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
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

  const validateSignUp = () => {
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return false;
    }
    if (username.length < 3) {
      toast({
        title: "Error",
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
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        navigate("/");
      } else {
        if (!validateSignUp()) {
          setLoading(false);
          return;
        }

        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username: username,
            },
          },
        });
        
        if (error) throw error;
        
        toast({
          title: "Success!",
          description: "Please check your email to verify your account. The verification link will expire in 24 hours.",
        });

        toast({
          title: "Welcome!",
          description: "Your free plan has been activated. Start enhancing your posts now!",
        });
        navigate("/");
      }
    } catch (error: unknown) {
      const err = error as Error;
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: Zap,
      title: "AI-Powered Enhancement",
      description: "Transform your posts with intelligent AI suggestions"
    },
    {
      icon: TrendingUp,
      title: "Boost Engagement",
      description: "Increase your social media reach and interaction"
    },
    {
      icon: Award,
      title: "Professional Templates",
      description: "Access premium content templates and frameworks"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is protected with enterprise-grade security"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 flex lg:flex-row flex-col">
      {/* Left Side - Features Section */}
      <div className="lg:w-1/2 w-full lg:flex hidden flex-col justify-center px-8 lg:px-12 xl:px-16 bg-gradient-to-br from-blue-600 to-purple-700 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="mb-8">
            <h1 className="text-4xl xl:text-5xl font-bold mb-4 leading-tight">
              Transform Your Social Media Presence
            </h1>
            <p className="text-xl opacity-90 leading-relaxed">
              Join thousands of creators using AI to enhance their content and boost engagement across all platforms.
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
          
          <div className="mt-12 p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">10,000+</div>
              <p className="text-blue-100">Active Users Worldwide</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="lg:w-1/2 w-full flex items-center justify-center px-4 py-8 lg:py-0">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <img 
                src="/lovable-uploads/01519854-3b9c-4c6b-99bc-bbb2f1e7aa5a.png" 
                alt="PostPro AI Logo" 
                className="w-12 h-12 rounded-xl object-contain shadow-lg mr-3"
              />
              <h1 className="text-3xl font-bold text-gray-900">PostPro AI</h1>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
              {isLogin ? "Welcome Back!" : "Start Your Journey"}
            </h2>
            <p className="text-gray-600 text-base lg:text-lg leading-relaxed">
              {isLogin
                ? "Sign in to continue enhancing your content with AI"
                : "Create your account and join the content revolution"}
            </p>
          </div>

          {/* Form Card */}
          <Card className="p-6 lg:p-8 bg-white/90 backdrop-blur-sm border border-gray-200/50 shadow-2xl rounded-2xl">
            <form onSubmit={handleAuth} className="space-y-5 lg:space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-900 font-medium text-sm lg:text-base">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-11 h-12 lg:h-14 bg-white/90 border-gray-200/50 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 text-base rounded-xl transition-all duration-200"
                  />
                </div>
              </div>

              {/* Username Field (Sign Up Only) */}
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-gray-900 font-medium text-sm lg:text-base">Username</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="johndoe"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      minLength={3}
                      className="pl-11 h-12 lg:h-14 bg-white/90 border-gray-200/50 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 text-base rounded-xl transition-all duration-200"
                    />
                  </div>
                </div>
              )}

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-900 font-medium text-sm lg:text-base">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-11 pr-11 h-12 lg:h-14 bg-white/90 border-gray-200/50 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 text-base rounded-xl transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field (Sign Up Only) */}
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-900 font-medium text-sm lg:text-base">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="pl-11 pr-11 h-12 lg:h-14 bg-white/90 border-gray-200/50 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 text-base rounded-xl transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 lg:h-14 text-white font-semibold text-base lg:text-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02] rounded-xl"
                style={{ backgroundColor: 'rgba(57,107,255,1)' }}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  isLogin ? "Sign In" : "Create Account"
                )}
              </Button>
            </form>

            {/* Switch Form Type */}
            <div className="text-center mt-6 lg:mt-8">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setUsername("");
                  setConfirmPassword("");
                  setShowPassword(false);
                  setShowConfirmPassword(false);
                }}
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors text-sm lg:text-base"
              >
                {isLogin
                  ? "Don't have an account? Sign up for free"
                  : "Already have an account? Sign in"}
              </button>
            </div>
          </Card>

          {/* Trust Indicators */}
          <div className="text-center mt-6 lg:mt-8">
            <div className="flex items-center justify-center space-x-6 text-gray-500">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span className="text-sm">Secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4" />
                <span className="text-sm">Trusted</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span className="text-sm">Fast</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              Trusted by 10,000+ content creators worldwide
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
