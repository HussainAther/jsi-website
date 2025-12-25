import React, { useState, useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { JanusEmitter } from './components/JanusEmitter';
import { InvestorStats } from './components/InvestorStats';
import { getNextRayTrajectory } from './math/steeringLogic';
import { performMARTUpdate } from './math/martEngine';

const App = () => {
  // 1. State Management for the RBYRCT Loop
  const [rays, setRays] = useState(0);
  const [currentSteering, setCurrentSteering] = useState(50);
  const [reconstruction, setReconstruction] = useState(new Float32Array(128 * 128).fill(1));
  const [dcr, setDcr] = useState(1.0);
  const [snr, setSnr] = useState(0.0);

  // 2. Constants from Ather & Gordon (2025)
  const SCOUT_LIMIT = 2500;
  const TOTAL_BUDGET = 12500;

  useEffect(() => {
    if (rays >= TOTAL_BUDGET) return;

    const interval = setInterval(() => {
      const phase = rays < SCOUT_LIMIT ? 'SCOUT' : 'IRRADIATING';
      
      // 3. Logic: Get next aim point
      const nextRay = getNextRayTrajectory(reconstruction, phase, rays);
      
      // 4. Physics Simulation: Update reconstruction (Mocking MART update)
      // In a real run, this would incorporate actual detector data
      const updatedImg = performMARTUpdate(reconstruction, [nextRay.x + nextRay.y * 128], 1.2);
      
      // 5. Update Metrics
      setReconstruction(updatedImg);
      setCurrentSteering((nextRay.x / 128) * 100);
      setRays(prev => prev + 1);

      // Simulate DCR climbing during Irradiating Phase
      if (phase === 'IRRADIATING') {
        setDcr(prev => Math.min(4.58, prev + 0.001));
        setSnr(prev => Math.min(5.4, prev + 0.002));
      }
    }, 20); // Simulating high-speed electronic steering

    return () => clearInterval(interval);
  }, [rays, reconstruction]);

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-white font-sans">
      {/* Header: Corporate Identity */}
      <header className="p-6 border-b border-cyan-900 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tighter text-cyan-400">
            JANUS SPHERE INNOVATIONS
          </h1>
          <p className="text-xs text-slate-500">SYSTEM: RBYRCT v1.0 | LEAD: S. H. ATHER</p>
        </div>
        <div className="flex gap-4">
          <span className={`px-3 py-1 rounded-full text-xs font-mono ${rays < SCOUT_LIMIT ? 'bg-blue-900 text-blue-300' : 'bg-orange-900 text-orange-300'}`}>
            PHASE: {rays < SCOUT_LIMIT ? 'SCOUTING' : 'IRRADIATING'}
          </span>
        </div>
      </header>

      {/* Main Content: 3D Visualization */}
      <main className="flex-grow relative">
        <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
          <color attach="background" args={['#020617']} />
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          
          {/* The Janus Emitter Hardware */}
          <JanusEmitter steeringInput={currentSteering} />
          
          {/* Target Phantom: Visualizing the "Sick Lobe" */}
          <mesh position={[0, -2, 0]}>
            <sphereGeometry args={[2.5, 32, 32]} />
            <meshStandardMaterial color="#1e293b" wireframe transparent opacity={0.3} />
          </mesh>

          {/* Grid Floor */}
          <gridHelper args={[20, 20, '#1e293b', '#0f172a']} position={[0, -4, 0]} />
        </Canvas>

        {/* Real-time SNR/MART Feed Overlay */}
        <div className="absolute bottom-10 left-10 p-4 bg-black/60 border border-slate-800 rounded-lg backdrop-blur-md">
          <p className="text-[10px] text-slate-500 mb-2">MART CONVERGENCE FEED</p>
          <div className="grid grid-cols-8 gap-1">
            {/* Small visualization of the 128x128 grid updates */}
            {[...Array(24)].map((_, i) => (
              <div 
                key={i} 
                className="w-3 h-3 rounded-sm" 
                style={{ backgroundColor: rays > 2500 && i === 12 ? '#22d3ee' : '#1e293b' }}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Footer: Investor Dashboard */}
      <footer className="border-t border-slate-900">
        <InvestorStats rayCount={rays} currentDCR={dcr} snrValue={snr} />
      </footer>
    </div>
  );
};

export default App;
