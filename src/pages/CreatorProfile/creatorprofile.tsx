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
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
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
    <table>
      {/* <caption>{props.caption}</caption> */}
      <thead>
        <tr>
          {rowHeader.map((rowHeader: string) => (
            <th key={rowHeader}>
              <button type="button" onClick={() => requestSort(rowHeader)} className={getClassNamesFor(rowHeader)}>
                {rowHeader}
              </button>
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
    throw new Error('Function not implemented.')
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
          {isWalletAddress && isCreator && isVaultGenerated && <CreateNewNFTModal />}
          {isWalletAddress && isCreator && isVaultGenerated && <AddMintedNFTModal />}
          {isWalletAddress && isCreator && isVaultGenerated && !isICTOStarted && (
            <button>Initialize Liquidity Offering</button>
          )}
          {isCreator && isVaultGenerated && isICTOStarted && !isICTOComplete && <ICTOSubcriptionModal />}
        </div>
      </div>
      <div></div>

      <Tabs isCreator={isCreator} isVaultGenerated={isVaultGenerated} />
    </div>
  )
}
// const _onChange = (e: React.KeyboardEvent) => {
//   const name = this.props.data.Name;
//   const value = (e.target as HTMLInputElement).value;
//   this.props.onChange(name, value);
// }
const onChange = (e: ChangeEvent<HTMLInputElement>) => {
  const newValue = e.target.value
  console.log(newValue)
}
const CreateNewNFTModal = () => {
  const [modal, setModal] = useState(false)

  const toggle = () => setModal(!modal)
  return (
    <>
      <button onClick={toggle}>Create New NFT</button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          {/* <div> */}
          {/* <img src={asvg} /> */}
          {/* <ImagePlaceholder /> */}
          {/* </div> */}
          <input type="tex" onChange={onChange} placeholder="Name" />
          {/* <div>Name</div> */}
          <input type="tex" onChange={onChange} placeholder="Description" />
          {/* <div>Description</div> */}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Bid
          </Button>{' '}
          {/* <Button color="secondary" onClick={toggle}>
                Cancel
              </Button> */}
        </ModalFooter>
      </Modal>
    </>
  )
}

const AddMintedNFTModal = () => {
  const [modal, setModal] = useState(false)

  const toggle = () => setModal(!modal)
  return (
    <>
      <button onClick={toggle}>Add Minted NFT</button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          <input type="tex" onChange={onChange} placeholder="NFT Contract" />
          <input type="tex" onChange={onChange} placeholder="TokenId" />
          {/* <div>NFT Contract</div>
          <div>TokenId</div> */}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Bid
          </Button>{' '}
          {/* <Button color="secondary" onClick={toggle}>
                Cancel
              </Button> */}
        </ModalFooter>
      </Modal>
    </>
  )
}

const ICTOSubcriptionModal = () => {
  const [modal, setModal] = useState(false)

  const toggle = () => setModal(!modal)
  return (
    <>
      <button onClick={toggle}>View ICTO Subscription</button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          <input type="tex" onChange={onChange} placeholder="Min Bid Price" />
          <input type="tex" onChange={onChange} placeholder="Deadline" />
          {/* <div>Min Bid Price - 0.1 WETH</div>
          <div>Deadline - 14 Days</div> */}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Bid
          </Button>{' '}
          {/* <Button color="secondary" onClick={toggle}>
                Cancel
              </Button> */}
        </ModalFooter>
      </Modal>
    </>
  )
}

function handleCreatorAddressClick(creatorIdFromUrl: string | undefined): void {
  const addr = 'https://polygonscan.com/address/' + creatorIdFromUrl
  window.open(addr)
}

// export const ImagePlaceholder = () => {
//   const [images, setImages] = React.useState([])
//   const maxNumber = 69

//   const onChange = (imageList: any, addUpdateIndex: number[] | undefined) => {
//     // data for submit
//     console.log(imageList, addUpdateIndex)
//     setImages(imageList as never[])
//   }
//   {
//     return (
//       <ImageUploader
//         withIcon={false}
//         withPreview={true}
//         buttonText="Choose images"
//         onChange={onChange}
//         imgExtension={['.jpg', '.gif', '.png', '.gif']}
//         maxFileSize={5242880}
//       />
//     )
//   }

//   // const [images, setImages] = React.useState([])
//   // const maxNumber = 69

//   // const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
//   //   // data for submit
//   //   console.log(imageList, addUpdateIndex)
//   //   setImages(imageList as never[])
//   // }

//   // return (
//   //   <div className="App" style={{ fontFamily: 'sans-serif', textAlign: 'center' }}>
//   //     <ImageUploading multiple value={images} onChange={onChange} maxNumber={maxNumber}>
//   //       {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
//   //         // write your building UI
//   //         <div className="upload__image-wrapper">
//   //           <button style={isDragging ? { color: 'red' } : undefined} onClick={onImageUpload} {...dragProps}>
//   //             Click or Drop here
//   //           </button>
//   //           &nbsp;
//   //           <button onClick={onImageRemoveAll}>Remove all images</button>
//   //           {imageList.map((image: { dataURL: string | undefined }, index: React.Key | null | undefined) => (
//   //             <div key={index} className="image-item">
//   //               <img src={image.dataURL} alt="" width="100" />
//   //               <div className="image-item__btn-wrapper">
//   //                 <button onClick={() => onImageUpdate(index)}>Update</button>
//   //                 <button onClick={() => onImageRemove(index)}>Remove</button>
//   //               </div>
//   //             </div>
//   //           ))}
//   //         </div>
//   //       )}
//   //     </ImageUploading>
//   //   </div>
//   // )
// }
