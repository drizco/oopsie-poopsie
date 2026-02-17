import React, { useContext } from 'react'
import { Modal, ModalBody } from 'reactstrap'
import AppStateContext from '../context/AppStateContext'

const ErrorModal = () => {
  const { error, setError } = useContext(AppStateContext)
  return (
    <Modal
      isOpen={!!error}
      toggle={() => {
        setError(null)
      }}
    >
      <ModalBody>
        <h2>Uh oh, something went wrong...</h2>
      </ModalBody>
    </Modal>
  )
}

export default ErrorModal
