import React, { useState } from 'react'
import { styled } from 'styled-components'
import {useNavigate} from 'react-router-dom';
import AuthForm from '../component/AuthForm'
import InputWrap from '../component/InputWrap'
import ButtonWrap from '../component/ButtonWrap'
import axios from 'axios';

const SERVER_URL = 'https://www.pre-onboarding-selection-task.shop';

const Form =  styled.form`
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

const Button = styled.button`
  border: ${({ $active }) => ($active ? '1px solid #16A1EF' : '1px solid #A6D7FF')};
  background: ${({ $active }) => ($active ? '#16A1EF' : '#A6D7FF')};
  color: #fff;
  border-radius: 5px;
  width: 200px;
  line-height: 40px;
  cursor: pointer;
  text-align: center;
  transition: 1s;
`

export default function Signin() {
    const [input, setInput] = useState({
        email: '',
        password: ''
        })

    const [active, setActive] = useState(false);

    const handleChange = (e) => {
        const { value, name } = e.target;
        setInput({
        ...input,
        [name]: value,
        })
        console.log(input);
    }

    const ActiveButton = () => {
        setActive(input.email && input.password);
    }

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        console.log(input);
    
        await axios.post(`${SERVER_URL}/auth/signin`, input).catch(error => console.log(error));
    
        if(active) {
          navigate("/todo");
        }
      }

    return (
        <AuthForm>
            <Form onSubmit={handleSubmit}>
                <InputWrap>
                    <input type="email" name="email" placeholder="email" onChange={handleChange} onKeyUp={ActiveButton}/> 
                    <input type="password" name="password" placeholder="password" onChange={handleChange} onKeyUp={ActiveButton}/>
                    <div style={{width: '100%', textAlign: 'end'}}>
                        <span style={{cursor: 'pointer'}} onClick={() => {navigate("/signup");}}>
                            회원가입 
                        </span>
                    </div>
                </InputWrap>

                <ButtonWrap>
                    <Button $active={active} /* disabled="true" */> 로그인 </Button>
                </ButtonWrap>
            </Form>
        </AuthForm>
    )
}
