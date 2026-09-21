import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { motion } from 'framer-motion';
import { Flower3D } from './components/Flower3D';
import { PetalsCanvas } from './components/PetalsCanvas';
import { CTAButtons } from './components/CTAButtons';
import { MessageModal } from './components/MessageModal';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

export default function App() {
  const isMobile = useIsMobile();
  const [isBlooming, setIsBlooming] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  const handleOpenGift = () => {
    setIsBlooming(true);
    setTimeout(() => setIsMessageOpen(true), 800);
  };

  setTimeout(() => setShowButtons(true), 1500);

  return (
    <div className="w-full h-[100dvh] sm:h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(180deg, #0a1628 0%, #0d2847 30%, #0e3d5e 50%, #0d4f6e 70%, #1a6b6e 100%)'
    }}>
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at center bottom, rgba(64,224,208,0.1) 0%, transparent 60%)'
      }} />

      <motion.header
        className="absolute left-1/2 top-8 z-10 w-[calc(100%-2rem)] -translate-x-1/2 text-center sm:top-10"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.25 }}
      >
        <p className="text-[0.65rem] font-medium uppercase tracking-[0.3em] text-[#9de8df] sm:text-xs">
          21 de septiembre · Día de la Primavera
        </p>
        <h1 className="mt-3 font-serif text-3xl leading-tight text-[#fff5c7] [text-shadow:0_2px_18px_rgba(0,0,0,0.35)] sm:text-5xl">
          Para Nay, porque contigo florece el cariño
        </h1>
      </motion.header>

      <Canvas
        camera={{
          position: isMobile ? [0, 1.2, 6.5] : [0, 0.8, 5],
          fov: isMobile ? 55 : 45,
        }}
        style={{ position: 'absolute', inset: 0, background: 'transparent' }}
      >
        <fog attach="fog" args={['#0d2847', 10, 30]} />

        <ambientLight intensity={0.4} color="#e0f7fa" />
        <directionalLight position={[2, 4, 3]} intensity={2} color="#e0f7fa" castShadow />
        <pointLight position={[-2, 2, 2]} intensity={0.8} color="#40e0d0" distance={8} />
        <pointLight position={[1.5, 1, -1.5]} intensity={0.4} color="#20b2aa" distance={6} />
        <pointLight position={[0, 2, 0]} intensity={0.6} color="#e0f7fa" distance={10} />
        <pointLight position={[0, -1, 2]} intensity={0.3} color="#40e0d0" distance={5} />

        <Flower3D isBlooming={isBlooming} />
        <PetalsCanvas isActive={isBlooming} count={isMobile ? 40 : 80} />

        <EffectComposer>
          <Bloom
            luminanceThreshold={0.6}
            luminanceSmoothing={0.4}
            intensity={0.8}
            radius={0.6}
          />
        </EffectComposer>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.8}
          autoRotate
          autoRotateSpeed={0.12}
          target={[0, 0, 0]}
        />
      </Canvas>

      <CTAButtons
        onOpenGift={handleOpenGift}
        showButtons={showButtons}
      />

      <MessageModal
        isOpen={isMessageOpen}
        onClose={() => setIsMessageOpen(false)}
      />
    </div>
  );
}
