import React, { Dispatch, FormEvent, useCallback, useState } from 'react'
import styled from 'styled-components'
import { throttle } from 'lodash'
import { CloseOutlined, SearchOutlined } from '@ant-design/icons'

const Search = styled.input`
  background: ${({ theme }) => `${theme.colors.darkGray}EF`};
  border: none;
  box-shadow: none;
  color: ${({ theme }) => theme.colors.text};
  height: 100%;
  margin-bottom: 12px;
  outline: transparent;
  padding-left: 40px;
  width: 100%;
  transition: outline 200ms ease;

  &:focus {
    outline: ${({ theme }) => `1px solid ${theme.colors.gray}`};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray};
  }
`

const SearchIcon = styled(SearchOutlined)`
  color: ${({ theme }) => theme.colors.gray};
  position: absolute;
  top: 14px;
  left: 12px;
  transition: color 200ms ease;

  ${Search}:focus ~ & {
    color: ${({ theme }) => theme.colors.text};
  }
`

const CloseButton = styled.button`
  background: transparent;
  border: none;
  box-shadow: none;
  cursor: pointer;
  padding: 4px;
  position: absolute;
  right: 8px;
  top: 8px;
  visibility: hidden;

  ${Search}:focus ~ & {
    visibility: visible !important;
  }
`

const CloseIcon = styled(CloseOutlined)`
  color: ${({ theme }) => theme.colors.gray};
  transition: color 200ms ease;

  ${CloseButton}:hover > & {
    color: ${({ theme }) => theme.colors.text};
  }
`

const Field = styled.div`
  position: relative;
  height: 48px;
  width: 100%;
`

interface Props {
  setSearchTerm: Dispatch<string>
}

const SearchBar: React.FC<Props> = ({ setSearchTerm }) => {
  const [keyword, setKeyword] = useState<string>('')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearching = useCallback(
    throttle((value) => setSearchTerm(value), 1000),
    []
  )

  const handleTyping = (event: FormEvent<EventTarget>) => {
    event.preventDefault()
    let target = event.target as HTMLInputElement
    setKeyword(target.value)
    debounceSearching(target.value)
  }

  return (
    <Field>
      <span className="d" />
      <Search
        onChange={handleTyping}
        placeholder="Search for hero"
        value={keyword}
      />
      <SearchIcon />
      <CloseButton>
        <CloseIcon />
      </CloseButton>
    </Field>
  )
}

export default React.memo(SearchBar)
