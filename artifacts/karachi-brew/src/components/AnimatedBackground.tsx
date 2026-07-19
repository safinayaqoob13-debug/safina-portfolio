import React from 'react';

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-background">
      {/* Gentle Luxury Gradient Blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] luxury-gradient opacity-50 blur-3xl rounded-full mix-blend-screen" />
      
      {/* Particles / Dust */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      {/* Floating Coffee Beans (Unicode ☕ or custom SVG, using simple circles for particles here) */}
      {[...Array(15)].map((_, i) => {
        const left = `${Math.random() * 100}%`;
        const animationDuration = `${10 + Math.random() * 20}s`;
        const animationDelay = `${Math.random() * 10}s`;
        const size = `${4 + Math.random() * 6}px`;

        return (
          <div
            key={i}
            className="absolute bottom-[-20px] rounded-full bg-primary/20"
            style={{
              left,
              width: size,
              height: size,
              animation: `float ${animationDuration} linear infinite`,
              animationDelay,
            }}
          />
        );
      })}
    </div>
  );
}
