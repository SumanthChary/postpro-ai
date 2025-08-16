import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useWhopAuth } from '@/hooks/useWhopAuth';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const WhopCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { handleWhopCallback } = useWhopAuth();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Processing authentication...');

  useEffect(() => {
    const processCallback = async () => {
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      const error = searchParams.get('error');

      if (error) {
        setStatus('error');
        setMessage(`Authentication failed: ${error}`);
        return;
      }

      if (!code) {
        setStatus('error');
        setMessage('No authorization code received');
        return;
      }

      try {
        const success = await handleWhopCallback(code, state || undefined);
        
        if (success) {
          setStatus('success');
          setMessage('Authentication successful! Redirecting...');
          
          // Redirect after a short delay
          setTimeout(() => {
            // Check if we're in an iframe (Whop app context)
            if (window.parent !== window) {
              // If in iframe, use postMessage to parent
              window.parent.postMessage({
                type: 'whop_auth_success',
                redirect: '/whop-app'
              }, '*');
            } else {
              navigate('/whop-app', { replace: true });
            }
          }, 2000);
        } else {
          setStatus('error');
          setMessage('Authentication failed. Please try again.');
        }
      } catch (error) {
        console.error('Callback processing error:', error);
        setStatus('error');
        setMessage('An unexpected error occurred during authentication.');
      }
    };

    processCallback();
  }, [searchParams, handleWhopCallback, navigate]);

  const handleRetry = () => {
    navigate('/whop-app', { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center space-x-2">
            {status === 'loading' && (
              <>
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                <span>Authenticating</span>
              </>
            )}
            {status === 'success' && (
              <>
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-green-600">Success!</span>
              </>
            )}
            {status === 'error' && (
              <>
                <XCircle className="h-5 w-5 text-red-500" />
                <span className="text-red-600">Error</span>
              </>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">{message}</p>
          
          {status === 'loading' && (
            <div className="flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          
          {status === 'success' && (
            <div className="text-green-600">
              <CheckCircle className="h-12 w-12 mx-auto mb-2" />
              <p className="text-sm">You will be redirected automatically...</p>
            </div>
          )}
          
          {status === 'error' && (
            <div className="space-y-4">
              <XCircle className="h-12 w-12 mx-auto text-red-500" />
              <Button onClick={handleRetry} variant="outline" className="w-full">
                Try Again
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WhopCallback;