import { useEffect, useRef, useState } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  vz: number;
  baseOpacity: number;
  currentOpacity: number;
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    // Check if desktop on mount
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize stars - much smaller and simpler
    const starCount = Math.max(100, Math.min(300, Math.floor((window.innerWidth * window.innerHeight) / 8000)));
    starsRef.current = Array.from({ length: starCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random(),
      vz: Math.random() * 0.01 + 0.005,
      baseOpacity: Math.random() * 0.6 + 0.2,
      currentOpacity: Math.random() * 0.6 + 0.2,
    }));

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const animate = () => {
      // Clear canvas completely with dark background
      ctx.fillStyle = "rgba(0, 0, 0, 0)";
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const stars = starsRef.current;
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      const influenceRadius = 250;

      stars.forEach((star) => {
        // Calculate distance to mouse
        const dx = mouseX - star.x;
        const dy = mouseY - star.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Star gets brighter as cursor approaches
        if (distance < influenceRadius) {
          const influence = 1 - distance / influenceRadius;
          star.currentOpacity = star.baseOpacity + influence * 0.7;
        } else {
          star.currentOpacity = star.baseOpacity;
        }

        // Depth effect - stars move slightly forward over time
        star.z += star.vz;
        if (star.z > 1) {
          star.z = 0;
          star.x = Math.random() * canvas.width;
          star.y = Math.random() * canvas.height;
          star.baseOpacity = Math.random() * 0.6 + 0.2;
        }

        // Calculate size based on depth
        const size = star.z * 1.5;

        // Draw simple point star
        ctx.fillStyle = `rgba(200, 220, 255, ${star.currentOpacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, Math.max(0.3, size), 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 1,
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    />
  );
}
