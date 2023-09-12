import Home from './components/templates/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  return (
    <div className="App">
      <Home />
      <ToastContainer
        position={'top-right'}
        autoClose={2000}
        closeOnClick={true}
        hideProgressBar={true}
        pauseOnHover={false}
        style={{ fontSize: '15px' }}
        icon={<FontAwesomeIcon icon={faCircleCheck} />}
      />
    </div>
  );
};

export default App;
