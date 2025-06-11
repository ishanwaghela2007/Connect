"use client";
import React from "react";
import { useGLTF } from "@react-three/drei";

const Model: React.FC = () => {
  // Simple approach - let drei handle the typing
  const gltf = useGLTF("/media/scene.gltf");

  console.log("=== GLTF DEBUG ===");
  console.log("Full GLTF:", gltf);
  console.log("Scene:", gltf.scene);
  console.log("Nodes:", gltf.nodes);
  console.log("Node names:", Object.keys(gltf.nodes));

  // The simplest way - render the entire scene
  return (
    <>
      <group position={[0, -1, 0]} scale={1.5}>
        <primitive object={gltf.scene} />
      </group>
    </>
  );
};

export default Model;
