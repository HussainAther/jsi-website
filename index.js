import { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="p-5 flex justify-between items-center border-b border-gray-700">
        <h1 className="text-3xl font-bold">Janus Sphere Innovations</h1>
        <nav>
          <Link href="/about" className="mx-4 hover:text-gray-400">About</Link>
          <Link href="/tech" className="mx-4 hover:text-gray-400">Tech</Link>
          <Link href="/investors" className="mx-4 hover:text-gray-400">Investors</Link>
        </nav>
      </header>
      
      <main className="flex flex-col items-center justify-center text-center p-10">
        <h2 className="text-4xl font-semibold mb-5">The Future of Imaging and AI</h2>
        <p className="max-w-2xl text-lg mb-10 text-gray-300">
          Explore cutting-edge AI medical imaging, Ray-by-Ray CT, and quantum imaging simulations.
        </p>
        
        <div className="w-full h-96">
          <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <mesh>
              <sphereGeometry args={[1, 64, 64]} />
              <meshStandardMaterial color="cyan" wireframe />
            </mesh>
            <OrbitControls />
          </Canvas>
        </div>
      </main>
      
      <section className="p-10 text-center">
        <h3 className="text-3xl font-semibold mb-4">Our Breakthrough Technology</h3>
        <p className="max-w-3xl mx-auto text-lg text-gray-400">
          Using steerable X-ray beams and Janus spheres, we aim to revolutionize breast cancer detection. Our AI-driven CT imaging enhances precision while reducing radiation exposure.
        </p>
      </section>
      
      <footer className="text-center p-5 text-gray-400 border-t border-gray-700">
        &copy; {new Date().getFullYear()} Janus Sphere Innovations. All rights reserved.
      </footer>
    </div>
  );
}

