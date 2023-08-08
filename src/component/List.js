import React, { useState } from 'react'
import { Button } from './Form'
import axios from 'axios';

// import { styled } from 'styled-components'

const SERVER_URL = 'https://www.pre-onboarding-selection-task.shop';
const accessToken = localStorage.getItem("access_token");

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

    const handleCancel = () => {
        setEditItemId(false);
    }

    const handleComplete = async () => {

        // updateTodo API - todo
        try {
            const updateTodo = await axios.put(`${SERVER_URL}/todos/${editItemId}`, 
            { 
                todo: newTodo,
                isCompleted: true,
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
        
            // console.log(updateTodo);
            
            // 렌더링
            const updateTodoList = todo.map(data => {
                if(data.id === editItemId) {
                    return { ...data, todo: newTodo }
                }

                return data;
            })
            
            setTodo(updateTodoList);
            setEditItemId(false);

        } catch (error) {
            console.log("error message:", error);
        }
    }

    // 체크
    const handleCheck = async (data) => {

        const updateTodoCheck = todo.map(list => {
            if(list.id === data.id) {
                return { ...list, isCompleted: !data.isCompleted }
            }
            return list
        })
        setTodo(updateTodoCheck);

        // updateTodo API - check
        try {
            const updateTodoCheck = await axios.put(`${SERVER_URL}/todos/${data.id}`, 
            { 
                todo: data.todo,
                isCompleted: !data.isCompleted,
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
        
            console.log(updateTodoCheck);
            
            // 렌더링
            todo.map(list => {
                if(list.id === data.id) {
                    return { ...list, isCompleted: !data.isCompleted }
                }
                return list
            })
    

        } catch (error) {
            console.log("error message:", error);
        }
    }

    return (
        <div>
            <ul>
                {todo.map((data) => (
                    <li 
                        key={data.id}
                        style={{ 
                            display: 'flex',
                            marginBottom: '10px'
                        }}>

                        {editItemId === data.id ?
                            <>
                                <label>
                                    <input type="checkbox"/>
                                    <input type="text" value={newTodo} 
                                    onChange={handleModifyChange} />
                                </label>
                                
                                <div style={{ marginLeft: '10px' }}>
                                    <Button onClick={() => handleCancel(data.id, data.todo)}>취소</Button>
                                    <Button onClick={() => handleComplete(data.id)} >제출</Button>
                                </div>
                            </>

                            :

                            <>
                                <label> {/* checked={checkedList.includes(data.id) ? true : false} */}
                                    <input type="checkbox" checked={data.isCompleted} onChange={() => handleCheck(data)}/>
                                    <span> {data.todo} </span>
                                </label>
                                
                                <div style={{ marginLeft: '10px' }}>
                                    <Button data-testid="modify-button" onClick={() => handleModify(data.id, data.todo, data.isCompleted)}>수정</Button>
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