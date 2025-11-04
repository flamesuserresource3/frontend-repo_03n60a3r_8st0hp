import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

const MagneticButton = ({ children, onClick }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * 0.2);
    y.set(dy * 0.2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div style={{ x: springX, y: springY }} onMouseMove={handleMouseMove} onMouseLeave={reset} ref={ref} className="inline-block">
      <button onClick={onClick} className="relative inline-flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-white bg-transparent border border-white/20 hover:border-white/40 transition shadow-[0_0_20px_rgba(255,255,255,0.15)]">
        <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#7C3AED]/30 via-[#06B6D4]/20 to-[#EC4899]/30 opacity-0 group-hover:opacity-100 blur pointer-events-none" />
        {children}
      </button>
    </motion.div>
  );
};

const Splash = ({ onOpen }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  const reduceMotion = useMemo(() => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const manager = new THREE.LoadingManager();
    manager.onProgress = (_, loaded, total) => setProgress(Math.round((loaded / total) * 100));
    manager.onLoad = () => setReady(true);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(container.clientWidth, container.clientHeight);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x06060a, 60, 300);

    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 4, 18);

    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(container.clientWidth, container.clientHeight), reduceMotion ? 0.4 : 0.9, 0.6, 0.85);
    composer.addPass(renderPass);
    composer.addPass(bloomPass);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);
    const dir = new THREE.DirectionalLight(0xb0c4ff, 0.8);
    dir.position.set(5, 10, 7);
    scene.add(dir);

    // Stars field
    const starCount = window.innerWidth < 768 ? 600 : 1500;
    const starGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    const color = new THREE.Color();
    for (let i = 0; i < starCount; i++) {
      const r = 180 * Math.random() + 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      color.setHSL(0.6 + Math.random() * 0.2, 0.6, 0.7 + Math.random() * 0.3);
      colors.set([color.r, color.g, color.b], i * 3);
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const starMat = new THREE.PointsMaterial({ size: 0.9, vertexColors: true, transparent: true, opacity: 0.9 });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // Aurora shader
    const auroraGeo = new THREE.PlaneGeometry(60, 30, 64, 64);
    const auroraMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color('#06B6D4') }, // teal
        uColor2: { value: new THREE.Color('#7C3AED') }, // purple
        uColor3: { value: new THREE.Color('#EC4899') }, // pink
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPos;
        void main() {
          vUv = uv;
          vPos = position;
          vec3 p = position;
          p.y += sin((p.x + p.y) * 0.2 + ${reduceMotion ? '0.0' : 'uTime * 0.6'}) * 0.6;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform vec3 uColor1; uniform vec3 uColor2; uniform vec3 uColor3;
        uniform float uTime;
        void main(){
          float g = smoothstep(0.0, 1.0, vUv.y);
          float wave = ${reduceMotion ? '0.2' : '(sin(vUv.x*8.0 + uTime*1.2)*0.5+0.5)'};
          vec3 col = mix(uColor1, uColor2, g);
          col = mix(col, uColor3, wave*0.6);
          float alpha = 0.35 * (1.0 - smoothstep(0.0, 0.12, abs(vUv.y-0.5)));
          gl_FragColor = vec4(col, alpha);
        }
      `,
    });
    const aurora = new THREE.Mesh(auroraGeo, auroraMat);
    aurora.position.set(0, 10, -30);
    scene.add(aurora);

    // Planets and moon
    const group = new THREE.Group();
    scene.add(group);

    const planetMat1 = new THREE.MeshStandardMaterial({ color: 0x6ee7ff, emissive: 0x113355, metalness: 0.3, roughness: 0.6 });
    const planet1 = new THREE.Mesh(new THREE.SphereGeometry(2.3, 48, 48), planetMat1);
    planet1.position.set(-8, 2, -5);
    group.add(planet1);

    const planetMat2 = new THREE.MeshStandardMaterial({ color: 0xd946ef, emissive: 0x330a2b, metalness: 0.4, roughness: 0.5 });
    const planet2 = new THREE.Mesh(new THREE.SphereGeometry(1.6, 48, 48), planetMat2);
    planet2.position.set(6, -1, -3);
    group.add(planet2);

    const texLoader = new THREE.TextureLoader(manager);
    const moonTex = texLoader.load('https://threejs.org/examples/textures/moon_1024.jpg');
    const moon = new THREE.Mesh(new THREE.SphereGeometry(1.2, 48, 48), new THREE.MeshStandardMaterial({ map: moonTex, emissive: 0x111111, emissiveIntensity: 0.4 }));
    moon.position.set(1, 3.5, -6);
    group.add(moon);

    const moonGlowGeo = new THREE.SphereGeometry(1.45, 32, 32);
    const moonGlowMat = new THREE.MeshBasicMaterial({ color: 0x88ccff, transparent: true, opacity: 0.25, blending: THREE.AdditiveBlending });
    const moonGlow = new THREE.Mesh(moonGlowGeo, moonGlowMat);
    moonGlow.position.copy(moon.position);
    group.add(moonGlow);

    // Orbits
    const pivots = [new THREE.Object3D(), new THREE.Object3D()];
    scene.add(pivots[0]); scene.add(pivots[1]);
    planet1.position.set(8, 0, 0);
    pivots[0].add(planet1);
    planet2.position.set(-6, 0, 0);
    pivots[1].add(planet2);
    pivots[0].position.set(0, 0, -10);
    pivots[1].position.set(0, 0, -14);

    // Interactions
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const hoverables = [planet1, planet2, moon];
    let hovered = null;
    const baseScales = new Map(hoverables.map((m) => [m.uuid, m.scale.clone()]));
    const rotationSpeeds = new Map([[planet1.uuid, 0.005],[planet2.uuid, 0.007],[moon.uuid, 0.003]]);

    const explosions = [];

    function createExplosion(point) {
      const count = 100;
      const geo = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const velocities = [];
      for (let i = 0; i < count; i++) {
        positions[i * 3] = point.x;
        positions[i * 3 + 1] = point.y;
        positions[i * 3 + 2] = point.z;
        const dir = new THREE.Vector3((Math.random() - 0.5), (Math.random() - 0.5), (Math.random() - 0.5)).normalize().multiplyScalar(Math.random() * 0.4 + 0.2);
        velocities.push(dir);
      }
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const mat = new THREE.PointsMaterial({ color: 0xffbbff, size: 0.15, transparent: true, opacity: 1, blending: THREE.AdditiveBlending });
      const points = new THREE.Points(geo, mat);
      scene.add(points);
      explosions.push({ points, velocities, life: 1 });
    }

    function onPointerMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    }
    function onClick() {
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(hoverables, false);
      if (hits.length) createExplosion(hits[0].point);
    }

    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('click', onClick);

    // Resize
    function onResize() {
      const w = container.clientWidth; const h = container.clientHeight;
      camera.aspect = w / h; camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
    }
    window.addEventListener('resize', onResize);

    let t = 0;
    let rafId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const dt = clock.getDelta();
      t += dt;

      // Stars twinkle
      starMat.opacity = 0.85 + Math.sin(t * 1.5) * 0.1;

      // Orbits
      if (!reduceMotion) {
        pivots[0].rotation.y += 0.0015;
        pivots[1].rotation.y -= 0.0010;
      }

      // Self rotations
      hoverables.forEach((m) => {
        const rs = rotationSpeeds.get(m.uuid) || 0.004;
        m.rotation.y += rs * (reduceMotion ? 0.4 : 1);
      });

      // Hover effects
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(hoverables, false);
      const hit = intersects[0]?.object || null;
      if (hovered !== hit) {
        if (hovered) {
          const s = baseScales.get(hovered.uuid);
          hovered.scale.lerp(s, 0.2);
          rotationSpeeds.set(hovered.uuid, (rotationSpeeds.get(hovered.uuid) || 0.004) * 0.5);
        }
        hovered = hit;
      }
      if (hovered) {
        hovered.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.2);
        rotationSpeeds.set(hovered.uuid, 0.02);
      }

      // Explosions update
      for (let i = explosions.length - 1; i >= 0; i--) {
        const ex = explosions[i];
        const pos = ex.points.geometry.attributes.position;
        for (let j = 0; j < ex.velocities.length; j++) {
          const v = ex.velocities[j];
          pos.setX(j, pos.getX(j) + v.x * 1.2);
          pos.setY(j, pos.getY(j) + v.y * 1.2);
          pos.setZ(j, pos.getZ(j) + v.z * 1.2);
        }
        pos.needsUpdate = true;
        ex.life -= dt * 0.8;
        ex.points.material.opacity = Math.max(0, ex.life);
        if (ex.life <= 0) {
          scene.remove(ex.points);
          ex.points.geometry.dispose();
          ex.points.material.dispose();
          explosions.splice(i, 1);
        }
      }

      // Aurora time
      auroraMat.uniforms.uTime.value = t;

      composer.render();
      rafId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('click', onClick);
      composer.dispose();
      renderer.dispose();
      starGeo.dispose();
      starMat.dispose();
      auroraGeo.dispose();
      auroraMat.dispose();
    };
  }, [reduceMotion]);

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-[#05060a]">
      <div ref={containerRef} className="absolute inset-0">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_400px_at_20%_20%,rgba(124,58,237,0.15),transparent),radial-gradient(600px_300px_at_80%_60%,rgba(6,182,212,0.15),transparent)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 sm:pt-36 text-center">
        <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-white">
          Hello, I’m Khalif Siregar
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.8 }} className="mt-4 text-slate-300">
          Kotlin & Flutter specialist — immersive experiences with performance.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="mt-10">
          <MagneticButton onClick={onOpen}>Open</MagneticButton>
        </motion.div>
      </div>

      <AnimatePresence>
        {!ready && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute bottom-0 left-0 right-0 mx-auto w-full max-w-xl mb-10 px-6">
            <div aria-label="Loading 3D assets" className="h-2 rounded-full bg-white/10 overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} className="h-full bg-gradient-to-r from-[#00C9FF] to-[#92FE9D]" />
            </div>
            <p className="mt-2 text-center text-xs text-slate-400">Loading {progress}%</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Splash;
