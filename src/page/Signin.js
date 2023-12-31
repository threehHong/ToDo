import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import InputWrap from "../component/InputWrap";
import ButtonWrap from "../component/ButtonWrap";
import { userApi } from "../api/user";

export default function Signin() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [active, setActive] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
    console.log(input);
  };

  const [alertMessage, setAlertMessage] = useState("");

  const ActiveButton = () => {
    setActive(input.email && input.password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(input);

    // signIn API
    userApi
      .signIn(input)
      .then((response) => {
        localStorage.setItem("access_token", response.data.access_token);
        if (localStorage.getItem("access_token")) {
          navigate("/todo");
        }
      })
      .catch((err) => {
        console.log(err);
        switch (err.response.status) {
          case 404:
            return setAlertMessage("해당 사용자가 존재하지 않습니다");
          case 401:
            return setAlertMessage("비밀번호가 틀렸습니다");
          default:
            console.log("출력");
        }
      });
  };

  // 토큰이 있을 경우 todo 페이지로 이동
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/todo");
      console.log("출력 확인");
    }
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <InputWrap>
        <input
          type="email"
          name="email"
          placeholder="email"
          onChange={handleChange}
          onKeyUp={ActiveButton}
          data-testid="email-input"
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
          onKeyUp={ActiveButton}
          data-testid="password-input"
        />
        <div style={{ width: "100%", textAlign: "end" }}>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/signup");
            }}>
            회원가입
          </span>
        </div>

        <div>
          <p style={{ color: "red" }}>{alertMessage}</p>
        </div>
      </InputWrap>

      <ButtonWrap>
        <Button $active={active} disabled={!active} data-testid="signin-button">
          {" "}
          로그인{" "}
        </Button>
      </ButtonWrap>
    </Form>
  );
}

const Form = styled.form`
  border: 1px solid #aaa;
  width: 350px;
  height: 400px;
  border-radius: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Button = styled.button`
  border: ${({ $active }) =>
    $active ? "1px solid #16A1EF" : "1px solid #A6D7FF"};
  background: ${({ $active }) => ($active ? "#16A1EF" : "#A6D7FF")};
  color: #fff;
  border-radius: 5px;
  width: 200px;
  line-height: 40px;
  cursor: pointer;
  text-align: center;
  transition: 1s;
`;
