import {
  Center,
  Container,
  Input,
  Language,
  Left,
  Logo,
  MenuItem,
  Right,
  SayingHi,
  SearchContainer,
  UserMenu,
  Wrapper,
  UserIconContainer,
} from "./Navbar.styled";

import Badge from "@mui/material/Badge";

import SearchIcon from "@mui/icons-material/Search";
import MailIcon from "@mui/icons-material/Mail";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountIcon from "@mui/icons-material/AccountBox";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useState } from "react";
import { logout } from "@/redux/userRedux";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const quantity = useSelector((state: any) => state.cart.quantity);
  const user = useSelector((state: any) => state.user.currentUser);

  const [isUserMenuShow, setIsUserMenuShow] = useState(false);

  const dispatch = useDispatch();

  const userLogout = () => {
    dispatch(logout());
    setIsUserMenuShow(false);
  };

  const toggleUserMenu = () => {
    setIsUserMenuShow(!isUserMenuShow);
  };
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <SearchIcon style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>EL-BLACK.</Logo>
        </Center>
        <Right>
          <Link
            href={"/register"}
            style={{ textDecoration: "none", display: `${user ? "none" : ""}` }}
          >
            <MenuItem>REGISTER</MenuItem>
          </Link>
          <Link
            href={"/login"}
            style={{ textDecoration: "none", display: `${user ? "none" : ""}` }}
          >
            <MenuItem>SIGN IN</MenuItem>
          </Link>
          <UserIconContainer>
            <PersonOutlinedIcon
              style={{ cursor: "pointer", display: `${!user ? "none" : ""}` }}
              onClick={toggleUserMenu}
            />
            <UserMenu
              style={{ display: `${isUserMenuShow ? "flex" : "none"}` }}
            >
              <div></div>
              <Link href={"/myaccount"}>
                <AccountIcon fontSize="small" />
                MyAccount
              </Link>
              <Link href={"/"} onClick={userLogout}>
                <LogoutIcon fontSize="small" />
                Logout
              </Link>
            </UserMenu>
          </UserIconContainer>
          <SayingHi style={{ display: `${!user ? "none" : ""}` }}>
            Hi, {user ? user.username : ""}
          </SayingHi>
          <MenuItem>
            <Link href={"/cart"}>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlinedIcon style={{ color: "#000000" }} />
              </Badge>
            </Link>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
