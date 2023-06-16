import React from "react";

import { styled } from "styled-components";
import { NavLink } from "react-router-dom";

const StyledDiv = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 75px;
  background-color: var(--color-primary);
  color: var(--color-text-contrast);
  z-index: 100;
  box-shadow: 0px -3px 8px rgba(0, 0, 0, 0.1);

  .text {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100%;
  }

  .h2 {
    font-weight: 700;
    font-size: 1.4rem;
    margin: 0;
  }

  .h3 {
    font-size: 0.875rem;
    margin: 0;
  }

  a {
    background-color: #fff;
    color: #000;
    border: var(--color-border) 1px solid;
    font-size: 1rem;
    font-weight: 700;
    padding: 8px 16px;
    transition: all 0.3s;
    border-radius: 100px;

    &:hover {
      background-color: #e3e3e3;
    }
  }
`;

export default function LoginDownBar() {
  return (
    <StyledDiv>
      <div className="text">
        <div>
          <p className="h2">Don't miss what is happening</p>
          <p className="h3">People on Twitter are the first to know.</p>
        </div>
        <NavLink to="/login">Login</NavLink>
      </div>
    </StyledDiv>
  );
}
