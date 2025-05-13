import React, { useState, useEffect } from "react";

const InteractiveAppShowcaseSVG = ({ className }: { className?: string }) => {
  const [animationState, setAnimationState] = useState(0);
  
  // Cycle through animation states
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationState((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative w-full h-full ${className}`}>
      <svg 
        viewBox="0 0 360 680" 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[360px]"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Modern Phone Frame with rounded corners */}
        <rect x="5" y="5" width="350" height="670" rx="40" fill="hsl(var(--background))" stroke="hsl(var(--border))" strokeWidth="2" />
        <rect x="12" y="12" width="336" height="656" rx="36" fill="hsl(var(--background))" />
        
        {/* Top Status Bar */}
        <rect x="12" y="12" width="336" height="30" rx="36 36 0 0" fill="hsl(var(--muted))" fillOpacity="0.4" />
        <circle cx="40" cy="27" r="6" fill="hsl(var(--accent))" />
        <rect x="130" y="22" width="100" height="10" rx="5" fill="hsl(var(--background))" />
        <circle cx="320" cy="27" r="6" fill="hsl(var(--primary))" />
        
        {/* Modern App Header */}
        <rect x="12" y="42" width="336" height="60" fill="hsl(var(--background))" />
        
        {/* Custom Logo */}
        <g transform="translate(30, 60)">
          <circle cx="12" cy="12" r="12" fill="hsl(var(--primary))" />
          <circle cx="12" cy="12" r="6" fill="hsl(var(--accent))" />
          <text x="34" y="17" fontSize="20" fontWeight="bold" fill="hsl(var(--foreground))">folo</text>
        </g>
        
        {/* User Profile */}
        <circle cx="320" cy="72" r="18" fill="hsl(var(--secondary))" fillOpacity="0.6" />
        <path d="M320 62 Q313 62 313 72 Q313 82 320 82 Q327 82 327 72 Q327 62 320 62" fill="hsl(var(--background))" />
        <circle cx="320" cy="58" r="6" fill="hsl(var(--background))" />
        
        {/* Main Content Area - Home Screen */}
        <g className={`${animationState === 0 ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}>
          {/* Balance Widget */}
          <rect x="30" y="120" width="300" height="100" rx="20" fill="hsl(var(--primary))" />
          <text x="50" y="150" fill="white" fontSize="14" fontWeight="500">YOUR BALANCE</text>
          <text x="50" y="185" fill="white" fontSize="32" fontWeight="700">$3,429</text>
          <text x="170" y="185" fill="white" fontSize="14" fontWeight="500">.86</text>
          
          {/* Trend Indicator */}
          <rect x="230" y="150" width="80" height="30" rx="15" fill="white" fillOpacity="0.2" />
          <path d="M250 165 L260 155 L270 165" stroke="white" strokeWidth="2" fill="none" />
          <text x="280" y="170" fill="white" fontSize="12" fontWeight="500">+8%</text>
          
          {/* Quick Actions */}
          <rect x="30" y="240" width="90" height="90" rx="20" fill="hsl(var(--secondary))" fillOpacity="0.7" />
          <circle cx="75" cy="270" r="15" fill="white" fillOpacity="0.2" />
          <path d="M75 263 L75 277 M68 270 L82 270" stroke="white" strokeWidth="2" />
          <text x="75" y="305" fill="white" fontSize="12" fontWeight="500" textAnchor="middle">Send</text>
          
          <rect x="135" y="240" width="90" height="90" rx="20" fill="hsl(var(--accent))" />
          <circle cx="180" cy="270" r="15" fill="white" fillOpacity="0.2" />
          <path d="M173 270 L187 270 M180 263 L180 277" stroke="white" strokeWidth="2" />
          <text x="180" y="305" fill="white" fontSize="12" fontWeight="500" textAnchor="middle">Request</text>
          
          <rect x="240" y="240" width="90" height="90" rx="20" fill="hsl(var(--chart-5))" />
          <circle cx="285" cy="270" r="15" fill="white" fillOpacity="0.2" />
          <path d="M278 270 L292 270 M285 265 L285 275" stroke="white" strokeWidth="2" />
          <text x="285" y="305" fill="white" fontSize="12" fontWeight="500" textAnchor="middle">Split</text>
          
          {/* Recent Transactions */}
          <text x="30" y="370" fill="hsl(var(--foreground))" fontSize="16" fontWeight="700">Recent Transactions</text>
          
          <rect x="30" y="390" width="300" height="70" rx="15" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
          <circle cx="65" cy="425" r="20" fill="hsl(var(--chart-3))" fillOpacity="0.7" />
          <text x="65" y="430" fill="white" fontSize="14" fontWeight="700" textAnchor="middle">🍔</text>
          <text x="105" y="415" fill="hsl(var(--foreground))" fontSize="14" fontWeight="500">Shake Shack</text>
          <text x="105" y="440" fill="hsl(var(--muted-foreground))" fontSize="12">Today • Food</text>
          <text x="310" y="425" fill="hsl(var(--foreground))" fontSize="16" fontWeight="700" textAnchor="end">-$15.49</text>
          
          <rect x="30" y="470" width="300" height="70" rx="15" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
          <circle cx="65" cy="505" r="20" fill="hsl(var(--chart-2))" fillOpacity="0.7" />
          <text x="65" y="510" fill="white" fontSize="14" fontWeight="700" textAnchor="middle">🎵</text>
          <text x="105" y="495" fill="hsl(var(--foreground))" fontSize="14" fontWeight="500">Spotify</text>
          <text x="105" y="520" fill="hsl(var(--muted-foreground))" fontSize="12">Yesterday • Subscription</text>
          <text x="310" y="505" fill="hsl(var(--foreground))" fontSize="16" fontWeight="700" textAnchor="end">-$9.99</text>
        </g>
        
        {/* Analytics Screen */}
        <g className={`${animationState === 1 ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}>
          <text x="30" y="120" fill="hsl(var(--foreground))" fontSize="24" fontWeight="700">Analytics</text>
          
          {/* Spending Summary */}
          <rect x="30" y="140" width="300" height="150" rx="20" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
          <text x="50" y="170" fill="hsl(var(--foreground))" fontSize="16" fontWeight="600">Monthly Spending</text>
          
          {/* Modern Chart */}
          <path d="M50 240 L50 200 C50 200, 80 180, 100 220 C120 260, 140 170, 160 190 C180 210, 200 170, 220 180 C240 190, 280 220, 280 200 L280 240 Z" 
                fill="hsl(var(--primary))" fillOpacity="0.2" />
          <path d="M50 200 C50 200, 80 180, 100 220 C120 260, 140 170, 160 190 C180 210, 200 170, 220 180 C240 190, 280 220, 280 200" 
                stroke="hsl(var(--primary))" strokeWidth="3" fill="none" />
          
          {/* Data Points */}
          <circle cx="50" cy="200" r="5" fill="hsl(var(--primary))" />
          <circle cx="100" cy="220" r="5" fill="hsl(var(--primary))" />
          <circle cx="160" cy="190" r="5" fill="hsl(var(--primary))" />
          <circle cx="220" cy="180" r="5" fill="hsl(var(--primary))" />
          <circle cx="280" cy="200" r="5" fill="hsl(var(--primary))" />
          
          {/* Category Breakdown */}
          <text x="30" y="320" fill="hsl(var(--foreground))" fontSize="18" fontWeight="600">Spending by Category</text>
          
          {/* Progressive Bars */}
          <text x="30" y="350" fill="hsl(var(--foreground))" fontSize="14">Food & Drinks</text>
          <rect x="150" y="338" width="180" height="20" rx="10" fill="hsl(var(--muted))" />
          <rect x="150" y="338" width="126" height="20" rx="10" fill="hsl(var(--chart-1))" />
          <text x="320" y="352" fill="hsl(var(--muted-foreground))" fontSize="12" textAnchor="end">$420.50</text>
          
          <text x="30" y="380" fill="hsl(var(--foreground))" fontSize="14">Entertainment</text>
          <rect x="150" y="368" width="180" height="20" rx="10" fill="hsl(var(--muted))" />
          <rect x="150" y="368" width="90" height="20" rx="10" fill="hsl(var(--chart-2))" />
          <text x="320" y="382" fill="hsl(var(--muted-foreground))" fontSize="12" textAnchor="end">$300.75</text>
          
          <text x="30" y="410" fill="hsl(var(--foreground))" fontSize="14">Shopping</text>
          <rect x="150" y="398" width="180" height="20" rx="10" fill="hsl(var(--muted))" />
          <rect x="150" y="398" width="150" height="20" rx="10" fill="hsl(var(--chart-3))" />
          <text x="320" y="412" fill="hsl(var(--muted-foreground))" fontSize="12" textAnchor="end">$500.25</text>
          
          <text x="30" y="440" fill="hsl(var(--foreground))" fontSize="14">Transportation</text>
          <rect x="150" y="428" width="180" height="20" rx="10" fill="hsl(var(--muted))" />
          <rect x="150" y="428" width="60" height="20" rx="10" fill="hsl(var(--chart-4))" />
          <text x="320" y="442" fill="hsl(var(--muted-foreground))" fontSize="12" textAnchor="end">$200.00</text>
          
          <text x="30" y="470" fill="hsl(var(--foreground))" fontSize="14">Bills & Utilities</text>
          <rect x="150" y="458" width="180" height="20" rx="10" fill="hsl(var(--muted))" />
          <rect x="150" y="458" width="105" height="20" rx="10" fill="hsl(var(--chart-5))" />
          <text x="320" y="472" fill="hsl(var(--muted-foreground))" fontSize="12" textAnchor="end">$350.00</text>
        </g>
        
        {/* Goals & Savings Screen */}
        <g className={`${animationState === 2 ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}>
          <text x="30" y="120" fill="hsl(var(--foreground))" fontSize="24" fontWeight="700">Goals</text>
          
          {/* Progress Cards */}
          <rect x="30" y="140" width="300" height="120" rx="20" fill="hsl(var(--secondary))" />
          <text x="50" y="170" fill="white" fontSize="16" fontWeight="600">Vacation Fund</text>
          <text x="50" y="200" fill="white" fontSize="24" fontWeight="700">$2,450</text>
          <text x="130" y="200" fill="white" fontSize="16" fontWeight="400">/4,000</text>
          
          {/* Progress Bar */}
          <rect x="50" y="220" width="260" height="20" rx="10" fill="white" fillOpacity="0.2" />
          <rect x="50" y="220" width="160" height="20" rx="10" fill="white" fillOpacity="0.6" />
          <text x="290" y="235" fill="white" fontSize="12" textAnchor="end">61%</text>
          
          <rect x="30" y="280" width="300" height="120" rx="20" fill="hsl(var(--primary))" />
          <text x="50" y="310" fill="white" fontSize="16" fontWeight="600">New Laptop</text>
          <text x="50" y="340" fill="white" fontSize="24" fontWeight="700">$850</text>
          <text x="115" y="340" fill="white" fontSize="16" fontWeight="400">/1,500</text>
          
          {/* Progress Bar */}
          <rect x="50" y="360" width="260" height="20" rx="10" fill="white" fillOpacity="0.2" />
          <rect x="50" y="360" width="145" height="20" rx="10" fill="white" fillOpacity="0.6" />
          <text x="290" y="375" fill="white" fontSize="12" textAnchor="end">56%</text>
          
          {/* Add Goal Button */}
          <rect x="30" y="420" width="300" height="80" rx="20" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
          <circle cx="75" cy="460" r="25" fill="hsl(var(--accent))" fillOpacity="0.1" />
          <path d="M75 448 L75 472 M63 460 L87 460" stroke="hsl(var(--accent))" strokeWidth="3" />
          <text x="120" y="455" fill="hsl(var(--foreground))" fontSize="16" fontWeight="600">Add New Goal</text>
          <text x="120" y="475" fill="hsl(var(--muted-foreground))" fontSize="12">Track your savings progress</text>
          
          {/* Tips Card */}
          <rect x="30" y="520" width="300" height="80" rx="20" fill="hsl(var(--muted))" fillOpacity="0.3" />
          <text x="60" y="550" fill="hsl(var(--foreground))" fontSize="14" fontWeight="600">💡 Saving Tip:</text>
          <text x="60" y="570" fill="hsl(var(--foreground))" fontSize="12">Try the 50/30/20 rule: 50% needs, 30% wants,</text>
          <text x="60" y="585" fill="hsl(var(--foreground))" fontSize="12">20% savings and debt payments.</text>
        </g>
        
        {/* Bottom Navigation Bar */}
        <rect x="12" y="628" width="336" height="40" rx="0 0 36 36" fill="hsl(var(--background))" stroke="hsl(var(--border))" strokeWidth="1" />
        
        {/* Navigation Icons */}
        <g className={animationState === 0 ? "opacity-100" : "opacity-70"} onClick={() => setAnimationState(0)}>
          <rect x="40" y="633" width="50" height="30" rx="15" fill={animationState === 0 ? "hsl(var(--primary))" : "transparent"} fillOpacity="0.1" />
          <path d="M65 645 L80 635 L80 655 L50 655 L50 635 L65 645" 
                fill="none" 
                stroke={animationState === 0 ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"} 
                strokeWidth="2" />
        </g>
        
        <g className={animationState === 1 ? "opacity-100" : "opacity-70"} onClick={() => setAnimationState(1)}>
          <rect x="155" y="633" width="50" height="30" rx="15" fill={animationState === 1 ? "hsl(var(--primary))" : "transparent"} fillOpacity="0.1" />
          <path d="M165 645 L175 635 L185 645 M165 655 L175 645 L185 655" 
                fill="none" 
                stroke={animationState === 1 ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"} 
                strokeWidth="2" />
        </g>
        
        <g className={animationState === 2 ? "opacity-100" : "opacity-70"} onClick={() => setAnimationState(2)}>
          <rect x="270" y="633" width="50" height="30" rx="15" fill={animationState === 2 ? "hsl(var(--primary))" : "transparent"} fillOpacity="0.1" />
          <circle cx="295" cy="643" r="10" 
                  fill="none" 
                  stroke={animationState === 2 ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"} 
                  strokeWidth="2" />
          <path d="M295 653 L295 663" 
                stroke={animationState === 2 ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"} 
                strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
};

export default InteractiveAppShowcaseSVG; 