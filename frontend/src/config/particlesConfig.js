// Particles.js configuration for different themes
export const particlesConfig = {
  dark: {
    particles: {
      number: {
        value: 120,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: ["#ffb6fc", "#b6eaff", "#fffca6", "#baffc9", "#ffb6b9"]
      },
      shape: {
        type: "circle"
      },
      opacity: {
        value: 0.7,
        random: true
      },
      size: {
        value: { min: 2, max: 6 },
        random: true
      },
      move: {
        enable: true,
        speed: 1.5,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out"
      }
    },
    interactivity: {
      detect_on: "window",
      events: {
        onhover: {
          enable: true,
          mode: "repulse"
        },
        onclick: {
          enable: true,
          mode: "push"
        },
        resize: true
      },
      modes: {
        repulse: {
          distance: 100,
          duration: 0.4
        },
        push: {
          particles_nb: 4
        }
      }
    },
    retina_detect: true,
    responsive: [
      {
        breakpoint: 768,
        options: {
          particles: {
            number: {
              value: 60
            },
            move: {
              speed: 1
            }
          },
          interactivity: {
            events: {
              onhover: {
                enable: false
              }
            }
          }
        }
      }
    ]
  },
  light: {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: ["#ff6b9d", "#4ecdc4", "#45b7d1", "#f9ca24", "#6c5ce7"]
      },
      shape: {
        type: "circle"
      },
      opacity: {
        value: 0.5,
        random: true
      },
      size: {
        value: { min: 1, max: 4 },
        random: true
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out"
      }
    },
    interactivity: {
      detect_on: "window",
      events: {
        onhover: {
          enable: true,
          mode: "repulse"
        },
        onclick: {
          enable: true,
          mode: "push"
        },
        resize: true
      },
      modes: {
        repulse: {
          distance: 120,
          duration: 0.3
        },
        push: {
          particles_nb: 3
        }
      }
    },
    retina_detect: true,
    responsive: [
      {
        breakpoint: 768,
        options: {
          particles: {
            number: {
              value: 40
            },
            move: {
              speed: 1.5
            }
          },
          interactivity: {
            events: {
              onhover: {
                enable: false
              }
            }
          }
        }
      }
    ]
  }
};

export default particlesConfig;
