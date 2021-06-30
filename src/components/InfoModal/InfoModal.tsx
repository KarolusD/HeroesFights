import React from 'react'
import styled from 'styled-components'

interface Props {
  info: JSX.Element | string
}

const InfoModal = ({ info }: Props) => {
  return <InfoText>{info}</InfoText>
}

const InfoText = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
`

export default InfoModal
