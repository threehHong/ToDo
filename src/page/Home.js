import React from 'react'
import { Outlet } from 'react-router-dom'
import { styled } from 'styled-components'

const Section =  styled.section`
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default function Home() {
  return (
    <Section>
        <Outlet />
    </Section>
  )
}
