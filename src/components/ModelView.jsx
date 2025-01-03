import { Html, OrbitControls, PerspectiveCamera, View } from "@react-three/drei";
import * as THREE from "three";
import Lights from "./Lights";
import Loader from "./Loader";
import Iphone from "./Iphone";
import { Suspense } from "react";
import { useMediaQuery } from "react-responsive";

const ModelView = ({ index, groupRef, gsapType, controlRef, setRotationState, size, item }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" }); // Detect mobile devices

  return (
    <View
      index={index}
      id={gsapType}
      className={`w-full h-full absolute ${index === 2 ? "right-[-100%]" : ""} ${
        isMobile ? "overflow-auto" : ""
      }`}
      style={{
        touchAction: isMobile ? "pan-y" : "none", // Enable easier scrolling on mobile
      }}
    >
      {/* Ambient Light */}
      <ambientLight intensity={0.3} />

      <PerspectiveCamera makeDefault position={[0, 0, 4]} />

      <Lights />

      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false} // Disable zooming
        enablePan={!isMobile} // Disable panning unless on desktop
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
      />

      <group
        ref={groupRef}
        name={`${index === 1 ? "small" : "large"}`}
        position={[0, 0, 0]}
      >
        <Suspense fallback={<Loader />}>
          <Iphone
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
            item={item}
            size={size}
          />
        </Suspense>
      </group>
    </View>
  );
};

export default ModelView;
