import React, { useCallback } from 'react';
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const TestParticles = () => {
    const particlesInit = useCallback(async engine => {
        console.log("TestParticles: Initializing engine");
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        console.log("TestParticles: Particles loaded", container);
    }, []);

    return (
        <Particles
            id="test-particles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                background: {
                    color: {
                        value: "transparent",
                    },
                },
                fpsLimit: 120,
                particles: {
                    color: {
                        value: "#ff0000", // Red particles for visibility
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
                        value: 50,
                    },
                    opacity: {
                        value: 1,
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 5, max: 10 },
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
                zIndex: 1,
            }}
        />
    );
};

export default TestParticles;
