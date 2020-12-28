import './App.css';
import { Autocomplete, NumInput, RegularInput, Dropdown } from './components/FormControls';
import data from './data/data'
import React from 'react'


const params = {
  placeholder:'Countries',
  data:data, //array of objects
  theme:'transparent', //dark, light or transparent
  decoration_clr:'aqua'
}
const options = [
  {name: 'Option 1',}, 
  {name: 'Option 2',}, 
  {name: 'Option 3',}, 
  {name: 'Option 4',} 
]
function App() {
const [country, setCountry] = React.useState('')
const [numVal, setNumVal] = React.useState('')
const [option, setOption] = React.useState('')
const [input, setInput] = React.useState('')

  return (
    <div className="App">
      <div className="holder">
        <Autocomplete {...params} value={country} setValue={setCountry}/>
        <Autocomplete {...params} theme={'light'} decoration_clr={'deeppink'} results={15}/> {/* override decoration color */}
        <Autocomplete {...params} theme={'dark'} decoration_clr={'orange'}/>
        <Autocomplete data={data} /> {/*only data array mandatory*/}
      </div>
      <div className="holder2">
        <RegularInput value={input} setValue={setInput}/>
        <NumInput placeholder={'Number'} value={numVal} setValue={setNumVal} /> {/*Lift state to this level*/}
        <Dropdown data={options} theme={'transparent'} width={'13rem'} value={option} setValue={setOption}/>
      </div>
      <div className="holder3">
        {country} {input?`+ ${input}`:''} {numVal?`+ ${numVal}`:''} {option?`+ ${option}`:''}
      </div>
    </div>
  );
}

export default App;
