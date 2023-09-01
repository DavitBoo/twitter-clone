import React, { useState } from "react";
import { styled } from "styled-components";

const StyledDiv = styled.div`
  font-weight: 700;

  ul {
    display: flex;
    justify-content: space-around;
    padding: 0;
  }

  ul li {
    flex: 1 1 100%;

    &:hover {
      background-color: #dee3e9;
      transition: all 0.2s;
    }
  }

  ul > li > div {
    text-align: center;
    cursor: pointer;
  }

  ul > li > .active > div {
    background-color: var(--color-primary);
    height: 4px;
    align-self: center;
    min-width: 56px;
    display: inline-block;
  }

  ul > li > div:not(.active) {
    color: var(--color-text-secondary);
  }
`;

enum ActiveMenu {
  ForYou,
  Following,
}

type SelectMenuProps = Partial<{
  activeMenu: ActiveMenu;
  setActiveMenu: (activeMenu: ActiveMenu) => void;
  logged: boolean;
}>;

export default function SelectMenu({ activeMenu, setActiveMenu, logged }: SelectMenuProps) {
  const activeLeftByClick = () => {
    setActiveMenu!(ActiveMenu.ForYou); // "!" to assert that setActiveMenu is not null or undefined
  };

  const activeRightByClick = () => {
    setActiveMenu!(ActiveMenu.Following);
  };

  return (
    <StyledDiv>
      <ul>
        {logged && (
          <>
            <li onClick={activeLeftByClick}>
              <div className={activeMenu === ActiveMenu.ForYou ? "active" : ""}>
                <p>For you</p>
                <div></div>
              </div>
            </li>
            <li onClick={activeRightByClick}>
              <div className={activeMenu === ActiveMenu.Following ? "active" : ""}>
                <p>Following</p>
                <div></div>
              </div>
            </li>
          </>
        )}
        {!logged && (
          <li>
            <div className="active">
              <p>General Feed</p>
              <div></div>
            </div>
          </li>
        )}
      </ul>
    </StyledDiv>
  );
}
