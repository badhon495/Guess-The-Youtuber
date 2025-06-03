import React from 'react';

const ParticlesDebug = () => {
  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'rgba(255,255,255,0.1)',
      padding: '10px',
      borderRadius: '5px',
      color: 'white',
      fontSize: '12px',
      zIndex: 1000,
      backdropFilter: 'blur(10px)'
    }}>
      <div>Particles Debug Panel</div>
      <div>Check console for particle logs</div>
      <div>Look for floating colored dots</div>
    </div>
  );
};

export default ParticlesDebug;
