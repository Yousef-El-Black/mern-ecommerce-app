import { useState, useEffect } from "react";
import {
  Container,
  Form,
  Input,
  Title,
  Wrapper,
  Agreement,
  Button,
} from "./Register.styled";
import { publicRequest } from "@/requestMethods";
import { useRouter } from "next/router";
import { login } from "@/redux/apiCalls";
import { useDispatch } from "react-redux";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isFormFull, setIsFormFull] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (isFormFull) {
      try {
        await publicRequest
          .post("/auth/register/", {
            isAdmin: false,
            name: firstName.trim() + " " + lastName.trim(),
            email,
            username,
            password,
          })
          .then(() => login(dispatch, { username, password }))
          .then(() => router.push("/myaccount"));
      } catch (err) {}
    } else {
      alert("Form is Not Correct");
    }
  };

  useEffect(() => {
    if (
      firstName &&
      lastName &&
      username &&
      email &&
      password &&
      password === confirmPassword
    ) {
      setIsFormFull(true);
    } else {
      setIsFormFull(false);
    }
  }, [firstName, lastName, username, email, password, confirmPassword]);

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input
            type="text"
            placeholder="name"
            value={firstName}
            onChange={(e: any) => setFirstName(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="lastname"
            value={lastName}
            onChange={(e: any) => setLastName(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e: any) => setUsername(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e: any) => setConfirmPassword(e.target.value)}
            required
          />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data on accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleSubmit}>CREATE ACCOUNT</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
