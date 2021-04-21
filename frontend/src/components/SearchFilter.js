import React from 'react'
import './filter.scss';
import styled from 'styled-components'
import {useEffect, useState} from "react";

let a = document.querySelector('#author')
let b = document.querySelector('#title')
let c = document.querySelector('#isbn')

function SearchFilter(props) {
    return (
        <body>

        
        <Container>
           <Flex>
                <AT>
                    <Author>
                
                    <input type="checkbox" class="hidden" name="cb" id="cb"/><label for="cb" onClick={() => props.onChange("Authors")}>Author</label>
                        
                    
                    </Author>
                    <Title>
                    <input type="checkbox" class="bro" name="cb1" id="cb1"/><label for="cb1" onClick={() => props.onChange("Title")}>Title</label>
                    </Title>
                    <ISBN>
                    <input type="checkbox" class="hidden3" name="cb2" id="cb2"/><label for="cb2" onClick={() => props.onChange("ISBN")}>ISBN</label>
                    </ISBN>
                    <Genre>
                    <input type="checkbox" class="hidden2" name="cb3" id="cb3"/><label for="cb3" onClick={() => props.onChange("Genres")}>Genre</label>
                    </Genre>
                    <Publisher>
                    <input type="checkbox" class="hidden2" name="cb4" id="cb4"/><label for="cb4" onClick={() => props.onChange("Publisher")}>Publisher</label>
                    </Publisher>
                    <D>
                    <input type="checkbox" class="hidden2" name="cb4" id="cb6"/><label for="cb6" onClick={() => props.onChange("Year_Publication")}>Date</label>
                    </D>
                    <L>
                    <input type="checkbox" class="hidden2" name="cb4" id="cb7"/><label for="cb7" onClick={() => props.onChange("Lang")}>Language</label>
                    </L>

                </AT>
           </Flex>
           
        </Container>
        </body>
    )
}

export default SearchFilter

const Container = styled.div`
    background: white;
    border-radius: 15px;
    height:auto;
    width:1100px;
    display:grid;
    margin: 0 auto;
    height:auto;
    padding-left: 50px;

`

const Text = styled.div`
font-family: Manrope;
font-style: normal;
font-weight: bold;
font-size: 20px;
line-height: 27px;
padding-right: 45px;
padding-top: 5px;
color: #000000;

`

const AT = styled.div`
padding-top: 5px;

display:flex;
flex-direction:row;

`
const Author = styled.div`
`
const Title = styled.div`
`

const IG = styled.div`
display:flex;
flex-direction:row;
`
const ISBN = styled.div`

`
const Genre = styled.div`

`
const PY = styled.div`
display:flex;
flex-direction:row;
`
const Publisher = styled.div`

`
const Year = styled.div`

`
const DL = styled.div`
display:flex;
flex-direction:row;
`
const D = styled.div`

`
const L = styled.div`

`

const Flex = styled.div`
padding-bottom: 5px;
`