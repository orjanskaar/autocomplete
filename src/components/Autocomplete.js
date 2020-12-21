// USAGE:

// <Autocomplete 
// placeholder={'Countries'}
// data={data} //array of objects
// width={100}
// theme={'light'} //dark, light or transperent
// />

import React, {useEffect, useState} from 'react'
import styled, {createGlobalStyle } from 'styled-components'


export const Autocomplete = (props) => {
    const [list, setList] = useState([])
    const [color, setColor] = useState('')
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
        const inv_clr = invertColor(hex_clr)
        setColor(inv_clr)
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleInput = (e) => {
        setList([])
        if (e.target.value.length > 1) {
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
            setList(array)
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
        return '#' + padZero(r) + padZero(g) + padZero(b);
    }
    function padZero(str, len) {
        len = len || 2;
        var zeros = new Array(len).join('0');
        return (zeros + str).slice(-len);
    }

    return (
        
            <Wrapper id="InpContainer" >
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
                    clr={color}
                    />
                    <Span clr={color}>{props.placeholder}</Span>
                    
                </InpContainer>
                {displ && <List className="ultag_123">
                    {
                        list.slice(0, 10).map((itm,index) => {
                            return <ListItem className={`dontCloseMe ${index===listPos?'activeItem':''}`} onClick={handleClick} theme={props.theme} key={index} onMouseOver={handleMouseOver}>{itm.name}</ListItem>
                        })
                    }
                </List>}
            </Wrapper>
    )
}
const GlobalStyle = createGlobalStyle`
  body {
    perspective: 1000;
    backface-visibility: hidden;
  }
`
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
    /* color: ${props => props.clr}; */
    color: gray;
    z-index: 1;
`

const Input = styled.input `
    width: ${props => props.width}%;
    outline: none;
    height: 100%;
    padding: 0 10px;
    margin-bottom: 2px;
    border: 1px solid gray;
    border-radius: 5px;
    box-shadow: none;
    background-color: inherit;
    color: gray;
    :focus, :active{
        color: ${props => props.clr};
        border: 1px solid ${props => props.clr};
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
        color: ${props => props.clr};
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
    background-color: ${props => props.theme === 'dark' ? '#444': props.theme === 'light' ? '#fff': props.theme === 'transparent' ? 'rgba(0,0,0,0.3)' : '#fff'};
    color: ${props => props.theme === 'dark' ? '#eee': props.theme === 'light' ? '#333': props.theme === 'transparent' ? '#eee' : '#fff'};
    border-left: 2px solid blueviolet;
    margin-bottom: 1px;
    cursor: pointer;
    transition: transform 0.2s ease;
    :hover {
        background-color: ${props => props.theme === 'dark' ? '#555': props.theme === 'light' ? '#eee': props.theme === 'transparent' ? 'rgba(0,0,0,0.3)' : '#fff'};
        transform: scale(1.1);
    }
`

