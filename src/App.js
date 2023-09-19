import logo from './logo.svg';
import './App.css';
import Editor from './components/Editor/Editor';
import Daemons from './components/Daemons/Daemons';

function App() {
  return (
    <div className="App">
      <Editor/>
      <Daemons/>
    </div>
  );
}

export default App;
