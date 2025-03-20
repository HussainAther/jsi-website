import { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="p-5 flex justify-between items-center border-b border-gray-700 bg-opacity-80 backdrop-blur-md">
        <h1 className="text-3xl font-bold tracking-wide">Janus Sphere Innovations</h1>
        <nav className="flex gap-6">
          <Link href="/about" className="hover:text-cyan-400 transition duration-200">About</Link>
          <Link href="/tech" className="hover:text-cyan-400 transition duration-200">Tech</Link>
          <Link href="/investors" className="hover:text-cyan-400 transition duration-200">Investors</Link>
        </nav>
      </header>
      
      <main className="flex flex-col items-center justify-center text-center p-10">
        <h2 className="text-5xl font-extrabold mb-5 text-cyan-400 drop-shadow-lg">The Future of Imaging and AI</h2>
        <p className="max-w-2xl text-lg mb-10 text-gray-300 leading-relaxed">
          Explore cutting-edge AI medical imaging, Ray-by-Ray CT, and quantum imaging simulations.
        </p>
        
        <div className="w-full h-96 rounded-lg shadow-lg overflow-hidden border border-gray-700">
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
      
      <section className="p-10 text-center bg-gray-900 bg-opacity-80 rounded-lg shadow-xl mx-5 mt-10">
        <h3 className="text-3xl font-semibold mb-4 text-cyan-400">Our Breakthrough Technology</h3>
        <p className="max-w-3xl mx-auto text-lg text-gray-300 leading-relaxed">
          Using steerable X-ray beams and Janus spheres, we aim to revolutionize breast cancer detection. Our AI-driven CT imaging enhances precision while reducing radiation exposure.
        </p>
      </section>
      
      <footer className="text-center p-5 text-gray-400 border-t border-gray-700 bg-opacity-80 backdrop-blur-md mt-10">
        <p>&copy; {new Date().getFullYear()} Janus Sphere Innovations. All rights reserved.</p>
      </footer>
    </div>
  );
}

