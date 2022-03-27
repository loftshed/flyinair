import styled from "styled-components";
import { NavLink, useHistory } from "react-router-dom";

import slingairLogo from "../assets/logo_text.png";

const Header = () => {
  const history = useHistory();
  return (
    <Wrapper>
      <Logo onClick={() => history.push("/")}>FlyinAir✈️</Logo>
      <Nav>
        {/* TODO: only show link if the user has a reservation already */}
        <>
          <StyledNavLink to="/view-reservation">Reservation</StyledNavLink>
        </>
      </Nav>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  background: var(--color-dark-blue);
  height: 110px;
  padding: var(--padding-page) 24px;
`;
const Logo = styled.div`
  color: var(--color-lightest);
  font-family: "Fredoka One", cursive;
  font-size: 60px;
  cursor: pointer;
`;
const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const StyledNavLink = styled(NavLink)`
  background: var(--color-light-blue);
  border: 1px solid transparent;
  border-radius: 4px;
  color: var(--color-lightest);
  text-shadow: var(--color-red) 1px 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: var(--font-heading);
  font-size: 18px;
  height: 42px;
  margin: 0 0 0 8px;
  padding: 0 14px;
  width: 100%;
  text-decoration: none;
  transition: all ease 400ms;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:hover {
    background: var(--color-yellow);
    color: var(--color-lightest);
    border-color: var(--color-lightest);
  }
`;

export default Header;
