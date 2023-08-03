import React from 'react'
import { Button } from './Form'

// import { styled } from 'styled-components'


export default function list({ todo, setTodo }) {
  
    return (
    <div>
        <ul>
            {todo.map((data, index) => (
                <li style={{ 
                    display: 'flex',
                    marginBottom: '10px'
                     }}>
                    <label>
                        <input type="checkbox" />
                        <span> {data.title} </span>
                    </label>
                    
                    <div style={{ marginLeft: '10px' }}>
                        <Button data-testid="modify-button">수정</Button>
                        <Button data-testid="delete-button">삭제</Button>
                    </div>
                </li>
            ))}
        </ul>
    </div>
  )
}
