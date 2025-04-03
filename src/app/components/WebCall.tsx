'use client';

import { useState, useRef, useEffect } from 'react';
import Vapi from '@vapi-ai/web';

export default function WebCall() {
  const [isCallActive, setIsCallActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const vapiRef = useRef<Vapi | null>(null);

  const cleanup = () => {
    if (vapiRef.current) {
      vapiRef.current.stop();
      vapiRef.current = null;
    }
    setIsCallActive(false);
  };

  const startCall = async () => {
    try {
      // Clean up any existing instance first
      cleanup();
      
      setError(null);
      setIsCallActive(true);
      
      // Initialize Vapi with the public key from environment variable
      vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY!);
      
      // Start the call with the assistant ID from the documentation
      await vapiRef.current.start("ac8a5bd3-06d8-466d-b7d1-b104c1cfbe16");
      
      // Add event listener for call state
      vapiRef.current.on('error', (error) => {
        setError(error.message);
        cleanup();
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      cleanup();
    }
  };

  const handleClick = () => {
    if (isCallActive) {
      cleanup();
    } else {
      startCall();
    }
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="relative w-full max-w-sm">
        <div className={`absolute inset-0 ${isCallActive ? 'bg-red-500/20 animate-pulse' : 'bg-blue-500/10'} rounded-full blur-xl -z-10`}></div>
        <button
          onClick={handleClick}
          className={`w-full px-6 py-3 rounded-full font-medium text-white transition-all duration-300 shadow-lg ${
            isCallActive
              ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 hover:shadow-red-500/30'
              : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 hover:shadow-blue-500/30'
          }`}
        >
          <div className="flex items-center justify-center">
            {isCallActive ? (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                Stop AI Knowledge
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                Talk with AI Knowledge
              </>
            )}
          </div>
        </button>
      </div>
      
      {isCallActive && (
        <div className="mt-4 flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Call in progress</span>
        </div>
      )}
      
      {error && (
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}
    </div>
  );
}