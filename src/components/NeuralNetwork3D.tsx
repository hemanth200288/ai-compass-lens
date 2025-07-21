import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Line, Text } from '@react-three/drei';
import { Vector3, Color } from 'three';
import * as THREE from 'three';

interface Node {
  id: string;
  position: Vector3;
  color: string;
  type: 'input' | 'ai' | 'knackhook' | 'output';
  active: boolean;
  intensity: number;
}

interface Connection {
  from: Vector3;
  to: Vector3;
  active: boolean;
  color: string;
  particles: Array<{
    position: Vector3;
    progress: number;
    type: 'safe' | 'unsafe' | 'filtered';
  }>;
}

interface NetworkNodeProps {
  node: Node;
}

function NetworkNode({ node }: NetworkNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current && node.active) {
      const time = state.clock.getElapsedTime();
      meshRef.current.scale.setScalar(1 + Math.sin(time * 3) * 0.1 * node.intensity);
    }
  });

  return (
    <group position={node.position}>
      <Sphere ref={meshRef} args={[0.15, 16, 16]}>
        <meshStandardMaterial 
          color={node.color}
          emissive={node.color}
          emissiveIntensity={node.active ? node.intensity * 0.3 : 0.1}
          transparent
          opacity={0.8}
        />
      </Sphere>
      <Text
        position={[0, -0.3, 0]}
        fontSize={0.08}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {node.type.toUpperCase()}
      </Text>
    </group>
  );
}

interface NetworkConnectionProps {
  connection: Connection;
}

function NetworkConnection({ connection }: NetworkConnectionProps) {
  const particleRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Animate particles along the connection
    connection.particles.forEach((particle, index) => {
      if (particleRefs.current[index]) {
        particle.progress = (particle.progress + 0.02) % 1;
        const lerpedPosition = new Vector3().lerpVectors(connection.from, connection.to, particle.progress);
        particleRefs.current[index].position.copy(lerpedPosition);
        
        // Add floating effect
        particleRefs.current[index].position.y += Math.sin(time * 2 + index) * 0.02;
      }
    });
  });

  const points = [connection.from, connection.to];
  
  return (
    <group>
      <Line 
        points={points}
        color={connection.color}
        lineWidth={connection.active ? 3 : 1}
        transparent
        opacity={connection.active ? 0.8 : 0.3}
      />
      {connection.particles.map((particle, index) => (
        <Sphere
          key={index}
          ref={(mesh) => {
            if (mesh) particleRefs.current[index] = mesh;
          }}
          args={[0.03, 8, 8]}
          position={particle.position}
        >
          <meshStandardMaterial
            color={
              particle.type === 'safe' ? '#00ff88' :
              particle.type === 'unsafe' ? '#ff4444' : 
              '#8844ff'
            }
            emissive={
              particle.type === 'safe' ? '#00ff88' :
              particle.type === 'unsafe' ? '#ff4444' : 
              '#8844ff'
            }
            emissiveIntensity={0.5}
          />
        </Sphere>
      ))}
    </group>
  );
}

function Scene({ currentStep }: { currentStep: number }) {
  const nodes = useMemo(() => {
    const createNode = (id: string, x: number, y: number, z: number, type: Node['type'], color: string): Node => ({
      id,
      position: new Vector3(x, y, z),
      color,
      type,
      active: false,
      intensity: 0
    });

    return [
      // Input layer
      createNode('input1', -3, 1, 0, 'input', '#44aaff'),
      createNode('input2', -3, 0, 0, 'input', '#44aaff'),
      createNode('input3', -3, -1, 0, 'input', '#44aaff'),
      
      // AI processing layer
      createNode('ai1', -1, 1.5, 0, 'ai', '#ffaa44'),
      createNode('ai2', -1, 0.5, 0, 'ai', '#ffaa44'),
      createNode('ai3', -1, -0.5, 0, 'ai', '#ffaa44'),
      createNode('ai4', -1, -1.5, 0, 'ai', '#ffaa44'),
      
      // KnackHook filtering layer
      createNode('knack1', 1, 1, 0, 'knackhook', '#aa44ff'),
      createNode('knack2', 1, 0, 0, 'knackhook', '#aa44ff'),
      createNode('knack3', 1, -1, 0, 'knackhook', '#aa44ff'),
      
      // Output layer
      createNode('output1', 3, 0.5, 0, 'output', '#44ff88'),
      createNode('output2', 3, -0.5, 0, 'output', '#44ff88'),
    ];
  }, []);

  const connections = useMemo(() => {
    const createConnection = (fromId: string, toId: string, color: string): Connection => {
      const fromNode = nodes.find(n => n.id === fromId)!;
      const toNode = nodes.find(n => n.id === toId)!;
      
      return {
        from: fromNode.position,
        to: toNode.position,
        active: false,
        color,
        particles: [
          { position: new Vector3(), progress: 0, type: 'safe' },
          { position: new Vector3(), progress: 0.3, type: 'unsafe' },
          { position: new Vector3(), progress: 0.6, type: 'filtered' }
        ]
      };
    };

    return [
      // Input to AI connections
      createConnection('input1', 'ai1', '#44aaff'),
      createConnection('input1', 'ai2', '#44aaff'),
      createConnection('input2', 'ai2', '#44aaff'),
      createConnection('input2', 'ai3', '#44aaff'),
      createConnection('input3', 'ai3', '#44aaff'),
      createConnection('input3', 'ai4', '#44aaff'),
      
      // AI to KnackHook connections
      createConnection('ai1', 'knack1', '#ffaa44'),
      createConnection('ai2', 'knack1', '#ffaa44'),
      createConnection('ai2', 'knack2', '#ffaa44'),
      createConnection('ai3', 'knack2', '#ffaa44'),
      createConnection('ai3', 'knack3', '#ffaa44'),
      createConnection('ai4', 'knack3', '#ffaa44'),
      
      // KnackHook to Output connections
      createConnection('knack1', 'output1', '#aa44ff'),
      createConnection('knack2', 'output1', '#aa44ff'),
      createConnection('knack2', 'output2', '#aa44ff'),
      createConnection('knack3', 'output2', '#aa44ff'),
    ];
  }, [nodes]);

  // Update node states based on current step
  useEffect(() => {
    nodes.forEach(node => {
      node.active = false;
      node.intensity = 0;
    });
    
    connections.forEach(connection => {
      connection.active = false;
    });

    switch (currentStep) {
      case 0: // Input phase
        nodes.filter(n => n.type === 'input').forEach(n => {
          n.active = true;
          n.intensity = 1;
        });
        break;
      case 1: // AI processing
        nodes.filter(n => n.type === 'ai').forEach(n => {
          n.active = true;
          n.intensity = 0.8;
        });
        connections.filter(c => c.from.x === -3).forEach(c => c.active = true);
        break;
      case 2: // KnackHook filtering
        nodes.filter(n => n.type === 'knackhook').forEach(n => {
          n.active = true;
          n.intensity = 1;
        });
        connections.filter(c => c.from.x === -1).forEach(c => c.active = true);
        break;
      case 3: // Output
        nodes.filter(n => n.type === 'output').forEach(n => {
          n.active = true;
          n.intensity = 1;
        });
        connections.filter(c => c.from.x === 1).forEach(c => c.active = true);
        break;
    }
  }, [currentStep, nodes, connections]);

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#aa44ff" />
      
      {nodes.map(node => (
        <NetworkNode key={node.id} node={node} />
      ))}
      
      {connections.map((connection, index) => (
        <NetworkConnection key={index} connection={connection} />
      ))}
      
      <OrbitControls 
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        maxDistance={10}
        minDistance={3}
        autoRotate
        autoRotateSpeed={1}
      />
    </>
  );
}

interface NeuralNetwork3DProps {
  currentStep: number;
}

export function NeuralNetwork3D({ currentStep }: NeuralNetwork3DProps) {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [5, 2, 5], fov: 75 }}>
        <color attach="background" args={['#0a0a0a']} />
        <fog attach="fog" args={['#0a0a0a', 8, 20]} />
        <Scene currentStep={currentStep} />
      </Canvas>
    </div>
  );
}