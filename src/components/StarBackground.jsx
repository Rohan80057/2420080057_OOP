import { useEffect, useRef } from "react";

/**
 * StarBackground.jsx (Optimized Milky Way)
 * - Renders a slowly rotating Milky Way galaxy image as a backdrop.
 * - Features a slower, more majestic multi-layered star animation.
 * - Retains high-performance optimizations for a smooth experience.
 */
export default function StarBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  // Ref to hold the loaded galaxy image
  const galaxyImageRef = useRef(null);

  useEffect(() => {
    // Load the galaxy image
    const img = new Image();
    img.src = "/milky-way.jpg"; // Place the image in your /public folder
    img.onload = () => {
      galaxyImageRef.current = img;
    };

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });

    let dpr = Math.max(1, window.devicePixelRatio || 1);
    let w = Math.floor(window.innerWidth);
    let h = Math.floor(window.innerHeight);

    function setCanvasSize() {
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.scale(dpr, dpr);
    }
    setCanvasSize();

    // Slower, more majestic layer configuration
    const LAYERS = [
      { count: Math.round((w * h) / 15000), speed: 1, size: [0.8, 2.0], alpha: [0.6, 0.9] }, // near
      { count: Math.round((w * h) / 20000), speed: 0.5, size: [0.4, 1.0], alpha: [0.4, 0.75] }, // mid
      { count: Math.round((w * h) / 35000), speed: 0.2, size: [0.2, 0.6], alpha: [0.25, 0.6] }, // far
    ];

    const layers = LAYERS.map((cfg) => {
      const stars = Array.from({ length: cfg.count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * (cfg.size[1] - cfg.size[0]) + cfg.size[0],
        phase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.4 + Math.random() * 0.8,
        angle: Math.random() * Math.PI * 2,
        drift: (Math.random() * 0.4 + 0.1) * (cfg.speed / 4),
        alpha: Math.random() * (cfg.alpha[1] - cfg.alpha[0]) + cfg.alpha[0],
        drawProps: { x: 0, y: 0, r: 0, alpha: 0 },
      }));
      return { cfg, stars };
    });

    let globalAngle = Math.random() * Math.PI * 2;
    let galaxyRotation = 0;
    let last = performance.now();
    let rafId = null;

    const parallaxFactor = [0.03, 0.015, 0.005];

    function onResize() {
      dpr = Math.max(1, window.devicePixelRatio || 1);
      w = Math.floor(window.innerWidth);
      h = Math.floor(window.innerHeight);
      setCanvasSize();
      layers.forEach(l => {
        l.stars.forEach(s => {
          s.x = Math.min(Math.max(s.x, 0), w);
          s.y = Math.min(Math.max(s.y, 0), h);
        });
      });
    }
    window.addEventListener("resize", onResize);

    function onMouseMove(e) {
      mouseRef.current.x = (e.clientX / w) - 0.5;
      mouseRef.current.y = (e.clientY / h) - 0.5;
    }
    window.addEventListener("mousemove", onMouseMove);

    function draw(now) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      globalAngle += 0.0001 * dt * 1000;
      galaxyRotation += 0.000005 * dt * 1000; // Extremely slow rotation

      ctx.fillStyle = "rgb(3,4,18)";
      ctx.fillRect(0, 0, w, h);
      
      // Draw the Milky Way background if the image has loaded
      if (galaxyImageRef.current) {
        ctx.save();
        ctx.globalAlpha = 0.4; // Make it subtle
        ctx.translate(w / 2, h / 2);
        ctx.rotate(galaxyRotation);
        // Draw the image centered and scaled to cover the canvas
        const img = galaxyImageRef.current;
        const aspect = img.width / img.height;
        const drawH = h * 1.5; // Scale image to be larger than canvas
        const drawW = drawH * aspect;
        ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
        ctx.restore();
      }

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let li = 0; li < layers.length; li++) {
        const { cfg, stars } = layers[li];
        const pFactor = parallaxFactor[li];
        const layerDriftX = Math.cos(globalAngle + li) * (cfg.speed * 0.02);
        const layerDriftY = Math.sin(globalAngle + li) * (cfg.speed * 0.02);

        for (const s of stars) {
          s.phase += s.twinkleSpeed * dt;
          const tw = 0.6 + 0.8 * Math.abs(Math.sin(s.phase));

          s.x += (Math.cos(s.angle) * s.drift + layerDriftX) * dt * 60;
          s.y += (Math.sin(s.angle) * s.drift + layerDriftY) * dt * 60;

          if (s.x < -20) s.x = w + 20; else if (s.x > w + 20) s.x = -20;
          if (s.y < -20) s.y = h + 20; else if (s.y > h + 20) s.y = -20;

          const px = mx * w * pFactor * -1;
          const py = my * h * pFactor * -1;

          s.drawProps = {
            x: s.x + px,
            y: s.y + py,
            r: s.r * tw,
            alpha: s.alpha * (tw / 1.4),
          };
        }
      }

      ctx.globalCompositeOperation = "lighter";
      for (const { stars } of layers) {
        for (const s of stars) {
          const { x, y, r, alpha } = s.drawProps;
          ctx.beginPath();
          ctx.fillStyle = `rgba(180, 200, 255, ${Math.min(alpha * 0.6, 1).toFixed(3)})`;
          ctx.arc(x, y, r + 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalCompositeOperation = "source-over";
      for (const { stars } of layers) {
        for (const s of stars) {
          const { x, y, r, alpha } = s.drawProps;
          ctx.beginPath();
          ctx.fillStyle = `rgba(230, 235, 255, ${Math.min(alpha * 0.8, 1).toFixed(3)})`;
          ctx.arc(x, y, Math.max(0.1, r * 0.3), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      rafId = requestAnimationFrame(draw);
    }

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        backgroundColor: "rgb(3,4,18)", // Fallback background color
      }}
    />
  );
}