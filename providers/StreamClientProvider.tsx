'use client';

import { ReactNode, useEffect, useState } from 'react';
import { StreamVideoClient, StreamVideo } from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs';

import { tokenProvider } from '@/actions/stream.actions';
import Loader from '@/components/Loader';

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const [isInitializing, setIsInitializing] = useState(false);
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded) return;
    
    if (!user) {
      // If no user is authenticated, render children without Stream client
      setVideoClient(undefined);
      return;
    }
    
    if (!API_KEY) {
      console.error('Stream API key is missing');
      return;
    }

    setIsInitializing(true);

    const initializeClient = async () => {
      try {
        const client = new StreamVideoClient({
          apiKey: API_KEY,
          user: {
            id: user.id,
            name: user.username || user.id,
            image: user.imageUrl,
          },
          tokenProvider,
        });

        setVideoClient(client);
      } catch (error) {
        console.error('Failed to initialize Stream client:', error);
      } finally {
        setIsInitializing(false);
      }
    };

    initializeClient();
  }, [user, isLoaded]);

  // Show loader while Clerk is loading or Stream client is initializing
  if (!isLoaded || isInitializing) {
    return <Loader />;
  }

  // If we have a video client, wrap children with StreamVideo
  if (videoClient) {
    return <StreamVideo client={videoClient}>{children}</StreamVideo>;
  }

  // Render children without StreamVideo (for unauthenticated users or when client fails to initialize)
  return <>{children}</>;
};

export default StreamVideoProvider;
