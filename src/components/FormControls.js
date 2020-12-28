//  USAGE:

//  import { Autocomplete, NumInput, RegularInput, Dropdown } from './components/FormControls';

//  <Autocomplete 
//      placeholder={'Countries'}
//      data={data} //array of objects with key of 'name'
//      decoration_clr={'orange'} //Left border of result list. Default 'blueviolet'
//      results={15} //Limits number of results. Default: 10
//      width={'250px'} //Any unit valid. Default: to 220px
//      theme={'dark'} //dark, light or transperent. Default: 'dark'
//  />

import React from 'react'
import styled, {createGlobalStyle } from 'styled-components'

const Autocomplete = (props) => {
    const theme = props.theme || 'dark'
    const decoration  =props.decoration_clr || 'blueviolet'
    const results = props.results || 10
    const [list, setList] = React.useState([])
    const [bgmain, setBgmain] = React.useState('')
    const [colorHi, setColorHi] = React.useState('')
    const [colorLo, setColorLo] = React.useState('')
    const [listPos, setListPos] = React.useState(-1)
    const [displ, setDispl] = React.useState(false)

    const inputRef = React.useRef()

    React.useEffect(()=> {
        document.body.addEventListener('click', (e) => {
            if(!e.target.classList.contains('dontCloseMe')) {setDispl(false)}
            setListPos(-1)
        })
    }, [])

    React.useEffect(()=> {
        setBgmain(getStyle('App').hex_clr)
        setColorHi(getStyle('App').high_clr)
        setColorLo(getStyle('App').low_clr)
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleInput = (e) => {
        setList([])
        if (e.target.value.length > 0) {
            setDispl(true)

            let keyword = e.target.value;
            let search_results = props.data
                .filter(prof => {
                    // Filter results by doing case insensitive match on name here
                    return prof.name.toLowerCase().includes(keyword.toLowerCase());
                })
                .sort((a, b) => {
                    // Sort results by matching name with keyword position in name
                    if(a.name.toLowerCase().indexOf(keyword.toLowerCase()) > b.name.toLowerCase().indexOf(keyword.toLowerCase())) {
                        return 1;
                    } else if (a.name.toLowerCase().indexOf(keyword.toLowerCase()) < b.name.toLowerCase().indexOf(keyword.toLowerCase())) {
                        return -1;
                    } else {
                        if(a.name > b.name)
                            return 1;
                        else
                            return -1;
                    }
                })
                setList(search_results)
        }else {
            setList([])
        }

        if(e.key === 'ArrowDown'){
            if(listPos === list.slice(0, results).length-1){
                setListPos(0)
            }else{
                setListPos(listPos+1)
            }
        }
        if(e.key === 'ArrowUp'){
            if(listPos <= 0) {setListPos(list.slice(0, results).length-1)}else{setListPos(listPos-1)}
        }
        if(e.key === 'Enter'){
            const listItems = document.getElementsByTagName('li')
            if((listPos >= 0) && (listPos <= list.slice(0, results).length)){
                props.setValue(listItems[listPos].innerHTML)
                setListPos(-1)
            }
            setDispl(false)
        }
        if(e.key === 'Escape'){
            setListPos(-1)
            setDispl(false)
        }
    }

    const handleClick = (e) => {
        setDispl(false)
        props.setValue(e.target.innerHTML)
        inputRef.current.focus()
    }

    const handleMouseOver = () => {
        const listItems = document.getElementsByTagName('li')
        setListPos(-1)
        for (let i=0;i<listItems.length;i++){
            listItems[i].classList.remove('activeItem')
        }
    }
    const handleChange = (e) => {
        props.setValue(e.target.value)
    }

    return (
            <Wrapper bredde={props.width || '220px'}>
                <GlobalStyle />
                <InpContainer bredde={props.width || '220px'}>
                    <Input 
                    required
                    value={props.value}
                    className="dontCloseMe"
                    ref={inputRef}
                    type="text" 
                    onKeyUp={handleInput}
                    onChange={handleChange}
                    theme={theme} 
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    bg_clr={bgmain}
                    clrHi={colorHi}
                    clrLo={colorLo}
                    />
                    <Span clrHi={colorHi} clrLo={colorLo}>{props.placeholder || 'Search'}</Span>
                    
                </InpContainer>
                {displ && <List className="ultag_123">
                    {
                        list.slice(0, results).map((itm,index) => {
                            return <ListItem className={`dontCloseMe`} active={index===listPos?true:false} onClick={handleClick} theme={theme} decoration={decoration} key={index} onMouseOver={handleMouseOver}>{itm.name}</ListItem>
                        })
                    }
                </List>}
            </Wrapper>
    )

}

const RegularInput = (props) => {
    const [bgmain, setBgmain] = React.useState('')
    const [colorHi, setColorHi] = React.useState('')
    const [colorLo, setColorLo] = React.useState('')

    React.useEffect(()=> {
        setBgmain(getStyle('App').hex_clr)
        setColorHi(getStyle('App').high_clr)
        setColorLo(getStyle('App').low_clr)
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleChange = (e) => {
        props.setValue(e.target.value)
    }
      return (
              <InpContainer bredde={props.width || '220px'}>
                <Input 
                    required
                    type="text" 
                    onChange={handleChange}
                    value={props.value}
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    bg_clr={bgmain}
                    clrHi={colorHi}
                    clrLo={colorLo}
                />
                <Span clrHi={colorHi} clrLo={colorLo}>{props.placeholder || 'Input'}</Span>
              </InpContainer>
      )
  }

  const NumInput = (props) => {
    const [bgmain, setBgmain] = React.useState('')
    const [colorHi, setColorHi] = React.useState('')
    const [colorLo, setColorLo] = React.useState('')

    React.useEffect(()=> {
        setBgmain(getStyle('App').hex_clr)
        setColorHi(getStyle('App').high_clr)
        setColorLo(getStyle('App').low_clr)
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    function validate(evt) {

        var regex = /^[\d]*\.?[\d]*$/;
        let char = evt.key
        let value = evt.target.value

        let strtocheck = value + char

        if(evt.key === 'Backspace'){
            return evt.key
        }else if( !regex.test(strtocheck) ) {
            evt.preventDefault()
            console.log(regex.test(strtocheck))
        }
      }
      
      const handleInput = (e) => {
            props.setValue(e.target.value)
      }
      return (
              <InpContainer bredde={props.width || '220px'}>
                <Input 
                    required
                    onKeyDown={validate}
                    onChange={handleInput}
                    value={props.value}
                    type="text"  
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    bg_clr={bgmain}
                    clrHi={colorHi}
                    clrLo={colorLo}
                />
                <Span clrHi={colorHi} clrLo={colorLo}>{props.placeholder || 'Input'}</Span>
              </InpContainer>
      )
  }

  const Dropdown = (props) => {
    const [bgmain, setBgmain] = React.useState('')
    const [colorHi, setColorHi] = React.useState('')
    const [colorLo, setColorLo] = React.useState('')

    const results = props.results || 10
    const theme = props.theme || 'dark'

    React.useEffect(()=> {
        setBgmain(getStyle('App').hex_clr)
        setColorHi(getStyle('App').high_clr)
        setColorLo(getStyle('App').low_clr)
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const handleChange = (e) => {
        props.setValue(e.target.value)
    }

    return (
                <InpContainer bredde={props.width || '220px'}>
                    <Select 
                    required
                    onChange={handleChange}
                    value={props.value}
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    bg_clr={bgmain}
                    clrHi={colorHi}
                    clrLo={colorLo}
                    > 
                        <Option key={Math.random(99, 99999)*1000} theme={theme}></Option>
                        {
                            props.data.slice(0, results).map((itm,index) => {
                                return <Option key={index+1} value={itm.name} theme={theme}>{itm.name}</Option>
                            })
                        }
                    </Select>
                    <Span clrHi={colorHi} clrLo={colorLo}>{props.placeholder || 'Select'}</Span>
                </InpContainer>
    )

}
const GlobalStyle = createGlobalStyle`
    body {
        perspective: 1000;
        backface-visibility: hidden;
    }
`
const Wrapper = styled.div `
    background-color: inherit;
    position: relative;
    width: ${props => props.bredde};
`
const InpContainer = styled.div `
    background-color: inherit;
    position: relative;
    height: 35px;
    width: ${props => props.bredde};
`
const Span = styled.span `
    background-color: inherit;
    position:absolute;
    padding: 0 8px 0 6px;
    font-size: 0.9rem;
    letter-spacing: 1px;
    height: min-content;
    left: 10px;
    top: 49%;
    transform: translateY(-50%);
    pointer-events: none;
    transition: all 0.2s ease-in-out;
    color: ${props => props.clrLo};
    z-index: 1;
`

const Input = styled.input `
    width: 100%;
    outline: none;
    height: 100%;
    padding: 0 10px;
    border: 1px solid ${props => props.clrLo};
    border-radius: 5px;
    box-shadow: none;
    background-color: #${props => props.bg_clr};
    font-size: 1.05rem;
    color: ${props => props.clrLo};
    :focus, :active{
        color: ${props => props.clrHi};
        border: 1px solid ${props => props.clrHi};
    }
    :hover{
        border: 1px solid ${props => props.clrHi};
    }
    :valid + span {
        left: 0;
        top: -8px;
        transform: scale(0.8);
        background-color: #${props => props.bg_clr};
    }
    :focus + span {
        left: 0;
        top: -8px;
        transform: scale(0.8);
        color: ${props => props.clrHi};
        background-color: #${props => props.bg_clr};
        border-radius: 3px;
    }
`
const List = styled.ul `
    max-height: 300px;
    position: absolute;
    width: 100%;
    z-index: 10;
`
const ListItem = styled.li `
    list-style: none;
    background-color: gray;
    padding: 0.5rem;
    background-color: ${props => props.theme === 'dark' ? 'rgba(40,40,40,0.9)': props.theme === 'light' ? 'rgba(255,255,255,0.85)': props.theme === 'transparent' ? 'rgba(0,0,0,0.3)' : '#fff'};
    ${props => 
        (props.active&&props.theme==='dark')? 'background-color: rgba(50,50,50,95);transform: scale(1.1)'
        :(props.active&&props.theme==='light')? 'background-color: rgba(255,255,255,0.9);transform: scale(1.1)'
        :(props.active&&props.theme==='transparent')? 'background-color: rgba(0,0,0,0.4);transform: scale(1.1)'
        :null
    };
    color: ${props => props.theme === 'dark' ? '#eee': props.theme === 'light' ? '#333': props.theme === 'transparent' ? '#eee' : '#fff'};
    border-left: 2px solid ${props => props.decoration};
    margin-bottom: 1px;
    cursor: pointer;
    transition: transform 0.2s ease;
    :hover {
        background-color: ${props => props.theme === 'dark' ? 'rgba(50,50,50,95)': props.theme === 'light' ? 'rgba(255,255,255,0.9)': props.theme === 'transparent' ? 'rgba(0,0,0,0.4)' : '#fff'};
        transform: translateY(0.5px) scale(1.1);
    }
`
const Select = styled.select `
    width: 100%;
    outline: none;
    height: 100%;
    padding: 0 10px;
    border: 1px solid ${props => props.clrLo};
    border-radius: 5px;
    box-shadow: none;
    background-color: #${props => props.bg_clr};
    font-size: 1.05rem;
    color: ${props => props.clrLo};
    :focus, :active{
        color: ${props => props.clrHi};
        border: 1px solid ${props => props.clrHi};
    }
    :hover{
        border: 1px solid ${props => props.clrHi};
    }
    :valid + span {
        left: 0;
        top: -8px;
        transform: scale(0.8);
        background-color: #${props => props.bg_clr};
    }
    :focus + span {
        left: 0;
        top: -8px;
        transform: scale(0.8);
        color: ${props => props.clrHi};
        background-color: #${props => props.bg_clr};
        border-radius: 3px;
    }
`
const Option = styled.option `
    list-style: none;
    background-color: gray;
    background-color: ${props => props.theme === 'dark' ? 'rgba(40,40,40,0.9)': props.theme === 'light' ? 'rgba(255,255,255,0.85)': props.theme === 'transparent' ? 'rgba(0,0,0,0.3)' : '#fff'};
    ${props => 
        (props.active&&props.theme==='dark')? 'background-color: rgba(50,50,50,95);transform: scale(1.1)'
        :(props.active&&props.theme==='light')? 'background-color: rgba(255,255,255,0.9);transform: scale(1.1)'
        :(props.active&&props.theme==='transparent')? 'background-color: rgba(0,0,0,0.4);transform: scale(1.1)'
        :null
    };
    color: ${props => props.theme === 'dark' ? '#eee': props.theme === 'light' ? '#333': props.theme === 'transparent' ? '#eee' : '#fff'};
`

function invertColor(hex) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    // invert color components
    var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
        g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
        b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
    // pad each with zeros and return
    function padZero(str, len) {
        len = len || 2;
        var zeros = new Array(len).join('0');
        return (zeros + str).slice(-len);
    }
    return '#' + padZero(r) + padZero(g) + padZero(b);
}

function colorLuminance(hex, lum) {
    // Validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, "");
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    lum = lum || 0;
    // Convert to decimal and change luminosity
    var rgb = "#",
      c;
    for (var i = 0; i < 3; ++i) {
      c = parseInt(hex.substr(i * 2, 2), 16);
      c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
      rgb += ("00" + c).substr(c.length);
    }
    return rgb;
  }

function getStyle(elm) {
    const clr_tmp = document.getElementsByClassName(elm)
    const clr = getComputedStyle(clr_tmp[0])
    const val = clr.backgroundColor
    const tmpval = val.split('(')
    const tmpval2 = tmpval[1].split(')')
    const tmpval4 = tmpval2[0].split(', ')
    let r_clr = Number(tmpval4[0]).toString(16)
    if (r_clr.length < 2) {r_clr = "0"+r_clr}
    let g_clr = Number(tmpval4[1]).toString(16)
    if (g_clr.length < 2) {g_clr = "0"+g_clr}
    let b_clr = Number(tmpval4[2]).toString(16)
    if (b_clr.length < 2) {b_clr = "0"+b_clr}
    const hex_clr = r_clr+g_clr+b_clr
    const high_clr = invertColor(hex_clr)
    const low_clr = colorLuminance(high_clr, -0.3)
    return {
        hex_clr,
        high_clr,
        low_clr
    }
}

export {Autocomplete, RegularInput, NumInput, Dropdown}