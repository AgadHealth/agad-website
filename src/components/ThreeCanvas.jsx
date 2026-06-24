"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Setup Scene, Camera & Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      100
    );
    camera.position.z = 22;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    containerRef.current.appendChild(renderer.domElement);

    // 2. Generate double helix particles
    const particleCount = 200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3 * 2); // 2 strands
    const colors = new Float32Array(particleCount * 3 * 2);

    const color1 = new THREE.Color("#0066ff"); // primary brand blue
    const color2 = new THREE.Color("#00e5ff"); // accent cyan

    const radius = 3.5;
    const turns = 3;
    const height = 14;

    for (let i = 0; i < particleCount; i++) {
      const t = i / particleCount;
      const angle = t * Math.PI * 2 * turns;
      const y = t * height - height / 2;

      // Strand A
      const idxA = i * 3;
      const xA = Math.cos(angle) * radius;
      const zA = Math.sin(angle) * radius;
      positions[idxA] = xA;
      positions[idxA + 1] = y;
      positions[idxA + 2] = zA;

      colors[idxA] = color1.r;
      colors[idxA + 1] = color1.g;
      colors[idxA + 2] = color1.b;

      // Strand B (offset by 180 degrees)
      const idxB = (particleCount + i) * 3;
      const xB = Math.cos(angle + Math.PI) * radius;
      const zB = Math.sin(angle + Math.PI) * radius;
      positions[idxB] = xB;
      positions[idxB + 1] = y;
      positions[idxB + 2] = zB;

      colors[idxB] = color2.r;
      colors[idxB + 1] = color2.g;
      colors[idxB + 2] = color2.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Custom circular particle texture (using Canvas API drawing)
    const createCircleTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 16;
      canvas.height = 16;
      const ctx = canvas.getContext("2d");
      
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.3, "rgba(255, 255, 255, 0.8)");
      grad.addColorStop(1, "rgba(255, 255, 255, 0)");
      
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 16, 16);
      return new THREE.CanvasTexture(canvas);
    };

    const material = new THREE.PointsMaterial({
      size: 0.35,
      vertexColors: true,
      map: createCircleTexture(),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Subtle supporting glow light
    const pointLight = new THREE.PointLight("#00e5ff", 2, 50);
    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);

    // 3. Mouse Parallax handling
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX - window.innerWidth / 2) / 100;
      mouseY = (event.clientY - window.innerHeight / 2) / 100;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 4. Animation Frame loop
    let reqId;
    const clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Rotate helix slowly
      particles.rotation.y = elapsedTime * 0.25;

      // Parallax smooth interpolation
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      particles.rotation.x = targetY * 0.25;
      particles.rotation.z = targetX * 0.15;

      // Breathing scale effect
      particles.scale.setScalar(1 + Math.sin(elapsedTime * 1.5) * 0.05);

      renderer.render(scene, camera);
    };

    animate();

    // 5. Handle Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(reqId);
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="three-wrapper">
      <div ref={containerRef} className="three-container" />
      <style jsx>{`
        .three-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          overflow: hidden;
          pointer-events: none; /* Let clicks pass through to landing content */
        }
        .three-container {
          width: 100%;
          height: 100%;
          opacity: 0.65;
          filter: blur(0.5px);
        }
      `}</style>
    </div>
  );
}
