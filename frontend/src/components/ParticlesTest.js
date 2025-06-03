import React, { useCallback, useEffect, useState } from 'react';
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesTest = () => {
    const [particlesLoaded, setParticlesLoaded] = useState(false);
    const [particleCount, setParticleCount] = useState(0);
    
    const particlesInit = useCallback(async engine => {
        console.log("TEST: Initializing particles engine...");
        try {
            await loadSlim(engine);
            console.log("TEST: Particles engine initialized successfully!");
        } catch (error) {
            console.error("TEST: Failed to initialize particles engine:", error);
        }
    }, []);

    const particlesLoadedCallback = useCallback(async container => {
        console.log("TEST: Particles loaded successfully! Container:", container);
        if (container && container.particles) {
            console.log("TEST: Particles count:", container.particles.count);
            setParticleCount(container.particles.count);
        }
        setParticlesLoaded(true);
    }, []);

    const simpleParticlesOptions = {
        background: {
            color: {
                value: "transparent"
            }
        },
        fpsLimit: 60,
        particles: {
            color: {
                value: "#ff6b9d"
            },
            move: {
                direction: "none",
                enable: true,
                outModes: {
                    default: "out"
                },
                random: false,
                speed: 2,
                straight: false
            },
            number: {
                density: {
                    enable: true,
                    area: 800
                },
                value: 50
            },
            opacity: {
                value: 1.0
            },
            shape: {
                type: "circle"
            },
            size: {
                value: 5
            }
        },
        detectRetina: true
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
            {/* Status indicator */}
            <div style={{
                position: 'fixed',
                top: '10px',
                left: '10px',
                background: 'rgba(0,0,0,0.8)',
                color: 'white',
                padding: '10px',
                borderRadius: '5px',
                fontSize: '12px',
                zIndex: 1000
            }}>
                Particles Status: {particlesLoaded ? `✅ Loaded (${particleCount})` : '⏳ Loading...'}
            </div>
            
            <Particles
                id="tsparticles-test"
                init={particlesInit}
                loaded={particlesLoadedCallback}
                options={simpleParticlesOptions}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%'
                }}
            />
        </div>
    );
};

export default ParticlesTest;
