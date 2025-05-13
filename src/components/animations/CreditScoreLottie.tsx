import React, { useRef, useEffect } from 'react';
import lottie from 'lottie-web';

interface CreditScoreLottieProps {
  className?: string;
}

export default function CreditScoreLottie({ className }: CreditScoreLottieProps) {
  const container = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!container.current) return;
    
    // Load and play the animation
    const anim = lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/assets/lottie/creditScore.json',
    });
    
    return () => anim.destroy(); // Clean up on unmount
  }, []);
  
  return (
    <div ref={container} className={`w-full h-full ${className}`}></div>
  );
} 