import React, { useState } from 'react'
import { Button } from './Form'

// import { styled } from 'styled-components'


export default function List({ todo, setTodo }) {
    const [editItemId, setEditItemId] = useState(null);
    const [newTodo, setNewTodo] = useState();
    const [checkedList, setCheckedList] = useState([]);
  
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

    // 체크
    const handleCheck = (data) => {
        if(checkedList.includes(data.id)) {
            let newCheckedList = checkedList.filter(list => list !== data.id)
            setCheckedList(newCheckedList);
            console.log(newCheckedList);
        } else {
            let newCheckedList = [...checkedList, data.id]
            setCheckedList([...checkedList, data.id]);
            console.log(newCheckedList);
        }
    }

    return (
        <div>
            <ul>
                {todo.map((data, index) => (
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
                                    <Button onClick={() => handleCancle(data.id, data.title)}>취소</Button>
                                    <Button onClick={() => handleComplete(data.id)} >완료</Button>
                                </div>
                            </>

                            :

                            <>
                                <label>
                                    <input type="checkbox" checked={checkedList.includes(data.id) ? true : false} onChange={() => handleCheck(data)}/>
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
