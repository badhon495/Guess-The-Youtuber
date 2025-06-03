import React, { useCallback } from 'react';
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesBackground = () => {
    
    const particlesInit = useCallback(async engine => {
        console.log("Initializing particles engine...");
        await loadSlim(engine);
        console.log("Particles engine initialized!");
    }, []);

    const particlesLoaded = useCallback(async container => {
        console.log("Particles container loaded:", container);
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                background: {
                    color: {
                        value: "transparent",
                    },
                },
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: {
                            enable: true,
                            mode: "push",
                        },
                        onHover: {
                            enable: true,
                            mode: "repulse",
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 4,
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4,
                        },
                    },
                },
                particles: {
                    color: {
                        value: "#ff6b9d",
                    },
                    links: {
                        color: "#ffffff",
                        distance: 150,
                        enable: false,
                        opacity: 0.5,
                        width: 1,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: 2,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: 80,
                    },
                    opacity: {
                        value: 0.8,
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 2, max: 8 },
                    },
                },
                detectRetina: true,
            }}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 0,
            }}
        />
    );
};

export default ParticlesBackground;
