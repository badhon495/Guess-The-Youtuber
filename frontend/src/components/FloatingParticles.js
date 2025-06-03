import React, { useEffect, useRef } from 'react';
import './FloatingParticles.css';

const FloatingParticles = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const colors = ['#ff6b9d', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#a8e6cf', '#ff8a80', '#ff9ff3', '#54a0ff', '#5f27cd'];
    const particleCount = 80;

    // Clear existing particles
    container.innerHTML = '';
    console.log('Creating', particleCount, 'particles');

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'floating-particle';
      
      // Random properties
      const size = Math.random() * 8 + 3; // 3-11px
      const color = colors[Math.floor(Math.random() * colors.length)];
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = Math.random() * 12 + 8; // 8-20s
      const delay = Math.random() * 4; // 0-4s delay
      const opacity = Math.random() * 0.5 + 0.3; // 0.3-0.8 opacity
      
      // Add different movement patterns
      const animationType = Math.floor(Math.random() * 4);
      let animationName = 'floatAnimation';
      
      switch(animationType) {
        case 1: animationName = 'floatWave'; break;
        case 2: animationName = 'floatZigzag'; break;
        case 3: animationName = 'floatSpiral'; break;
        default: animationName = 'floatAnimation';
      }
      
      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, ${color}, transparent 70%);
        left: ${x}%;
        top: ${y}%;
        opacity: ${opacity};
        animation: ${animationName} ${duration}s infinite linear;
        animation-delay: ${delay}s;
        box-shadow: 0 0 ${size * 2}px ${color}40;
      `;
      
      container.appendChild(particle);
    }
    
    console.log('Created', container.children.length, 'particle elements');

    // Enhanced mouse interaction
    const handleMouseMove = (e) => {
      const particles = container.querySelectorAll('.floating-particle');
      const rect = container.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
      const mouseY = ((e.clientY - rect.top) / rect.height) * 100;

      particles.forEach((particle, index) => {
        const particleX = parseFloat(particle.style.left);
        const particleY = parseFloat(particle.style.top);
        const distance = Math.sqrt(
          Math.pow(mouseX - particleX, 2) + Math.pow(mouseY - particleY, 2)
        );

        if (distance < 15) {
          particle.style.transform = `scale(${1.5 + (15 - distance) / 15})`;
          particle.style.opacity = '1';
          particle.style.filter = 'brightness(1.3)';
        } else if (distance < 25) {
          particle.style.transform = 'scale(1.2)';
          particle.style.opacity = '0.9';
          particle.style.filter = 'brightness(1.1)';
        } else {
          particle.style.transform = 'scale(1)';
          particle.style.opacity = particle.dataset.originalOpacity || '0.6';
          particle.style.filter = 'brightness(1)';
        }
      });
    };

    // Store original opacity
    container.querySelectorAll('.floating-particle').forEach(particle => {
      particle.dataset.originalOpacity = particle.style.opacity;
    });

    container.addEventListener('mousemove', handleMouseMove);

    // Click interaction - create burst effect
    const handleClick = (e) => {
      const rect = container.getBoundingClientRect();
      const clickX = ((e.clientX - rect.left) / rect.width) * 100;
      const clickY = ((e.clientY - rect.top) / rect.height) * 100;

      // Create burst particles
      for (let i = 0; i < 6; i++) {
        const burstParticle = document.createElement('div');
        burstParticle.className = 'floating-particle burst-particle';
        
        const size = Math.random() * 4 + 2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const angle = (i * 60) + Math.random() * 30;
        const distance = Math.random() * 100 + 50;
        
        burstParticle.style.cssText = `
          width: ${size}px;
          height: ${size}px;
          background: radial-gradient(circle, ${color}, transparent 70%);
          left: ${clickX}%;
          top: ${clickY}%;
          opacity: 1;
          animation: burstAnimation 1s ease-out forwards;
          animation-delay: ${i * 0.1}s;
          box-shadow: 0 0 ${size * 3}px ${color};
          transform: rotate(${angle}deg) translateY(-${distance}px);
        `;
        
        container.appendChild(burstParticle);
        
        // Remove burst particle after animation
        setTimeout(() => {
          if (burstParticle.parentNode) {
            burstParticle.parentNode.removeChild(burstParticle);
          }
        }, 1500);
      }
    };

    container.addEventListener('click', handleClick);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('click', handleClick);
    };
  }, []);

  return <div ref={containerRef} className="floating-particles-container" />;
};

export default FloatingParticles;
