import './index.css'
import { ChangeEvent, SetStateAction, useState } from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import React from 'react'
import { ButtonGray } from 'components/Button'

type TokenDetailsProps = {
  isCreator: boolean
  isVaultGenerated: boolean
}
export const TokenDetails = ({ isCreator, isVaultGenerated }: TokenDetailsProps) => {
  const isWalletAddress = true
  const isICTOStarted = true
  const isICTOComplete = false

  function handleGenerateVault(): void {
    isVaultGenerated = true
    // TODO
  }
  return (
    <>
      {isWalletAddress && !isCreator && <ButtonGray>Become Creator</ButtonGray>}
      {isWalletAddress && !isVaultGenerated && (
        <ButtonGray onClick={() => handleGenerateVault()}>Generate Vault</ButtonGray>
      )}
      {isWalletAddress && isCreator && isVaultGenerated && (
        <EmptyModal
          modalBody={() => CreateNewNFTModalBody()}
          modalTitle={'Create New NFT'}
          modalFooterButtonText={'Create'}
        />
      )}
      {isWalletAddress && isCreator && isVaultGenerated && (
        <EmptyModal
          modalBody={() => AddMintedNFTModalBody()}
          modalTitle={'Add Minted NFT'}
          modalFooterButtonText={'Add'}
        />
      )}
      {isWalletAddress && isCreator && isVaultGenerated && !isICTOStarted && (
        <ButtonGray>Initialize Liquidity Offering</ButtonGray>
      )}
      {isCreator && isVaultGenerated && isICTOStarted && !isICTOComplete && (
        <EmptyModal
          modalBody={() => ICTOSubcriptionModalBody()}
          modalTitle={'View ICTO Subscription'}
          modalFooterButtonText={'Bid'}
        />
      )}
    </>
  )
}
const onChange = (e: ChangeEvent<HTMLInputElement>) => {
  const newValue = e.target.value
  console.log(newValue)
}

function CreateNewNFTModalBody() {
  const ImagePlaceholder = () => {
    const [selectedImage, setSelectedImage] = useState<any | null>(null)

    // This function will be triggered when the file field change
    const imageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        setSelectedImage(e.target.files[0])
      }
    }

    // This function will be triggered when the "Remove This Image" button is clicked
    const removeSelectedImage = (selectedImage: SetStateAction<undefined>) => {
      setSelectedImage(selectedImage)
    }

    return (
      <>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 50,
          }}
        >
          <input accept="image/*" type="file" onChange={imageChange} />

          {selectedImage && (
            <div
              style={{
                marginTop: 50,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <img src={URL.createObjectURL(selectedImage)} style={styles.image} alt="Thumb" />
              <button onClick={() => removeSelectedImage(selectedImage)} style={styles.delete}>
                Remove This Image
              </button>
            </div>
          )}
        </div>
      </>
    )
  }

  // Just some styles
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 50,
    },
    preview: {
      marginTop: 50,
      display: 'flex',
      flexDirection: 'column',
    },
    image: { maxWidth: '100%', maxHeight: 320 },
    delete: {
      cursor: 'pointer',
      padding: 15,
      background: 'red',
      color: 'white',
      border: 'none',
    },
  }
  return (
    <>
      <ImagePlaceholder />
      <input type="tex" onChange={onChange} placeholder="Name" />
      <input type="tex" onChange={onChange} placeholder="Description" />
    </>
  )
}
function AddMintedNFTModalBody() {
  return (
    <>
      <input type="tex" onChange={onChange} placeholder="NFT Contract" />
      <input type="tex" onChange={onChange} placeholder="TokenId" />
    </>
  )
}
function ICTOSubcriptionModalBody() {
  return (
    <>
      <input type="tex" onChange={onChange} placeholder="Min Bid Price" />
      <input type="tex" onChange={onChange} placeholder="Deadline" />
    </>
  )
}
interface props {
  modalBody: () => JSX.Element
  modalTitle: string
  modalFooterButtonText: string
}
const EmptyModal = ({ modalBody, modalTitle, modalFooterButtonText }: props) => {
  const [modal, setModal] = useState(false)

  const toggle = () => setModal(!modal)
  return (
    <>
      <ButtonGray onClick={toggle}>{modalTitle}</ButtonGray>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
        <ModalBody>{modalBody()}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            {modalFooterButtonText}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}
