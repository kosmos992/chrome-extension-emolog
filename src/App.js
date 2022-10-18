import './App.css';
import styled from 'styled-components';
import Todo from './components/Todo';

const Cube = styled.div`
  width: 30vw;
  height: 30vw;
  min-width: 400px;
  min-height: 400px;
  max-width: 650px;
  max-height: 650px;
  background-color: rgb(241, 241, 241);
`;

const Ask = styled.div`
  font-size: xx-large;
`;

const Right = styled.div`
  flex: 1;
`;
const Left = styled.div`
  flex: 1;
`;
const Center = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App() {
  return (
    <div className="App">
      <Left>
        <p>캘린더 영역</p>
      </Left>
      <Center>
        {' '}
        <Cube />
        <Ask>
          <p>오늘 기분이 어떤가요?</p>
        </Ask>
      </Center>
      <Right>
        <p>투두리스트 영역</p>
        <Todo />
      </Right>
    </div>
  );
}

export default App;
