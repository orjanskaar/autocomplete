import './App.css';
import { Autocomplete } from './components/Autocomplete';
import data from './components/data'

function App() {
  return (
    <div className="App" id="AppId123">
      <Autocomplete 
        placeholder={'Countries'}
        data={data}
        width={100}
        theme={'transparent'} //dark, light or transparent
      />
    </div>
  );
}

export default App;
