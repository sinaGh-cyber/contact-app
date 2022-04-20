import {  Route, Routes } from 'react-router-dom';
import './App.css';
import routes from './routes';

function App() {
  return (
    <main className="App">
      <Routes>
        {routes.map((rout) => {
          return (
            <Route path={rout.path} element={rout.element} key={rout.id} />
          );
        })}
      </Routes>
    </main>
  );
}

export default App;
