import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { ThemeMode } from '../types';

interface GlobeCanvasProps {
  theme: ThemeMode;
  impulseTrigger?: number;
}

const GlobeCanvas: React.FC<GlobeCanvasProps> = ({ theme, impulseTrigger = 0 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<ThemeMode>(theme);
  const spinPulseRef = useRef<number>(0);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    if (impulseTrigger > 0) {
      spinPulseRef.current = Math.min(spinPulseRef.current + 1.8, 3.5);
    }
  }, [impulseTrigger]);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const currentContainer = containerRef.current;
    const canvas = canvasRef.current;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });

    const gl = renderer.getContext();
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    const rendererStr = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : '';
    const isSoftwareGl = /SwiftShader|llvmpipe|Software|Microsoft Basic Render/i.test(rendererStr);

    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(currentContainer.clientWidth, currentContainer.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene = new THREE.Scene();

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;

    const fog = new THREE.FogExp2(themeRef.current === 'dark' ? 0x050507 : 0xeef2f7, 0.085);
    scene.fog = fog;

    const camera = new THREE.PerspectiveCamera(
      52,
      currentContainer.clientWidth / currentContainer.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.1, 4.15);

    // Clean, monochromatic studio lighting
    const hemiLight = new THREE.HemisphereLight(0xf8fafc, 0x09090b, 0.8);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight.position.set(5, 8, 6);
    scene.add(dirLight);

    const rimLight = new THREE.PointLight(0xe4e4e7, 1.8, 14);
    rimLight.position.set(-4, -2.5, 3);
    scene.add(rimLight);

    // Root 3D System Assembly (Monochrome Bittensor Geodesic Core & Rings)
    const rootAssembly = new THREE.Group();
    scene.add(rootAssembly);

    const coreAssembly = new THREE.Group();
    rootAssembly.add(coreAssembly);

    // Part 1A: Innerfaceted metallic nucleus (Icosahedron)
    const nucleusGeo = new THREE.IcosahedronGeometry(0.62, 1);
    const nucleusMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      metalness: 0.9,
      roughness: 0.22,
      flatShading: true,
    });
    const nucleusMesh = new THREE.Mesh(nucleusGeo, nucleusMat);
    nucleusMesh.name = 'interactive-core';
    coreAssembly.add(nucleusMesh);

    // Part 1B: Subtle silver wireframe inner shell
    const innerPulseGeo = new THREE.IcosahedronGeometry(0.65, 1);
    const innerPulseMat = new THREE.MeshStandardMaterial({
      color: 0xd4d4d8,
      emissive: 0x52525b,
      emissiveIntensity: 0.25,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const innerPulseMesh = new THREE.Mesh(innerPulseGeo, innerPulseMat);
    coreAssembly.add(innerPulseMesh);

    // Part 1C: Primary geodesic wireframe sphere
    const geodesicGeo = new THREE.SphereGeometry(1.08, isSoftwareGl ? 20 : 28, isSoftwareGl ? 14 : 20);
    const geodesicMat = new THREE.MeshStandardMaterial({
      color: 0xe4e4e7,
      metalness: 0.5,
      roughness: 0.3,
      wireframe: true,
      transparent: true,
      opacity: 0.14,
    });
    const geodesicMesh = new THREE.Mesh(geodesicGeo, geodesicMat);
    coreAssembly.add(geodesicMesh);

    // Part 1D: Outer neural icosahedron lattice + monochrome silver vertex points
    const latticeGeo = new THREE.IcosahedronGeometry(1.26, 2);
    const latticeMat = new THREE.MeshBasicMaterial({
      color: 0xa1a1aa,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const latticeMesh = new THREE.Mesh(latticeGeo, latticeMat);
    coreAssembly.add(latticeMesh);

    const nodesMat = new THREE.PointsMaterial({
      color: 0xf4f4f5,
      size: 0.026,
      transparent: true,
      opacity: 0.65,
    });
    const nodesPoints = new THREE.Points(latticeGeo, nodesMat);
    coreAssembly.add(nodesPoints);

    // Part 2: Dual Machined Monochrome Gyroscope Rings
    const ringInnerGeo = new THREE.TorusGeometry(1.5, 0.012, 16, isSoftwareGl ? 64 : 100);
    const ringInnerMat = new THREE.MeshStandardMaterial({
      color: 0xe4e4e7,
      metalness: 0.9,
      roughness: 0.2,
      transparent: true,
      opacity: 0.55,
    });
    const ringInnerMesh = new THREE.Mesh(ringInnerGeo, ringInnerMat);
    ringInnerMesh.rotation.x = Math.PI * 0.38;
    ringInnerMesh.rotation.y = Math.PI * 0.12;
    rootAssembly.add(ringInnerMesh);

    const ringOuterGeo = new THREE.TorusGeometry(1.82, 0.009, 16, isSoftwareGl ? 64 : 110);
    const ringOuterMat = new THREE.MeshStandardMaterial({
      color: 0xa1a1aa,
      metalness: 0.85,
      roughness: 0.25,
      transparent: true,
      opacity: 0.4,
    });
    const ringOuterMesh = new THREE.Mesh(ringOuterGeo, ringOuterMat);
    ringOuterMesh.rotation.x = -Math.PI * 0.32;
    ringOuterMesh.rotation.z = Math.PI * 0.18;
    rootAssembly.add(ringOuterMesh);

    // Pre-allocate scratch math objects outside render loop
    const pointerNdc = new THREE.Vector2(0, 0);
    const targetParallax = new THREE.Vector2(0, 0);
    const raycaster = new THREE.Raycaster();
    const interactiveMeshes: THREE.Object3D[] = [nucleusMesh];
    let coreTargetScale = 1;
    let coreCurrentScale = 1;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = currentContainer.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      pointerNdc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerNdc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      targetParallax.x = pointerNdc.x * 0.35;
      targetParallax.y = pointerNdc.y * 0.24;

      raycaster.setFromCamera(pointerNdc, camera);
      const hits = raycaster.intersectObjects(interactiveMeshes, false);
      coreTargetScale = hits.length > 0 ? 1.14 : 1;
    };

    const handlePointerDown = (e: PointerEvent) => {
      const targetEl = e.target as HTMLElement;
      if (targetEl && targetEl.closest('#windows-container .pointer-events-auto, button, a, input, textarea')) {
        return;
      }
      spinPulseRef.current = Math.min(spinPulseRef.current + 1.4, 3.2);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });

    const clock = new THREE.Clock();
    let animationFrameId = 0;
    let disposed = false;

    const renderScene = () => {
      const dt = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();

      const isDark = themeRef.current === 'dark';
      fog.color.setHex(isDark ? 0x050507 : 0xeef2f7);
      nucleusMat.color.setHex(isDark ? 0x18181b : 0x334155);
      geodesicMat.color.setHex(isDark ? 0xe4e4e7 : 0x334155);
      geodesicMat.opacity = isDark ? 0.13 : 0.22;
      latticeMat.color.setHex(isDark ? 0xa1a1aa : 0x475569);
      latticeMat.opacity = isDark ? 0.07 : 0.15;
      nodesMat.color.setHex(isDark ? 0xf4f4f5 : 0x1e293b);
      ringInnerMat.color.setHex(isDark ? 0xe4e4e7 : 0x475569);
      ringOuterMat.color.setHex(isDark ? 0xa1a1aa : 0x64748b);

      spinPulseRef.current = THREE.MathUtils.damp(spinPulseRef.current, 0, 2.2, dt);
      const speedMultiplier = 1 + spinPulseRef.current;

      rootAssembly.rotation.y = THREE.MathUtils.damp(
        rootAssembly.rotation.y,
        targetParallax.x,
        4.0,
        dt
      );
      rootAssembly.rotation.x = THREE.MathUtils.damp(
        rootAssembly.rotation.x,
        targetParallax.y,
        4.0,
        dt
      );

      coreCurrentScale = THREE.MathUtils.damp(coreCurrentScale, coreTargetScale, 7.0, dt);
      const breath = 1 + Math.sin(elapsed * 2.0) * 0.02 + spinPulseRef.current * 0.035;
      nucleusMesh.scale.setScalar(coreCurrentScale * breath);
      innerPulseMesh.scale.setScalar(coreCurrentScale * (breath + 0.025));

      nucleusMesh.rotation.y += dt * 0.32 * speedMultiplier;
      nucleusMesh.rotation.x += dt * 0.16 * speedMultiplier;
      innerPulseMesh.rotation.y -= dt * 0.4 * speedMultiplier;
      geodesicMesh.rotation.y += dt * 0.11 * speedMultiplier;
      latticeMesh.rotation.y -= dt * 0.07 * speedMultiplier;
      latticeMesh.rotation.z += dt * 0.04 * speedMultiplier;
      nodesPoints.rotation.copy(latticeMesh.rotation);

      ringInnerMesh.rotation.z += dt * 0.22 * speedMultiplier;
      ringInnerMesh.rotation.y += dt * 0.08 * speedMultiplier;
      ringOuterMesh.rotation.z -= dt * 0.16 * speedMultiplier;
      ringOuterMesh.rotation.x += dt * 0.06 * speedMultiplier;

      renderer.render(scene, camera);
    };

    const afterDraw = (cb: () => void) => {
      if (isSoftwareGl && typeof (gl as WebGL2RenderingContext).fenceSync === 'function') {
        const gl2 = gl as WebGL2RenderingContext;
        const sync = gl2.fenceSync(gl2.SYNC_GPU_COMMANDS_COMPLETE, 0);
        gl2.flush();
        const poll = () => {
          if (disposed || !sync) return;
          const status = gl2.clientWaitSync(sync, 0, 0);
          if (status === gl2.TIMEOUT_EXPIRED) {
            setTimeout(poll, 4);
            return;
          }
          gl2.deleteSync(sync);
          cb();
        };
        setTimeout(poll, 0);
      } else {
        cb();
      }
    };

    const loop = () => {
      if (disposed) return;
      renderScene();
      afterDraw(() => {
        if (!disposed) {
          animationFrameId = requestAnimationFrame(loop);
        }
      });
    };

    animationFrameId = requestAnimationFrame(loop);

    const handleResize = () => {
      if (!currentContainer) return;
      camera.aspect = currentContainer.clientWidth / currentContainer.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentContainer.clientWidth, currentContainer.clientHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(currentContainer);

    return () => {
      disposed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      resizeObserver.unobserve(currentContainer);
      pmremGenerator.dispose();
      envTexture.dispose();
      renderer.dispose();
      nucleusGeo.dispose();
      nucleusMat.dispose();
      innerPulseGeo.dispose();
      innerPulseMat.dispose();
      geodesicGeo.dispose();
      geodesicMat.dispose();
      latticeGeo.dispose();
      latticeMat.dispose();
      nodesMat.dispose();
      ringInnerGeo.dispose();
      ringInnerMat.dispose();
      ringOuterGeo.dispose();
      ringOuterMat.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute top-0 left-0 w-full h-full z-[1]">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};

export default GlobeCanvas;
