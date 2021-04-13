import React, { Dispatch, FormEvent, useCallback, useState } from 'react'
import styled from 'styled-components'
import { debounce } from 'lodash'
import { SearchOutlined } from '@ant-design/icons'

const Field = styled.div`
  position: relative;
  height: 48px;
  width: 100%;

  & .search-icon {
    color: ${({ theme }) => theme.colors.gray};
    position: absolute;
    top: 14px;
    left: 12px;
  }
`

const Search = styled.input`
  background: ${({ theme }) => `${theme.colors.darkGray}EF`};
  border: none;
  box-shadow: none;
  color: ${({ theme }) => theme.colors.text};
  height: 100%;
  margin-bottom: 12px;
  padding-left: 40px;
  width: 100%;

  &:focus + .search-icon {
    color: ${({ theme }) => theme.colors.text};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray};
  }
`

interface Props {
  searchTerm: string
  setSearchTerm: Dispatch<string>
}

const SearchBar: React.FC<Props> = ({ searchTerm, setSearchTerm }) => {
  const [keyword, setKeyword] = useState<string>('')

  const debounceSearching = useCallback(
    (value) => {
      debounce(() => {
        setSearchTerm(value)
        // send the server request here
      }, 1000)
    },
    [setSearchTerm]
  )

  const handleTyping = (event: FormEvent<EventTarget>) => {
    event.preventDefault()
    let target = event.target as HTMLInputElement
    setKeyword(target.value)
    debounceSearching(target.value)
  }

  return (
    <Field>
      <SearchOutlined className="search-icon" />
      <Search
        value={keyword}
        placeholder="Search for hero"
        onChange={handleTyping}
      />
    </Field>
  )
}

export default React.memo(SearchBar)
