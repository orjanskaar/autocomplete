import React, {useEffect, useState} from 'react'
import styled from 'styled-components'


export const Autocomplete = (props) => {
    document.body.addEventListener('click', (e) => {
        if(!e.target.classList.contains('dontCloseMe')) {setDispl(false)}
        setListPos(-1)
    })
    const [list, setList] = useState([])
    const [listPos, setListPos] = useState(-1)
    const [displ, setDispl] = useState(false)

    useEffect(()=> {
        console.log(listPos)

    }, [listPos])
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
    }

    const handleMouseOver = () => {
        const listItems = document.getElementsByTagName('li')
        setListPos(-1)
        for (let i=0;i<listItems.length;i++){
            listItems[i].classList.remove('activeItem')
        }
    }
    return (
        
            <InpContainer id="InpContainer" >
                <Input 
                    className="dontCloseMe"
                    id="custSearchBox" 
                    type="text" 
                    onKeyUp={handleInput}
                    width={props.width} 
                    theme={props.theme} 
                    autoComplete="off"
                />
                {displ && <List className="ultag_123">
                    {
                        list.slice(0, 10).map((itm,index) => {
                            return <ListItem className={`dontCloseMe ${index===listPos?'activeItem':''}`} onClick={handleClick} theme={props.theme} key={index} onMouseOver={handleMouseOver}>{itm.name}</ListItem>
                        })
                    }
                </List>}
            </InpContainer>
    )
}

const InpContainer = styled.div `
    margin-top: 150px;
    grid-column: 2;
    position: relative;
`
const Input = styled.input `
    width: ${props => props.width}%;
    padding: 0.5rem;
    outline: none;
    margin-bottom: 2px;
    border: 1px solid gray;
    background-color: ${props => props.theme === 'dark' ? '#444': props.theme === 'light' ? '#fff': props.theme === 'transparent' ? 'rgba(0,0,0,0.3)' : '#fff'};
    color: ${props => props.theme === 'dark' ? '#eee': props.theme === 'light' ? '#333': props.theme === 'transparent' ? '#eee' : '#fff'};
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

