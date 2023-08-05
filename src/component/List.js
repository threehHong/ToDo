import React, { useState } from 'react'
import { Button } from './Form'

// import { styled } from 'styled-components'


export default function List({ todo, setTodo }) {
    const [editItemId, setEditItemId] = useState(null);
    const [newTodo, setNewTodo] = useState();

  
    // 삭제
    const handleClick = (id) => {
        let newTodoData = todo.filter(data => data.id !== id)
        setTodo(newTodoData);
    }

    // 수정
    const handleModify = (id, data) => {
        setEditItemId(id);
        setNewTodo(data);
    }

    const handleModifyChange = (e) => {
        setNewTodo(e.target.value);
    }

    const handleCancle = () => {
        setEditItemId(false);
    }

    const handleComplete = () => {
        const updateTodo = todo.map(data => {
            if(data.id === editItemId) {
                return { ...data, title: newTodo};
            }

            return data;
        })
        setTodo(updateTodo);
        setEditItemId(false);
    }

    return (
        <div>
            <ul>
                {todo.map((data, index) => (
                    <li style={{ 
                        display: 'flex',
                        marginBottom: '10px'
                        }}>

                        {editItemId === data.id ?
                            <>
                                <label>
                                    <input type="checkbox"/>
                                    <input type="text" onChange={handleModifyChange} value={newTodo} />
                                </label>
                                
                                <div style={{ marginLeft: '10px' }}>
                                    <Button onClick={() => handleCancle(data.id, data.title)}>취소</Button>
                                    <Button onClick={() => handleComplete(data.id)} >완료</Button>
                                </div>
                            </>

                            :

                            <>
                                <label>
                                    <input type="checkbox"  />
                                    <span> {data.title} </span>
                                </label>
                                
                                <div style={{ marginLeft: '10px' }}>
                                    <Button data-testid="modify-button" onClick={() => handleModify(data.id, data.title)}>수정</Button>
                                    <Button data-testid="delete-button" onClick={() => handleClick(data.id)} >삭제</Button>
                                </div>
                            </>
                        }

                    </li>
                ))}
            </ul>
        </div>
    )
}
