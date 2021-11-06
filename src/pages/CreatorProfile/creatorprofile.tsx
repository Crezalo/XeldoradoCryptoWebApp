import { Link, RouteComponentProps } from 'react-router-dom'
import './index.css'
import asvg from '../../assets/images/big_unicorn.png'
import { ChangeEvent, SetStateAction, useState } from 'react'
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap'
import classnames from 'classnames'
import Dashboard from 'pages/Dashboard'
import React from 'react'

const useSortableData = (items: any, _config = null) => {
  const [sortConfig, setSortConfig] = React.useState<any | null>(null)

  const sortedItems = React.useMemo(() => {
    const sortableItems = [...items]
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1
        }
        return 0
      })
    }
    return sortableItems
  }, [items, sortConfig])

  const requestSort = (key: any) => {
    let direction = 'ascending'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  return { items: sortedItems, requestSort, sortConfig }
}

export const ProductTable = (props: { products: any; caption: string; nftURL: string | undefined }) => {
  const { items, requestSort, sortConfig } = useSortableData(props.products)
  const getClassNamesFor = (name: string) => {
    if (!sortConfig) {
      return
    }
    return sortConfig.key === name ? sortConfig.direction : undefined
  }

  const rowHeader: any[] = Object.keys(items[0])
  const rowValue: any[] = Object.values(items)

  return (
    <table
      style={{
        // maxWidth: 'max-content',
        border: '2px solid black',
        width: '1320px',
        // minWidth: '960px',
        // width: '100%',
        // boxSizing: 'border-box',
      }}
    >
      {/* <caption>{props.caption}</caption> */}
      <thead>
        <tr>
          {rowHeader.map((rowHeader: string) => (
            <th key={rowHeader}>
              {' '}
              <div
                style={{
                  justifyContent: 'center',
                  display: 'flex',
                }}
              >
                <button
                  style={{
                    background: 'transparent',
                  }}
                  type="button"
                  onClick={() => requestSort(rowHeader)}
                  className={getClassNamesFor(rowHeader)}
                >
                  {rowHeader}
                </button>
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* {items.map((item) => ( */}
        {rowValue.map((rowHeader: any) => (
          <tr key={rowHeader}>
            {Object.entries(rowHeader).map(([key, value]) => (
              <Td key={key} to={key} nftURL={props.nftURL}>
                {value}
              </Td>
            ))}{' '}
          </tr>
        ))}
        {/* ))} */}
      </tbody>
    </table>
  )
}
type tdprops = {
  to: any
  children: any
  nftURL: string | undefined
}
export function Td({ to, children, nftURL }: tdprops) {
  const defaultStyle = {
    textDecoration: 'auto',
    color: 'blue',
    justifyContent: 'center',
    display: 'flex',
  }

  const addr = '0xdc9232e2df177d7a12fdff6ecbab114e2231198d'
  let redirect = '/pair/'
  redirect = '/pair/' + addr

  return (
    <td>
      <Link style={defaultStyle} to={redirect}>
        {children}
      </Link>
    </td>
  )
}

export function CreatorProfile(
  this: any,
  {
    match: {
      params: { creatorId: creatorIdFromUrl },
    },
  }: RouteComponentProps<{ creatorId?: string }>
) {
  console.log(creatorIdFromUrl)
  const [activeTab, setActiveTab] = useState('1')

  const toggle = (tab: SetStateAction<string>) => {
    if (activeTab !== tab) setActiveTab(tab)
  }
  const Tabs = (props: { isCreator: boolean; isVaultGenerated: boolean }) => {
    return (
      <>
        <Nav tabs style={{ width: '100%', justifyContent: 'center', cursor: 'pointer' }}>
          {props.isCreator && props.isVaultGenerated && (
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '1' })}
                onClick={() => {
                  toggle('1')
                }}
              >
                Vault NFTs
              </NavLink>
            </NavItem>
          )}

          {props.isCreator && props.isVaultGenerated && (
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '2' })}
                onClick={() => {
                  toggle('2')
                }}
              >
                Redeemed NFTs
              </NavLink>
            </NavItem>
          )}

          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '3' })}
              onClick={() => {
                toggle('3')
              }}
            >
              Owned NFTs
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '4' })}
              onClick={() => {
                toggle('4')
              }}
            >
              Owned Tokens
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">{Dashboard()}</TabPane>
          <TabPane tabId="2">{Dashboard()}</TabPane>
          <TabPane tabId="3">{Dashboard()}</TabPane>
          <TabPane tabId="4">
            <ProductTable
              products={[
                { Name: 'creator', Symbol: 'CT1', Price: '100 WTH' },
                { Name: 'creator', Symbol: 'CT1', Price: '100 WTH' },
                { Name: 'creator', Symbol: 'CT1', Price: '100 WTH' },
                { Name: 'creator', Symbol: 'CT1', Price: '100 WTH' },
                { Name: 'creator', Symbol: 'CT1', Price: '100 WTH' },
                { Name: 'creator', Symbol: 'CT1', Price: '100 WTH' },
              ]}
              caption={''}
              nftURL={creatorIdFromUrl}
            />
          </TabPane>
        </TabContent>
      </>
    )
  }

  const isCreator = true
  const isWalletAddress = true
  let isVaultGenerated = true
  const isICTOStarted = true
  const isICTOComplete = false

  function handleGenerateVault(): void {
    isVaultGenerated = true
    // TODO
  }
  const linkStyle = {
    color: 'black',
    '&:hover': {
      color: 'blue',
      cursor: 'pointer',
    },
  }

  // if (this.state.hover) {
  //   linkStyle.backgroundColor = 'blue'
  // }

  const displyCreatorAddr = creatorIdFromUrl
    ? creatorIdFromUrl.substring(0, 4) +
      '...' +
      creatorIdFromUrl.substring(creatorIdFromUrl.length - 4, creatorIdFromUrl.length)
    : undefined

  return (
    <div>
      <button>{creatorIdFromUrl}</button>

      <div>
        <div className="image">
          <img src={asvg} width="200" height="200" style={{ borderRadius: '200px' }}></img>
        </div>

        <div className="description">
          <div style={linkStyle} onClick={() => handleCreatorAddressClick(creatorIdFromUrl)}>
            {displyCreatorAddr}
          </div>
          <div>Creator Token</div>
          <div>100 WETH</div>
        </div>

        <div className="tokenDetails">
          {isWalletAddress && !isCreator && <button>Become Creator</button>}
          {isWalletAddress && !isVaultGenerated && (
            <button onClick={() => handleGenerateVault()}>Generate Vault</button>
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
            <button>Initialize Liquidity Offering</button>
          )}
          {isCreator && isVaultGenerated && isICTOStarted && !isICTOComplete && (
            <EmptyModal
              modalBody={() => ICTOSubcriptionModalBody()}
              modalTitle={'View ICTO Subscription'}
              modalFooterButtonText={'Bid'}
            />
          )}
        </div>
      </div>
      <div></div>

      <Tabs isCreator={isCreator} isVaultGenerated={isVaultGenerated} />
    </div>
  )
}
const onChange = (e: ChangeEvent<HTMLInputElement>) => {
  const newValue = e.target.value
  console.log(newValue)
}

function CreateNewNFTModalBody() {
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
      <button onClick={toggle}>{modalTitle}</button>

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

function handleCreatorAddressClick(creatorIdFromUrl: string | undefined): void {
  const addr = 'https://polygonscan.com/address/' + creatorIdFromUrl
  window.open(addr)
}

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
