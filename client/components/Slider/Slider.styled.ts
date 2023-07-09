import { mobile } from "@/responsive";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({ display: "none" })}
`;

interface ArrowProps {
  direction: "left" | "right";
}

export const Arrow = styled.div<ArrowProps>`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  transition: 0.3s;
  z-index: 2;
  &:hover {
    opacity: 1;
  }
`;

interface WrapperProps {
  slideIndex: number;
}

export const Wrapper = styled.div<WrapperProps>`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

interface SlideProps {
  bg?: string;
}

export const Slide = styled.div<SlideProps>`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-self: center;
  background-color: #${(props) => props.bg};
`;

export const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
`;

export const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;

export const Title = styled.h1`
  font-size: 70px;
`;

export const Desc = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;

export const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;
