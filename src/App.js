import './App.css';
import { Autocomplete } from './components/Autocomplete';
import data from './components/data'

function App() {
  return (
    <div className="App">
      <Autocomplete 
        data={data}
        width={100}
        theme={'transparent'} //dark, light or transperent
      />
    </div>
  );
}

export default App;
