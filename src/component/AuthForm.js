import React from 'react'
import { styled } from 'styled-components'

export const Section =  styled.section`
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const SignupForm =  styled.form`
  border: 1px solid #aaa;
  width: 350px;
  height: 400px;
  border-radius: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`

export default function AuthForm({children}) {
  return (
    <Section>
      {/* <SignupForm> */}
        {children}
      {/* </SignupForm> */}
    </Section>
  )
}
