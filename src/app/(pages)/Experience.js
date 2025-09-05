import { Environment, CameraControls, Html, Text } from "@react-three/drei";
import { Space_boi } from "./Space_boi";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import style from "./tutorial.module.css";
import Space2 from "./Space2";

export const Experience = () => {
  const controls = useRef();
  const modelRef = useRef();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // Track mouse movement in normalized range [-1, 1]
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMouse({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Smoothly rotate model toward mouse
  useFrame(() => {
    if (modelRef.current) {
      const targetRotY = mouse.x * 0.5; // horizontal tilt
      const targetRotX = mouse.y * 0.125; // vertical tilt
      modelRef.current.rotation.y +=
        (targetRotY - modelRef.current.rotation.y) * 0.1;
      modelRef.current.rotation.x += -0.05 +
        (targetRotX - modelRef.current.rotation.x) * 0.1;
    }
  });

  const intro = async () => {
    controls.current.dolly(-22);
    controls.current.rotate(-Math.PI, -1);
    controls.current.smoothTime = 1;
    controls.current.rotate(Math.PI, 0.9, true);
    controls.current.dolly(22, true);
  };

  useEffect(() => {
    intro();
  }, []);

  return (
    <>
      <group>
        <CameraControls ref={controls} />
        
        {/* This group rendered the original .gltf model */}
        {/* <group ref={modelRef} position={[0, -4, 0]}>
          <Space_boi scale={0.8} />
        </group> */}

        {/* This group renderes the new compressed model */}
        <group ref={modelRef} position={[0, -4, 0]} >
          <Space2 scale={0.8} rot/>
        </group>

        {/* This component takes care of lighting */}
        <Environment preset="sunset" />
      </group>

      {/* pointerEvents: "none", */}

      <Html center style={{ 
        whiteSpace: "nowrap"
        }}>
        <div style={{
          margin:'0',
          padding:'0',
          width: "100%",
          height: "100%",
          display:"flex",
          flexDirection:"column"
        }}>
          <div className={style.title}>NSSC 2025</div>
          <div style={{fontSize: '50px'}}>Celestia Anveshna</div>
        </div>

        <div className={style.buttonContainer}>
          <button>Explore</button>
          <button>Register</button>
        </div>
      </Html>


      {/* <Text
        color={"white"}
        textAlign="center"
        position={[0, 2, 2]}
      >
        NSSC 2025
        <meshBasicMaterial />
      </Text> */}
    </>
  );
};
