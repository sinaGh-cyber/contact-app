import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import Alert from './components/Alert/Alert';
import { useOption } from './context/OptionProvider/OptionProvider';
import routes from './routes';

function App() {
  const { contactOptionMenu, dispatchOption } = useOption();
  return (
    <div
      onClick={(e) => {
        dispatchOption({ type: 'optionClose' });
      }}
      className="App"
    >
      <Alert />

      <section className="container">
        <ToastContainer
          theme="colored"
          rtl
          style={{
            fontSize: '2rem',
          }}
        />

        <Routes>
          {routes.map((rout) => {
            return (
              <Route path={rout.path} element={rout.element} key={rout.id} />
            );
          })}
        </Routes>
      </section>
    </div>
  );
}

export default App;
