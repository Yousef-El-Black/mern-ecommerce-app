import styled from "styled-components";
import { mobile } from "@/responsive";

export const Container = styled.div`
  height: auto;
`;

export const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "5px 0px" })}
`;

export const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

export const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

export const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin: 25px;
  padding: 5px;
  ${mobile({ margin: "10px" })}
`;

export const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

export const Center = styled.div`
  flex: 1;
  text-align: center;
`;

export const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "18px" })}
`;

export const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: "2", justifyContent: "center" })}
`;

export const UserIconContainer = styled.div`
  position: relative;
`;

export const SayingHi = styled.span`
  margin-left: 10px;
`;

export const UserMenu = styled.div`
  background-color: white;
  width: 120px;
  height: 120px;
  position: absolute;
  transform: translate(-50%);
  left: 50%;
  top: calc(100% + 20px);
  border-radius: 10px;
  z-index: 4;
  box-shadow: 0px 0px 20px 0px black;
  transition: 0.3s;
  padding: 10px;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: start;
  font-size: 14px;

  div {
    border-bottom: 10px solid white;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid transparent;
    width: 1px;
    height: 1px;
    position: absolute;
    top: -15%;
    left: 50%;
    transform: translate(-50%);
  }

  a {
    display: flex;
    align-items: center;
    gap: 5px;
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;

export const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  color: black;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;
