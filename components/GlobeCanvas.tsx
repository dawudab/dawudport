
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
    const camera = new THREE.PerspectiveCamera(70, currentContainer.clientWidth / currentContainer.clientHeight, 0.1, 1000);
    camera.position.z = 2.55;

    scene.add(new THREE.AmbientLight(0xffffff, 0.3));

    const globeGroup = new THREE.Group();

    // Inner dark occlusion core for depth perception
    const coreGeometry = new THREE.SphereGeometry(0.96, 32, 32);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x050507,
      transparent: true,
      opacity: 0.72,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    globeGroup.add(coreMesh);

    // Primary Bittensor-style fine silver wireframe sphere
    const sphereGeometry = new THREE.SphereGeometry(1, 28, 20);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xe4e4e7,
      wireframe: true,
      transparent: true,
      opacity: 0.11,
    });
    const globeMesh = new THREE.Mesh(sphereGeometry, wireframeMaterial);
    globeGroup.add(globeMesh);

    // Outer neural subnet icosahedron lattice
    const outerLatticeGeometry = new THREE.IcosahedronGeometry(1.12, 2);
    const outerLatticeMaterial = new THREE.MeshBasicMaterial({
      color: 0xa1a1aa,
      wireframe: true,
      transparent: true,
      opacity: 0.05,
    });
    const outerLatticeMesh = new THREE.Mesh(outerLatticeGeometry, outerLatticeMaterial);
    globeGroup.add(outerLatticeMesh);

    // Subtle glowing vertex nodes on the subnet mesh
    const nodesMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.022,
      transparent: true,
      opacity: 0.55,
    });
    const nodesPoints = new THREE.Points(outerLatticeGeometry, nodesMaterial);
    globeGroup.add(nodesPoints);

    // Slight axial tilt for architectural poise
    globeGroup.rotation.z = 0.18;
    globeGroup.rotation.x = 0.12;

    scene.add(globeGroup);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      globeMesh.rotation.y += 0.0006;
      outerLatticeMesh.rotation.y -= 0.00035;
      outerLatticeMesh.rotation.x += 0.00015;
      nodesPoints.rotation.y -= 0.00035;
      nodesPoints.rotation.x += 0.00015;
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
      coreMaterial.dispose();
      coreGeometry.dispose();
      wireframeMaterial.dispose();
      sphereGeometry.dispose();
      outerLatticeMaterial.dispose();
      outerLatticeGeometry.dispose();
      nodesMaterial.dispose();
    };
  }, []); // Empty dependency array means this runs once on mount and cleans up on unmount

  return (
    <div ref={containerRef} className="absolute top-0 left-0 w-full h-full z-[1]">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div
        className="absolute bottom-[calc(38px+0.75rem)] left-1/2 -translate-x-1/2 w-full px-4
                   flex justify-center items-center flex-wrap gap-x-4 gap-y-1 z-[2] pointer-events-none"
        aria-label="World Times Under Globe"
      >
        {worldClocks.map((city, idx) => (
          <React.Fragment key={city.name}>
            <span className="text-[11px] font-['JetBrains_Mono'] tabular-nums tracking-tight text-zinc-300/80 whitespace-nowrap">
              <span className="text-zinc-500">{city.name.toUpperCase()}</span>{' '}
              <span className="text-zinc-200">{city.currentTime}</span>
            </span>
            {idx < worldClocks.length - 1 && (
              <span className="text-zinc-700 text-[10px] hidden sm:inline" aria-hidden="true">·</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default GlobeCanvas;
