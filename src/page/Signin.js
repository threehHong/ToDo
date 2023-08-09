import React, { useEffect, useState } from 'react'
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

    const navigate = useNavigate();

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

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        console.log(input);
    
        try {
            const response = await axios.post(`${SERVER_URL}/auth/signin`, input);
    
            localStorage.setItem("access_token", response.data.access_token);
            
            if (localStorage.getItem("access_token")) {
                navigate("/todo");
            }
        } catch (error) {
            console.log("error message:", error);
        }
    }

    // 토큰이 있을 경우 todo 페이지로 이동
    useEffect(() => {
        if (localStorage.getItem("access_token")) {
          navigate("/todo");
          console.log('출력 확인')
        }
    }, []);

    return (
        <AuthForm>
            <Form onSubmit={handleSubmit}>
                <InputWrap>
                    <input type="email" name="email" placeholder="email" onChange={handleChange} onKeyUp={ActiveButton} data-testid="email-input"/> 
                    <input type="password" name="password" placeholder="password" onChange={handleChange} onKeyUp={ActiveButton} data-testid="password-input"/>
                    <div style={{width: '100%', textAlign: 'end'}}>
                        <span style={{cursor: 'pointer'}} onClick={() => {navigate("/signup");}}>
                            회원가입 
                        </span>
                    </div>
                </InputWrap>

                <ButtonWrap> 
                    <Button $active={active} disabled={!active} data-testid="signin-button"> 로그인 </Button>
                </ButtonWrap>
            </Form>
        </AuthForm>
    )
}
