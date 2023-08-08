import React from 'react'
import { styled } from 'styled-components'

const Input = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding-top: 30px;
  width: 300px;

  & > input {
    border-radius: 5px;
    padding-left: 5px;
    width: 100%;
    height: 40px;
    border: 2px solid #aaa;
    outline: none;
  }
`

export default function InputWrap({children}) {
  return (
    <Input>
        {children}
    </Input>
  )
}
