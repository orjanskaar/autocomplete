// USAGE:

// <Autocomplete 
//  placeholder={'Countries'}
//  data={data} //array of objects
//  width={100} //percent
//  theme={'light'} //dark, light or transperent
// />

import React, {useEffect, useState} from 'react'
import styled, {createGlobalStyle } from 'styled-components'


export const Autocomplete = (props) => {
    const [list, setList] = useState([])
    const [colorHi, setColorHi] = useState('')
    const [colorLo, setColorLo] = useState('')
    const [listPos, setListPos] = useState(-1)
    const [displ, setDispl] = useState(false)

    useEffect(()=> {
        document.body.addEventListener('click', (e) => {
            if(!e.target.classList.contains('dontCloseMe')) {setDispl(false)}
            setListPos(-1)
        })
    }, [])

    useEffect(()=> {
        const clr = getComputedStyle(document.getElementById('AppId123'))
        const val = clr.backgroundColor
        const tmpval = val.split('(')
        const tmpval2 = tmpval[1].split(')')
        const tmpval3 = tmpval2[0].split(')')
        const tmpval4 = tmpval3[0].split(',')
        let r_clr = Number(tmpval4[0]).toString(16)
            if (r_clr.length < 2) {r_clr = "0"+r_clr}
        let g_clr = Number(tmpval4[1]).toString(16)
            if (g_clr.length < 2) {g_clr = "0"+g_clr}
        let b_clr = Number(tmpval4[2]).toString(16)
            if (b_clr.length < 2) {b_clr = "0"+b_clr}
        const hex_clr = r_clr+g_clr+b_clr
        const high_clr = invertColor(hex_clr)
        const low_clr = colorLuminance(high_clr, -0.3)

        setColorHi(high_clr)
        setColorLo(low_clr)
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleInput = (e) => {
        setList([])
        if (e.target.value.length > 0) {
            setDispl(true)
            function search(itm) {
                const value = e.target.value
                let pattern
                try {
                    pattern = new RegExp(`${value}`, 'gi')
                }catch(e) {
                    console.log('illegal regex')
                    return false
                }
                const str = itm.name
                let result = pattern.test(str)

                return result ? str : null
            }
            const array = props.data.filter(search)

            let keyword = e.target.value;
            let search_results = array
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
            if(listPos === list.length-1){
                setListPos(0)
            }else{
                setListPos(listPos+1)
            }
        }
        if(e.key === 'ArrowUp'){
            if(listPos <= 0) {setListPos(list.length-1)}else{setListPos(listPos-1)}
        }
        if(e.key === 'Enter'){
            const SearchBox = document.getElementById('custSearchBox')
            const listItems = document.getElementsByTagName('li')
            if((listPos >= 0) && (listPos <= list.length)){
                SearchBox.value = listItems[listPos].innerHTML
            }
            setDispl(false)
        }

    }

    const handleClick = (e) => {
        const SearchBox = document.getElementById('custSearchBox')
        SearchBox.value = e.target.innerHTML
        setDispl(false)
        SearchBox.focus()
    }

    const handleMouseOver = () => {
        const listItems = document.getElementsByTagName('li')
        setListPos(-1)
        for (let i=0;i<listItems.length;i++){
            listItems[i].classList.remove('activeItem')
        }
    }
    const GlobalStyle = createGlobalStyle`
        body {
            perspective: 1000;
            backface-visibility: hidden;
        }
        .activeItem{
            transform: translateY(0.5px) scale(1.1);
            background-color: ${props.theme === 'dark' ? 'rgba(50,50,50,95)': props.theme === 'light' ? 'rgba(255,255,255,0.9)': props.theme === 'transparent' ? 'rgba(0,0,0,0.4)' : '#fff'};

        }
    `
    return (
        
            <Wrapper id="AppId123">
                <GlobalStyle />
                <InpContainer>
                    <Input 
                    required
                    className="dontCloseMe"
                    id="custSearchBox" 
                    type="text" 
                    onKeyUp={handleInput}
                    width={props.width} 
                    theme={props.theme} 
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    clrHi={colorHi}
                    clrLo={colorLo}
                    />
                    <Span clrHi={colorHi} clrLo={colorLo}>{props.placeholder}</Span>
                    
                </InpContainer>
                {displ && <List className="ultag_123">
                    {
                        
                        list.slice(0, props.reslen).map((itm,index) => {
                            return <ListItem className={`dontCloseMe ${index===listPos?'activeItem':''}`} onClick={handleClick} theme={props.theme} key={index} onMouseOver={handleMouseOver}>{itm.name}</ListItem>
                        })
                    }
                </List>}
            </Wrapper>
    )

}

const Wrapper = styled.div `
    margin-top: 150px;
    grid-column: 2;
    background-color: inherit;
`
const InpContainer = styled.div `
    background-color: inherit;
    position: relative;
    height: 35px;
`
const Span = styled.span `
    background-color: transparent;
    position:absolute;
    padding: 0 8px 0 6px;
    font-size: 0.9rem;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    transition: all 0.2s ease;
    color: ${props => props.clrLo};
    z-index: 1;
`

const Input = styled.input `
    width: ${props => props.width}%;
    outline: none;
    height: 100%;
    padding: 0 10px;
    margin-bottom: 2px;
    border: 1px solid ${props => props.clrLo};
    border-radius: 5px;
    box-shadow: none;
    background-color: inherit;
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
        background-color: inherit;
    }
    :focus + span {
        left: 0;
        top: -8px;
        transform: scale(0.8);
        color: ${props => props.clrHi};
        background-color: inherit;
        border-radius: 3px;
    }
`
const List = styled.ul `
    max-height: 300px;
`
const ListItem = styled.li `
    list-style: none;
    background-color: gray;
    padding: 0.5rem;
    background-color: ${props => props.theme === 'dark' ? 'rgba(40,40,40,0.9)': props.theme === 'light' ? 'rgba(255,255,255,0.85)': props.theme === 'transparent' ? 'rgba(0,0,0,0.3)' : '#fff'};
    color: ${props => props.theme === 'dark' ? '#eee': props.theme === 'light' ? '#333': props.theme === 'transparent' ? '#eee' : '#fff'};
    border-left: 2px solid blueviolet;
    margin-bottom: 1px;
    cursor: pointer;
    transition: transform 0.2s ease;
    :hover {
        background-color: ${props => props.theme === 'dark' ? 'rgba(50,50,50,95)': props.theme === 'light' ? 'rgba(255,255,255,0.9)': props.theme === 'transparent' ? 'rgba(0,0,0,0.4)' : '#fff'};
        transform: translateY(0.5px) scale(1.1);
    }
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