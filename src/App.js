import { useEffect, useState } from "react";
import styled from "styled-components";
import { Point } from "./renders/Point.js";
import { Triangle } from "./renders/Triangle.js";
import './reset.css';

const renders = [
  Triangle,
  Point
];

function App() {
  const [render, setRender] = useState(1);
  useEffect(() => {
    if (render === null) return;
    const canvas = document.getElementById('canvas');
    /** @type {WebGL2RenderingContext} */
    const gl = canvas.getContext('webgl');
    renders[render](gl);
  });

  return (
    <Container className="App">
      <Navbar>
        {renders.map((render, id) => <li onClick={() => setRender(id)} key={id}>{render.name}</li>)}
      </Navbar>
      <Screen id="canvas" width="500" height="500">
      </Screen>

    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-template-rows: 1fr;
  gap: 5px;
`;

const Navbar = styled.ul`
  background: #40085e;
  color: #fdfdfd;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  & > li {
    margin: 5px;
    padding: 5px;
    background: #6f0da3;
    border-radius: 5px;
    text-align: center;
  }

  & > li:hover {
    cursor: pointer
  }
`;

const Screen = styled.canvas`
  // width: 100%;
  // height: 100%;
`;

export default App;
