import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

// Component to load and render the 3D model
const Model = ({ modelPath }) => {
  const { scene } = useGLTF(modelPath); // Load the model

  if (!scene) return null; // Handle the case where the model fails to load

  // Scale the model to make it bigger and position it properly in the scene
  return <primitive object={scene} scale={[3, 3, 3]} position={[0, -3, 0]} />;
};

const Car = ({ position, mouse, isRotating }) => {
  const ref = useRef();
  useFrame(() => {
    if (ref.current) {
      if (isRotating) {
        ref.current.rotation.y = mouse.current[0] * Math.PI / 4; // Rotate left or right based on cursor x-position
      } else {
        ref.current.rotation.y += 0.01; // Auto-rotate when not rotating based on cursor
      }
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <Model modelPath="/Models/car.glb" />
    </mesh>
  );
};

const Scene = ({ mouse, isRotating }) => {
  return (
    <Canvas
      camera={{ position: [0, 10, 70], fov: 100 }} // Adjusted camera position for better view
      style={{ height: "100vh", background: "#fff" }} // Full screen canvas with white background
    >
      {/* Lighting */}
      <ambientLight intensity={0.5} color="red" />
      <directionalLight position={[5, 5, 5]} intensity={10} color="white" />

      {/* Load your 3D model (Car) */}
      <Car position={[0, 0, 0]} mouse={mouse} isRotating={isRotating} />

      {/* Orbit Controls with zoom disabled */}
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};

export default Scene;
