import { login } from "@/redux/apiCalls";
import {
  Container,
  Wrapper,
  Title,
  Form,
  Input,
  Button,
  Error,
} from "./Login.styled";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const router: any = useRouter();

  const { isFetching, error } = useSelector((state: any) => state.user);

  const handleLogin = (e: any) => {
    e.preventDefault();
    login(dispatch, { username, password });
    router.push("/");
  };

  const user = useSelector((state: any) => state.user.currentUser);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, []);

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="username"
            onChange={(e: any) => setUsername(e.target.value)}
          />
          <Input
            placeholder="password"
            onChange={(e: any) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin} disabled={isFetching}>
            LOG IN
          </Button>
          {error && <Error>Something went Wrong...!</Error>}
          <Link
            href={"/"}
            style={{
              margin: "10px 0px",
              fontSize: "12px",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            DO NOT YOU REMEMBER THE PASSWORD?
          </Link>
          <Link
            href={"/"}
            style={{
              margin: "10px 0px",
              fontSize: "12px",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            CREATE A NEW ACCOUNT
          </Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default LoginPage;
