import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import routes from './routes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {routes.map((rout) => {
            return (
              <Route path={rout.path} element={rout.element} key={rout.id} />
            );
          })}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
