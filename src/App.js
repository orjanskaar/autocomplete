import './App.css';
import { Autocomplete } from './components/Autocomplete';
import data from './data/data'

const params = {
  placeholder:'Countries',
  data:data, //array of objects
  theme:'transparent', //dark, light or transparent
  decoration_clr:'aqua'
}
function App() {
  return (
    <div className="App">
      <div className="holder">
        <Autocomplete {...params} />
        <Autocomplete {...params} theme='light' decoration_clr='deeppink' results='15'/> {/* override decoration color */}
        <Autocomplete {...params} theme='dark' decoration_clr='orange'/>
      </div>
    </div>
  );
}

export default App;
