import { useEffect } from 'react';
import Home from './components/templates/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  useEffect(() => {
    // chrome.storage.local.clear();
    // chrome.storage.local.set({
    //   allMood: [{ body: '생일임', date: '2022-12-16', moodCode: 0 }],
    // });
    // chrome.storage.local.set({
    //   paletteCode: 5,
    // });
  }, []);

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
