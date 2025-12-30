import { useEffect, useRef, useState } from "react";

interface Star {
  x: number;
  y: number;
  y0: number;
  z: number;
  vz: number;
  baseOpacity: number;
  currentOpacity: number;
  vx: number;
  vy: number;
  mass: number;
  twinkleCycle: number;
  twinkeSpeed: number;
  radius: number;
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, vx: 0, vy: 0 });
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();
  const [isDesktop, setIsDesktop] = useState(true);
  const extendRef = useRef(1.5); // Canvas extends 1.5x beyond viewport

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  // Helper function to draw a realistic star
  const drawStar = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    opacity: number
  ) => {
    // Subtle glow
    ctx.fillStyle = `rgba(150, 180, 255, ${opacity * 0.25})`;
    ctx.beginPath();
    ctx.arc(x, y, radius * 2.5, 0, Math.PI * 2);
    ctx.fill();

    // Main star core
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    // Inner bright core
    ctx.fillStyle = `rgba(220, 240, 255, ${opacity * 0.7})`;
    ctx.beginPath();
    ctx.arc(x, y, radius * 0.6, 0, Math.PI * 2);
    ctx.fill();
  };

  useEffect(() => {
    if (!isDesktop) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const extend = extendRef.current;

    // Set canvas size to extend beyond viewport
    const resizeCanvas = () => {
      canvas.width = window.innerWidth * extend;
      canvas.height = window.innerHeight * extend;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize stars with optimized count for performance
    const starCount = Math.max(
      200,
      Math.min(
        600,
        Math.floor((window.innerWidth * window.innerHeight * extend * extend) / 8000),
      ),
    );

    starsRef.current = Array.from({ length: starCount }, () => {
      const radius = Math.random() * 1.2 + 0.6; // Larger stars
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        y0: Math.random() * canvas.height,
        z: Math.random(),
        vz: Math.random() * 0.008 + 0.003,
        baseOpacity: Math.random() * 0.6 + 0.2,
        currentOpacity: Math.random() * 0.6 + 0.2,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.15,
        mass: Math.random() * 0.5 + 0.5,
        twinkleCycle: Math.random() * Math.PI * 2,
        twinkeSpeed: Math.random() * 0.08 + 0.02,
        radius: radius,
      };
    });

    // Mouse tracking with velocity
    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX * extend;
      const newY = e.clientY * extend;

      mouseRef.current.vx = newX - mouseRef.current.x;
      mouseRef.current.vy = newY - mouseRef.current.y;
      mouseRef.current.x = newX;
      mouseRef.current.y = newY;

      lastMouseRef.current.x = newX;
      lastMouseRef.current.y = newY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const stars = starsRef.current;
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      const mouseVx = mouseRef.current.vx;
      const mouseVy = mouseRef.current.vy;
      const attractRadius = 300;
      const repelRadius = 80;

      stars.forEach((star) => {
        // Update twinkling cycle
        star.twinkleCycle += star.twinkeSpeed;
        const twinkle = Math.sin(star.twinkleCycle) * 0.3 + 0.7;

        // Calculate distance to mouse
        const dx = mouseX - star.x;
        const dy = mouseY - star.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Intelligent cursor interaction
        if (distance < attractRadius) {
          if (distance > repelRadius) {
            const influence = 1 - distance / attractRadius;
            const force = influence * 0.15;

            star.vx += (dx / distance) * force * 0.5;
            star.vy += (dy / distance) * force * 0.5;

            star.vx += mouseVx * 0.05;
            star.vy += mouseVy * 0.05;

            star.currentOpacity = (star.baseOpacity + influence * 0.8) * twinkle;
          } else {
            const repelForce = (1 - distance / repelRadius) * 0.2;
            star.vx -= (dx / distance) * repelForce;
            star.vy -= (dy / distance) * repelForce;
            star.currentOpacity = (star.baseOpacity + 0.5) * twinkle;
          }
        } else {
          star.currentOpacity = star.baseOpacity * twinkle;
        }

        // Apply damping
        star.vx *= 0.92;
        star.vy *= 0.92;

        // Gentle gravity back to original Y
        const yDiff = star.y0 - star.y;
        star.vy += yDiff * 0.002;

        // Update position
        star.x += star.vx;
        star.y += star.vy;

        // Depth effect
        star.z += star.vz;
        if (star.z > 1) {
          star.z = 0;
          star.x = Math.random() * canvas.width;
          star.y = Math.random() * canvas.height;
          star.y0 = star.y;
          star.vx = 0;
          star.vy = 0;
          star.baseOpacity = Math.random() * 0.6 + 0.2;
          star.twinkleCycle = Math.random() * Math.PI * 2;
        }

        // Wrap around edges - extend beyond viewport
        if (star.x < -50) star.x = canvas.width + 50;
        if (star.x > canvas.width + 50) star.x = -50;
        if (star.y < -50) star.y = canvas.height + 50;
        if (star.y > canvas.height + 50) star.y = -50;

        // Draw realistic star
        drawStar(ctx, star.x, star.y, star.radius, star.currentOpacity);
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
      className="fixed pointer-events-none"
      style={{
        zIndex: 1,
        top: "-25%",
        left: "-25%",
        width: `${150}%`,
        height: `${150}%`,
      }}
    />
  );
}
