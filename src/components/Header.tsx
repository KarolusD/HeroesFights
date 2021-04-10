import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { InfoCircleOutlined } from '@ant-design/icons'

const TopBar = styled.header`
  align-items: center;
  background: ${({ theme }) => theme.colors.dark};
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.almostBackground}`};
  display: flex;
  padding: 0 40px;
  flex-flow: row nowrap;
  justify-content: space-between;
  height: 80px;
  width: 100%;
`

const Logo = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.2rem;
`

const List = styled.ul`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  list-style-type: none;
`

const Item = styled.li``

const StyledLink = styled(NavLink)`
  align-items: center;
  border-bottom: 2px solid transparent;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  height: 80px;
  padding: 0 16px;
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
  }

  & .anticon {
    color: ${({ theme }) => theme.colors.text};
  }
`

interface Props {}

const Header: React.FC = (props: Props) => {
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
