import React from 'react';

const keyframes = `
@keyframes moveBackground {
    0% { background-size: 100% 100%; }
    10% { background-size: 120% 80%; }
    20% { background-size: 190% 140%; }
    30% { background-size: 130% 110%; }
    40% { background-size: 150% 120%; }
    50% { background-size: 180% 100%; }
    60% { background-size: 220% 80%; }
    70% { background-size: 100% 50%; }
    80% { background-size: 120% 70%; }
    90% { background-size: 110% 90%; }
    100% { background-size: 100% 100%; }
}
`;

const injectKeyframes = () => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = keyframes;
    document.head.appendChild(styleSheet);
};

function MeshGradientBackground() {
    React.useEffect(() => {
        injectKeyframes(); 
    }, []);

    return (
        <div className="relative h-screen">
            <div className="absolute top-0 left-0 w-full h-full z-[-1]"
                 style={{
                     backgroundColor: '#ff99df',
                     backgroundImage: `
                         radial-gradient(circle at 52% 73%, hsla(310, 85%, 67%, 1) 0px, transparent 50%),
                         radial-gradient(circle at 0% 30%, hsla(197, 90%, 76%, 1) 0px, transparent 50%),
                         radial-gradient(circle at 41% 26%, hsla(234, 79%, 69%, 1) 0px, transparent 50%),
                         radial-gradient(circle at 41% 51%, hsla(41, 70%, 63%, 1) 0px, transparent 50%),
                         radial-gradient(circle at 41% 88%, hsla(36, 83%, 61%, 1) 0px, transparent 50%),
                         radial-gradient(circle at 76% 73%, hsla(346, 69%, 70%, 1) 0px, transparent 50%),
                         radial-gradient(circle at 29% 37%, hsla(272, 96%, 64%, 1) 0px, transparent 50%)`,
                     backgroundSize: '150% 150%',
                     filter: 'blur(80px)',
                     animation: 'moveBackground 10s linear infinite',
                 }}></div>
        </div>
    );
}

export default MeshGradientBackground;
