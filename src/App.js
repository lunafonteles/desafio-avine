import BuscaCnpj from './pages/buscaCnpj';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <BuscaCnpj/>
      <ToastContainer/>
    </div>
  );
}

export default App;
