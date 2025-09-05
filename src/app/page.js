"use client";

import { Canvas } from "@react-three/fiber";
import { Experience } from "./(pages)/Experience";

export default function Tutorial() {
  return (
    <Canvas shadows camera={{ position: [0, 0, 8], fov: 60 }}>
      <color attach="background" args={["black"]} />
      <fog attach="fog" args={["black", 5, 30]} />
      <Experience />
    </Canvas>
  );
}
