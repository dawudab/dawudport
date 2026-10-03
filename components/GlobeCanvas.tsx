
import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { CityTime } from '../types'; // Added
import { CITIES_FOR_CLOCK } from '@/constants'; // Changed from ../constants

const GlobeCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null); // Changed from osEnvRef to containerRef for clarity

  const [worldClocks, setWorldClocks] = useState<CityTime[]>(CITIES_FOR_CLOCK.map(city => ({...city, currentTime: 'Loading...'})));

  const updateWorldClocks = useCallback(() => {
    setWorldClocks(prevClocks =>
      prevClocks.map(city => ({
        ...city,
        currentTime: new Date().toLocaleTimeString('en-GB', {
          timeZone: city.timeZone,
          hour: '2-digit',
          minute: '2-digit',
        }),
      }))
    );
  }, []);

  useEffect(() => {
    updateWorldClocks();
    const clockIntervalId = setInterval(updateWorldClocks, 30000); // Update every 30 seconds
    return () => clearInterval(clockIntervalId);
  }, [updateWorldClocks]);


  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const currentContainer = containerRef.current; // Capture ref value

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true, alpha: true });
    renderer.setSize(currentContainer.clientWidth, currentContainer.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, currentContainer.clientWidth / currentContainer.clientHeight, 0.1, 1000);
    camera.position.z = 2.5;

    scene.add(new THREE.AmbientLight(0xffffff, 0.2));

    const globeGroup = new THREE.Group();
    const wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff41, wireframe: true, transparent: true, opacity: 0.15 });
    const globeMesh = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), wireframeMaterial);
    globeGroup.add(globeMesh);
    scene.add(globeGroup);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      globeGroup.rotation.y += 0.0005;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
        if (!currentContainer) return;
        camera.aspect = currentContainer.clientWidth / currentContainer.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentContainer.clientWidth, currentContainer.clientHeight);
    };

    // Use ResizeObserver for more reliable size detection of the container
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(currentContainer);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.unobserve(currentContainer);
      renderer.dispose();
      wireframeMaterial.dispose();
      globeMesh.geometry.dispose();
    };
  }, []); // Empty dependency array means this runs once on mount and cleans up on unmount

  return (
    <div ref={containerRef} className="absolute top-0 left-0 w-full h-full z-[1]">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div
        className="absolute bottom-[calc(30px+0.5rem)] left-1/2 -translate-x-1/2 w-full px-4
                   flex justify-center items-center flex-wrap gap-x-3 gap-y-1 z-[2] pointer-events-none"
        aria-label="World Times Under Globe"
      >
        {worldClocks.map(city => (
          <span key={city.name} className="text-xs font-['Share_Tech_Mono'] text-green-400/80 whitespace-nowrap">
            <span className="text-white/80">{city.name.toUpperCase()}:</span> {city.currentTime}
          </span>
        ))}
      </div>
    </div>
  );
};

export default GlobeCanvas;
