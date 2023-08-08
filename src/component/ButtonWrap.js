import React from 'react'
import { styled } from 'styled-components'

const Button = styled.div`
    transform: translateY(-20px);
    transition: 1s;
`

export default function ButtonWrap({children}) {
  return (
    <Button>
        {children}
    </Button>
  )
}
