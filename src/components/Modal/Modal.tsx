import { CloseOutlined } from '@ant-design/icons'
import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import FocusLock from 'react-focus-lock'

interface Props {
  isOpen: boolean
  close: () => void
  modalContent: JSX.Element
  headerText: string
}

const Modal = ({ isOpen, close, modalContent, headerText }: Props) => {
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && isOpen) {
      close()
    }
  }

  useEffect(() => {
    // isOpen
    //   ? (document.body.style.overflow = 'hidden')
    //   : (document.body.style.overflow = 'unset')
    document.addEventListener('keydown', onKeyDown, false)
    return () => {
      document.removeEventListener('keydown', onKeyDown, false)
    }
  }, [isOpen])

  const modal = (
    <>
      <Backdrop onClick={close} />
      <FocusLock>
        <Wrapper
          aria-modal
          aria-labelledby={headerText}
          tabIndex={-1}
          role="dialog"
        >
          <StyledModal>
            <Header>
              <HeaderText>{headerText}</HeaderText>
              <CloseButton
                type="button"
                data-dismiss="modal"
                aria-label="Close"
                onClick={close}
              >
                <CloseOutlined />
              </CloseButton>
            </Header>
            <Content>{modalContent}</Content>
          </StyledModal>
        </Wrapper>
      </FocusLock>
    </>
  )
  return isOpen ? createPortal(modal, document.body) : null
}

export default Modal

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 700;
  width: inherit;
  outline: 0;
`
const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 500;
`
const StyledModal = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border: ${({ theme }) => `1px solid ${theme.colors.almostBackground}`};
  position: relative;
  margin: auto;
  width: 100%;
  max-width: 640px;
  min-width: 320px;
  z-index: 100;
  padding: 16px 24px;

  & p {
    color: ${({ theme }) => theme.colors.text};
  }

  & a {
    color: orange;
  }
`

const Header = styled.div`
  border-radius: 8px 8px 0 0;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`

const HeaderText = styled.div`
  font-weight: 600;
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.text};
`

const CloseButton = styled.button`
  font-size: 0.8rem;
  border: none;
  border-radius: 3px;
  margin-left: 0.5rem;
  background: none;
  :hover {
    cursor: pointer;
  }

  & .anticon {
    color: ${({ theme }) => theme.colors.text};
  }
`

const Content = styled.div`
  max-height: 30rem;
  overflow-x: hidden;
  overflow-y: auto;
  margin-bottom: 8px;
`
