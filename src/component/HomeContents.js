import React, { useEffect } from 'react'
import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom';

const Sign = styled.div`
    display: flex;
    gap: 30px;

    & > span {
        border-radius: 10px;
        width: 100px;
        line-height: 30px;
        text-align: center;
        color: #fff;
        cursor: pointer;
    }
`
const SignIn = styled.span`
    border: 1px solid #16A1EF;
    background: #16A1EF;
`

const SignUp = styled.span`
    border: 1px solid #196B9A;
    background: #196B9A;
`

export default function HomeContents() {
  const accessToken = localStorage.getItem("access_token");
  const navigate = useNavigate();

  // 토큰이 있을 경우 todo 페이지로 이동 그렇지 않을 경우 유지.
  useEffect(() => {
    if(accessToken) {
      navigate('/todo');
    }
  }, []);

  const handleClick = (page) => {
    page === 'signin'? navigate('/signin') : navigate('/signup');
  }


  return (
    <Sign> 
        <SignIn onClick={() => handleClick('signin')}>
            로그인
        </SignIn>

        <SignUp onClick={() => handleClick('signup')}>
            회원가입
        </SignUp>
    </Sign>
  )
}
