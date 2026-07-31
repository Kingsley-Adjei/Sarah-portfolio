import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ScrollCanvasAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    // Set canvas resolution
    canvas.width = 1280;
    canvas.height = 720;

    const frameCount = 100;
    const currentFrame = (index: number) =>
      `/images/ezgif/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`;

    const images: (HTMLImageElement | null)[] = new Array(frameCount).fill(null);
    const frameState = { frame: 0 };
    let loadedCount = 0;

    // Procedural fallback render if frame images are missing or loading
    const renderFallback = (index: number) => {
      if (!context) return;
      const progress = index / (frameCount - 1);
      const width = canvas.width;
      const height = canvas.height;

      // Dark cinematic canvas
      context.fillStyle = '#0a0a0a';
      context.fillRect(0, 0, width, height);

      // Radial spotlight effect moving across screen
      const spotX = width * 0.3 + width * 0.4 * progress;
      const spotY = height * 0.4 + Math.sin(progress * Math.PI * 2) * 40;
      const radius = 350 + Math.sin(progress * Math.PI) * 100;

      const gradient = context.createRadialGradient(spotX, spotY, 20, spotX, spotY, radius);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
      gradient.addColorStop(0.5, 'rgba(120, 120, 120, 0.05)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);

      // Anamorphic flare line
      context.strokeStyle = `rgba(255, 255, 255, ${0.1 + Math.sin(progress * Math.PI) * 0.15})`;
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(0, spotY);
      context.lineTo(width, spotY);
      context.stroke();

      // Film frame grid accent
      context.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      context.strokeRect(40, 30, width - 80, height - 60);

      // Timecode watermark
      context.fillStyle = 'rgba(255, 255, 255, 0.25)';
      context.font = '12px monospace';
      const tcFrame = Math.floor(index % 24).toString().padStart(2, '0');
      const tcSec = Math.floor((index / 24) % 60).toString().padStart(2, '0');
      context.fillText(`TC 00:01:${tcSec}:${tcFrame} [FRAME ${index + 1}/${frameCount}]`, 60, height - 50);
    };

    const render = () => {
      const img = images[frameState.frame];
      if (img && img.complete && img.naturalWidth > 0) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Responsive cover drawing
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;

        context.drawImage(
          img,
          0,
          0,
          img.width,
          img.height,
          centerShift_x,
          centerShift_y,
          img.width * ratio,
          img.height * ratio
        );
      } else {
        renderFallback(frameState.frame);
      }
    };

    // Preload image sequence with error handling fallback
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        images[i] = img;
        loadedCount++;
        if (loadedCount === frameCount) {
          setImagesLoaded(true);
        }
        render();
      };
      img.onerror = () => {
        images[i] = null;
        render();
      };
    }

    // Initial render
    render();

    // GSAP ScrollTrigger binding across hero section
    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: '#home',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.4,
      onUpdate: (self) => {
        const frameIndex = Math.min(
          frameCount - 1,
          Math.floor(self.progress * frameCount)
        );
        frameState.frame = frameIndex;
        render();
      },
    });

    const handleResize = () => {
      render();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      scrollTriggerInstance.kill();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {/* Dimmed backdrop filter and canvas */}
      <div className="absolute inset-0 bg-[#080808]/75 z-10" />
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover grayscale contrast-[1.25] brightness-[0.55]"
      />
    </div>
  );
}
