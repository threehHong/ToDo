import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import InputWrap from "../component/InputWrap";
import ButtonWrap from "../component/ButtonWrap";
import { userApi } from "../api/user";

export default function Signup() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [active, setActive] = useState(false);

  const [alertMessage, setAlertMessage] = useState("");

  const navigate = useNavigate();

  const regexId = /@/;
  const regexPassword = /^.{6,}$/;

  const handleChange = (e) => {
    const { value, name } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
    console.log(input);
  };

  const ActiveButton = () => {
    const isIdValid = regexId.test(input.email);
    const isPasswordValid = regexPassword.test(input.password);

    console.log(isIdValid, isPasswordValid);

    setActive(isIdValid && isPasswordValid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(input);

    // signUp API
    userApi
      .signUp(input)
      .then(() => {
        navigate("/signin");
      })
      .catch((err) => {
        console.log(err);
        switch (err.response.status) {
          case 400:
            return setAlertMessage("동일한 이메일이 존재합니다");
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
              navigate("/signin");
            }}>
            로그인
          </span>
        </div>

        <div>
          <p style={{ color: "red" }}>{alertMessage}</p>
        </div>
      </InputWrap>

      <ButtonWrap>
        <Button $active={active} disabled={!active} data-testid="signup-button">
          {" "}
          회원가입{" "}
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

// transient props - styled - components랑 관련된 개념
const Button = styled.button`
  border: ${({ $active }) =>
    $active ? "1px solid #196B9A" : "1px solid #5F98B8"};
  background: ${({ $active }) => ($active ? "#196B9A" : "#5F98B8")};
  color: #fff;
  border-radius: 5px;
  width: 200px;
  line-height: 40px;
  cursor: pointer;
  text-align: center;
  transition: 1s;
`;
