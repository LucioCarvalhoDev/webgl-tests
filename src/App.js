import styled from "styled-components";
import './reset.css';

const pages = [];

function App() {

  function alert(text) {
    alert(text);
  }

  return (
    <Container className="App">
      <div>

      </div>
      <Screen>



      </Screen>

    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 80px 1fr;
  grid-template-rows: 1fr;
  gap: 5px;
`;

const Screen = styled.canvas`
  background: grey;
  width: 100%;
  height: 100%;
`;

export default App;
