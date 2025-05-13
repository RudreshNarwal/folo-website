import React, { useRef, useEffect } from 'react';
import lottie from 'lottie-web';

interface AppShowcaseLottieProps {
  className?: string;
}

export default function AppShowcaseLottie({ className }: AppShowcaseLottieProps) {
  const container = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!container.current) return;
    
    // Load and play the animation
    const anim = lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      // Use the specific file path
      path: '/assets/lottie/finance.json',
    });
    
    return () => anim.destroy(); // Clean up on unmount
  }, []);
  
  return (
    <div ref={container} className={`w-full h-full ${className}`}></div>
  );
} 