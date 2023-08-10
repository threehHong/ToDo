import React, { useState } from 'react'
import { Button } from './Form'
import axios from 'axios';
import { todoApi } from '../api/todo';

// import { styled } from 'styled-components'

const SERVER_URL = 'https://www.pre-onboarding-selection-task.shop';
const accessToken = localStorage.getItem("access_token");

export default function List({ todo, setTodo }) {
    const [editItemId, setEditItemId] = useState(null);
    const [newTodo, setNewTodo] = useState();
    const [isChecked, setIsChecked] = useState();
  
    // 삭제
    const handleClick = (id) => {
        
        // deleteTodo API
        todoApi.deleteTodo(id)
        .then(() => {
            let updateTodoList = todo.filter(data => data.id !== id)
            setTodo(updateTodoList);
            
        })
        .catch(err => console.log(err));
    }

    // 수정
    const handleModify = (id, data, check) => {
        setEditItemId(id);
        setNewTodo(data);
        setIsChecked(check);
    }

    const handleModifyChange = (e) => {
        setNewTodo(e.target.value);
    }

    const handleCancel = () => {
        setEditItemId(false);
    }

    const handleComplete = () => {

        // updateTodo API
        todoApi.updateTodo(editItemId, newTodo, isChecked)
        .then(() => {
            const updateTodoList = todo.map(data => {
                if(data.id === editItemId) {
                    return { ...data, todo: newTodo }
                }

                return data;
            })
            
            setTodo(updateTodoList);
            setEditItemId(false);
            
        })
        .catch(err => console.log(err));
    }

    // 체크
    const handleCheck = async (data) => {

        setIsChecked(!data.isCompleted);

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
                                    <input type="checkbox" checked={data.isCompleted} onChange={() => handleCheck(data)}/>
                                    <input type="text" value={newTodo} onChange={handleModifyChange} data-testid="modify-input"/>
                                </label>
                                
                                <div style={{ marginLeft: '10px' }}>
                                    <Button onClick={() => handleCancel(data.id, data.todo)} data-testid="cancel-button">취소</Button>
                                    <Button onClick={() => handleComplete(data.id)} data-testid="submit-button">제출</Button>
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