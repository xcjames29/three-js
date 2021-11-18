import React from "react";
import { Canvas } from "react-three-fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Physics, usePlane, useBox } from "@react-three/cannon";
import styled from "styled-components";

function Box() {
  const [ref, api] = useBox(() => ({ mass: 1, position: [0, 2, 0] }));
  return (
    <mesh
      onClick={() => {
        api.velocity.set(0, 2, 0);
      }}
      ref={ref}
      position={[0, 100, 0]}
      on
    >
      <boxBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color="red" />
    </mesh>
  );
}

function Plane() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
  }));
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshLambertMaterial attach="material" color="lightblue" />
    </mesh>
  );
}

export default function App() {
  return (
    <Container>
      <Header> Jumping Box </Header>
      <Body>
        <h4 style={{color:"red"}}> Click the box to JUMP! </h4>
        <Canvas style={{backgroundColor:"black", width:"100%"}}>
          <OrbitControls />
          <Stars />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 15, 10]} angle={0.3} />
          <Physics>
            <Box />
            <Plane />
          </Physics>
        </Canvas>
      </Body>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;

`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
  width: 100%;
  font-size: 48px;
  pointer-events: none;
`;

const Body = styled.div`
  flex: 1;
  padding: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;
