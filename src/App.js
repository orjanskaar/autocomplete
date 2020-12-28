import './App.css';
import { Autocomplete, NumInput, RegularInput } from './components/FormControls';
import data from './data/data'
import React from 'react'


const params = {
  placeholder:'Countries',
  data:data, //array of objects
  theme:'transparent', //dark, light or transparent
  decoration_clr:'aqua'
}
function App() {
const [numVal, setNumVal] = React.useState('')

  return (
    <div className="App">
      <div className="holder">
        <Autocomplete {...params} />
        <Autocomplete {...params} theme='light' decoration_clr='deeppink' results='15'/> {/* override decoration color */}
        <Autocomplete {...params} theme='dark' decoration_clr='orange'/>
        <Autocomplete data={data} /> {/*only data array mandatory*/}
      </div>
      <div className="holder2">
        <RegularInput />
        <NumInput placeholder={'Number'} value={numVal} setVal={setNumVal} /> {/*Lift state to App level*/}
      </div>
    </div>
  );
}

export default App;
