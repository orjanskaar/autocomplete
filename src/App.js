import './App.css';
import { Autocomplete } from './components/Autocomplete';
import data from './components/data'

function App() {
  return (
    <div className="App">
      <Autocomplete 
        placeholder={'Countries'}
        data={data}
        width={100}
        theme={'transparent'} //dark, light or transparent
        reslen={10} //Max number of results displayed
      />
    </div>
  );
}

export default App;
