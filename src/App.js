import './App.css';
import Header from './components/header/header';
import TodoList from './components/todolist/todolist';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <main className="App-main">
        <TodoList />
      </main>
    </div>
  );
}

export default App;
