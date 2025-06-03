import React, { useCallback } from 'react';
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesBackground = () => {
    
    const particlesInit = useCallback(async engine => {
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        console.log("Particles loaded successfully!");
    }, []);

    const particlesOptions = {
        background: {
            color: {
                value: "transparent"
            }
        },
        fpsLimit: 120,
        particles: {
            color: {
                value: ["#ff6b9d", "#4ecdc4", "#45b7d1", "#f9ca24", "#6c5ce7", "#a8e6cf", "#ff8a80", "#ffb3ba", "#bae1ff", "#baffc9", "#ffffba"]
            },
            move: {
                direction: "none",
                enable: true,
                outModes: {
                    default: "out"
                },
                random: true,
                speed: { min: 0.5, max: 1.5 },
                straight: false
            },
            number: {
                density: {
                    enable: true,
                    area: 800
                },
                value: 100
            },
            opacity: {
                value: { min: 0.4, max: 0.9 },
                animation: {
                    enable: true,
                    speed: 1,
                    minimumValue: 0.3
                }
            },
            shape: {
                type: "circle"
            },
            size: {
                value: { min: 3, max: 10 },
                animation: {
                    enable: true,
                    speed: 2,
                    minimumValue: 2
                }
            }
        },
        interactivity: {
            detectOn: "canvas",
            events: {
                onHover: {
                    enable: true,
                    mode: "bubble"
                },
                onClick: {
                    enable: true,
                    mode: "push"
                }
            },
            modes: {
                bubble: {
                    distance: 150,
                    size: 15,
                    duration: 0.4
                },
                push: {
                    quantity: 3
                }
            }
        },
        detectRetina: true
    };

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={particlesOptions}
        />
    );
};

export default ParticlesBackground;
