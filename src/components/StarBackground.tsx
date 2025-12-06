import React, { useEffect, useRef } from 'react';

const StarBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let stars: { x: number; y: number; z: number; pz: number }[] = [];

        const numStars = 800;
        const speed = 2; // Speed of stars
        let width = 0;
        let height = 0;
        let cx = 0;
        let cy = 0;

        const initStars = () => {
            stars = [];
            for (let i = 0; i < numStars; i++) {
                stars.push({
                    x: (Math.random() - 0.5) * width * 2,
                    y: (Math.random() - 0.5) * height * 2,
                    z: Math.random() * width,
                    pz: 0 // Previous Z for trails
                });
                stars[i].pz = stars[i].z;
            }
        };

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            cx = width / 2;
            cy = height / 2;
            canvas.width = width;
            canvas.height = height;
            initStars();
        };

        const update = () => {
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, width, height);

            for (let i = 0; i < numStars; i++) {
                const star = stars[i];

                // Move star closer
                star.z -= speed;

                // Reset star if it passes the screen
                if (star.z <= 0) {
                    star.x = (Math.random() - 0.5) * width * 2;
                    star.y = (Math.random() - 0.5) * height * 2;
                    star.z = width;
                    star.pz = width;
                }

                // Project star coordinates
                const x = cx + (star.x / star.z) * width;
                const y = cy + (star.y / star.z) * height;

                // Calculate size based on depth
                const size = (1 - star.z / width) * 3;

                // Draw star
                const shade = Math.floor((1 - star.z / width) * 255);
                ctx.fillStyle = `rgb(${shade}, ${shade}, ${shade})`;

                // Draw trail (optional, for more speed effect)
                const px = cx + (star.x / star.pz) * width;
                const py = cy + (star.y / star.pz) * height;

                ctx.beginPath();
                ctx.moveTo(px, py);
                ctx.lineTo(x, y);
                ctx.strokeStyle = `rgb(${shade}, ${shade}, ${shade})`;
                ctx.lineWidth = size;
                ctx.stroke();

                // Update previous Z
                star.pz = star.z;
            }

            animationFrameId = requestAnimationFrame(update);
        };

        window.addEventListener('resize', resize);
        resize();
        update();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-10"
        />
    );
};

export default StarBackground;
