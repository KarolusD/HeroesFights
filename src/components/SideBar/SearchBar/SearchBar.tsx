import React, { Dispatch, FormEvent, useCallback, useState } from 'react'
import styled from 'styled-components'
import { throttle } from 'lodash'
import { CloseOutlined, SearchOutlined } from '@ant-design/icons'

interface Props {
  setSearchTerm: Dispatch<string>
}

const SearchBar: React.FC<Props> = ({ setSearchTerm }) => {
  const [keyword, setKeyword] = useState<string>('')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const throttleSearching = useCallback(
    throttle((value) => setSearchTerm(value), 500),
    []
  )

  const handleTyping = (event: FormEvent<EventTarget>) => {
    event.preventDefault()
    let target = event.target as HTMLInputElement
    setKeyword(target.value)
    throttleSearching(target.value)
  }

  const clearSearch = (event: FormEvent<EventTarget>) => {
    event.preventDefault()
    setKeyword('')
    throttleSearching('')
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
      <CloseButton type="button" onClick={(e) => clearSearch(e)}>
        <CloseIcon />
      </CloseButton>
    </Field>
  )
}

export default React.memo(SearchBar)

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
  opacity: 0;

  ${Search}:not(:placeholder-shown) ~ & {
    opacity: 1;
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
