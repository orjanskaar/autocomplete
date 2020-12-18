import React from 'react'
import styled from 'styled-components'



export const Autocomplete = (props) => {
    const [list, setList] = React.useState([])
    const [displ, setDispl] = React.useState(false)
    const handleInput = (e) => {
        setList([])
        if (e.target.value.length > 0) {
            setDispl(true)
            function search(itm) {
            const value = e.target.value
            const pattern = new RegExp(`${value}`, 'gi')
            const str = itm.name
            let result = pattern.test(str)
            return result ? str : null
            }
            const array = props.data.filter(search)
            setList(array)
        }else {setList([])}
    }

    const handleClick = (e) => {
        const SearchBox = document.getElementById('custSearchBox')
        console.log(e.target.innerHTML)
        SearchBox.value = e.target.innerHTML
        setDispl(false)
    }
    return (
        
            <InpContainer id="InpContainer">
                <Input 
                    id="custSearchBox" 
                    type="text" 
                    onKeyUp={handleInput} 
                    width={props.width} 
                    theme={props.theme} 
                    autoComplete="off"
                />
                {displ && <List>
                    {
                        list.slice(0, 10).map(itm => {
                            return <ListItem onClick={handleClick} theme={props.theme}>{itm.name}</ListItem>
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
    background-color: ${props => props.theme === 'dark' ? '#444': props.theme === 'light' ? '#fff': props.theme === 'transparent' ? 'transparent' : '#fff'};
    color: ${props => props.theme === 'dark' ? '#eee': props.theme === 'light' ? '#333': props.theme === 'transparent' ? '#333' : '#fff'};
`
const List = styled.div `
    max-height: 300px;
`
const ListItem = styled.div `
    background-color: gray;
    padding: 0.5rem;
    background-color: ${props => props.theme === 'dark' ? '#444': props.theme === 'light' ? '#fff': props.theme === 'transparent' ? 'transparent' : '#fff'};
    color: ${props => props.theme === 'dark' ? '#eee': props.theme === 'light' ? '#333': props.theme === 'transparent' ? '#333' : '#fff'};
    border-left: 2px solid blueviolet;
    margin-bottom: 1px;
    cursor: pointer;
    transition: transform 0.2s ease;
    :hover {
        background-color: ${props => props.theme === 'dark' ? '#555': props.theme === 'light' ? '#eee': props.theme === 'transparent' ? 'rgba(0,0,0,0.3)' : '#fff'};
        transform: scale(1.1);
    }
`

