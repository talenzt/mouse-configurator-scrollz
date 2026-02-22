import * as THREE from 'three';
import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import type { GLTF } from 'three-stdlib'; 
import { useConfiguratorStore } from './store/useConfiguratorStore';

type GLTFResult = GLTF & {
  nodes: {
    Cube_1: THREE.Mesh; Cube_2: THREE.Mesh; Plane: THREE.Mesh;
    BotonesLateralesInferior: THREE.Mesh; BotonesLateralesSuperior: THREE.Mesh;
    BotonSuperiorEncima: THREE.Mesh; BotonSuperiorDebajo: THREE.Mesh; Rueda: THREE.Mesh;
  }
  materials: {
    ['mouse body']: THREE.MeshStandardMaterial; ['put normal here']: THREE.MeshStandardMaterial;
    ['Material.002']: THREE.MeshStandardMaterial; ['Material.003']: THREE.MeshStandardMaterial;
  }
}

export function Model(props: any) {
  const group = useRef<THREE.Group>(null!);
  const { nodes, materials } = useGLTF('/models/mouse.glb') as unknown as GLTFResult;
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = t * 0.15;
    group.current.position.y = Math.sin(t) * 0.04;
  });

  const { carcasaSuperiorColor, carcasaBaseColor, ruedaColor, botonesColor } = useConfiguratorStore();

  return (
    <group ref={group} {...props} dispose={null} scale={0.4}>
      <group position={[-0.003, -0.428, 0.385]}>
        <mesh 
          geometry={nodes.Cube_1.geometry} 
          material={materials['mouse body'].clone()} 
          material-color={carcasaBaseColor} 
          material-roughness={0.8} 
          material-metalness={0.1}
        />
        <mesh 
          geometry={nodes.Cube_2.geometry} 
          material={materials['put normal here'].clone()} 
          material-color={carcasaBaseColor} 
          material-roughness={0.8}
        />
      </group>
      
      <mesh 
        geometry={nodes.Plane.geometry} 
        material={materials['Material.002'].clone()} 
        position={[-0.026, -0.641, -0.276]} 
        scale={[0.954, 0.997, 0.997]} 
        material-color={carcasaSuperiorColor} 
        material-roughness={0.8}
      />
      
      <mesh geometry={nodes.BotonesLateralesInferior.geometry} material={materials['Material.003'].clone()} material-color={botonesColor} material-roughness={0.8} position={[1.244, 0.103, 0.364]} scale={0.379} />
      <mesh geometry={nodes.BotonesLateralesSuperior.geometry} material={materials['Material.003'].clone()} material-color={botonesColor} material-roughness={0.8} position={[1.244, 0.103, 0.364]} scale={0.379} />
      <mesh geometry={nodes.BotonSuperiorEncima.geometry} material={materials['Material.003'].clone()} material-color={botonesColor} material-roughness={0.8} position={[1.244, 0.103, 0.364]} scale={0.379} />
      <mesh geometry={nodes.BotonSuperiorDebajo.geometry} material={materials['Material.003'].clone()} material-color={botonesColor} material-roughness={0.8} position={[1.244, 0.103, 0.364]} scale={0.379} />
      <mesh geometry={nodes.Rueda.geometry} material={materials['Material.003'].clone()} material-color={ruedaColor} material-roughness={0.8} position={[1.244, 0.103, 0.364]} scale={0.379} />
    </group>
  );
}

useGLTF.preload('/models/mouse.glb');