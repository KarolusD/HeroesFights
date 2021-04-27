import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { InfoCircleOutlined } from '@ant-design/icons'

interface Props {}

const Header: React.FC<Props> = () => {
  return (
    <TopBar>
      <Logo>Super heros fights</Logo>
      <nav>
        <List>
          <Item>
            <StyledLink exact to="/hero-vs-hero" activeClassName="selected">
              Hero vs Hero
            </StyledLink>
          </Item>
          <Item>
            <StyledLink exact to="team-vs-team" activeClassName="selected">
              Team vs Team
            </StyledLink>
          </Item>
        </List>
      </nav>
      <Info>
        <p>Info</p>
        <InfoCircleOutlined />
      </Info>
    </TopBar>
  )
}

export default Header

const TopBar = styled.header`
  align-items: center;
  background: ${({ theme }) => theme.colors.dark};
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.almostBackground}`};
  display: flex;
  flex-flow: row nowrap;
  height: 80px;
  justify-content: space-between;
  padding: 0 40px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;

  @media (max-width: 765px) {
    padding: 0 16px;
  }
`

const Logo = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.2rem;
  font-weight: 500;

  @media (max-width: 765px) {
    display: none;
  }
`

const List = styled.ul`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  list-style-type: none;
  margin-right: 80px;

  @media (max-width: 765px) {
    justify-content: flex-start;
    width: 100%;
  }
`

const Item = styled.li`
  font-size: 1rem;
  font-weight: 300;
`

const StyledLink = styled(NavLink)`
  align-items: center;
  border-bottom: 2px solid transparent;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  height: 80px;
  padding: 0 16px;
  text-align: center;
  text-decoration: none;
  transition: 200ms ease;

  &:hover {
    background: ${({ theme }) => `${theme.colors.violet}16`};
  }

  &.selected {
    border-bottom: ${({ theme }) => `2px solid ${theme.colors.violet}`};
    background: ${({ theme }) => `${theme.colors.violet}16`};
    color: ${({ theme }) => theme.colors.violet};
  }
`

const Info = styled.a`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  text-decoration: none;
  cursor: pointer;

  & > p {
    color: ${({ theme }) => theme.colors.text};
    margin-right: 8px;

    @media (max-width: 765px) {
      display: none;
    }
  }

  & .anticon {
    color: ${({ theme }) => theme.colors.text};
  }
`
