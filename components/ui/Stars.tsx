import { Points, PointMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as random from "maath/random";
import { useRef, useState } from "react";
import { Points as ThreePoints } from "three";

export default function Stars(props: any) {
    const ref = useRef<ThreePoints>();
    const [sphere] = useState(() =>
        random.inSphere(new Float32Array(5000), { radius: 1.5 })
    );
    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });
    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points
                ref={ref}
                positions={sphere}
                stride={3}
                frustumCulled={false}
                {...props}
            >
                <PointMaterial
                    transparent
                    color="#ffa0e0"
                    size={0.005}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
}
