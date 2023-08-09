import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import AuthForm from '../component/AuthForm';
import InputWrap from '../component/InputWrap';
import ButtonWrap from '../component/ButtonWrap';

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

// transient props - styled - components랑 관련된 개념
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

export default function Signup() {
  const [input, setInput] = useState({
    email: '',
    password: '',
  })
  const [active, setActive] = useState(false);

  const navigate = useNavigate();

  const regexId = /@/;
  const regexPassword = /^.{6,}$/

  const handleChange = (e) => {
    const { value, name } = e.target;
    setInput({
      ...input,
      [name]: value,
    })
    console.log(input);
  }

  const ActiveButton = () => {
    const isIdValid = regexId.test(input.email);
    const isPasswordValid = regexPassword.test(input.password);

    console.log(isIdValid, isPasswordValid);

    setActive(isIdValid && isPasswordValid);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(input);

    await axios.post(`${SERVER_URL}/auth/signup`, input).catch(error => console.log(error));

    if(active) {
      navigate("/signin");
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
        </InputWrap>
        
        <ButtonWrap> 
          <Button $active={active} data-testid="signup-button"> 회원가입 </Button>
        </ButtonWrap>
      </Form>
    </AuthForm>
     
  )
}

