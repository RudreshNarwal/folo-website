import React, { useRef, useEffect } from 'react';
import lottie from 'lottie-web';

interface WorldTransferLottieProps {
  className?: string;
}

export default function WorldTransferLottie({ className }: WorldTransferLottieProps) {
  const container = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!container.current) return;
    
    // Load and play the animation
    const anim = lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/assets/lottie/world.json',
    });
    
    return () => anim.destroy(); // Clean up on unmount
  }, []);
  
  return (
    <div ref={container} className={`w-full h-full ${className}`}></div>
  );
} 