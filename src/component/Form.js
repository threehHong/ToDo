import React from 'react'
import styled from 'styled-components'

const Input = styled.input`
  outline: 0;
  border: 0;
  border-bottom: 1px solid #aaa;
  padding-left: 10px;
`

export const Button = styled.button`
  margin: 0px 3px 5px;
`

export default function Form({ handleSubmit, value, setValue }) {
  const handleChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input 
        text="text"
        placeholder='해야할 일을 입력하세요'
        onChange={handleChange}
        value={value}
      />

      <Button> 추가 </Button>

      <hr style={{ background: '#aaa' }} />
    </form>
  )
}
