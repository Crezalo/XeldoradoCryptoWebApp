import React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import './index.css'
// import { ProductTable } from 'pages/Analytics'

import asvg from '../../assets/images/big_unicorn.png'

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

export const ProductTable = (props: { products: any; caption: string; nftURL: any }) => {
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
  // Conditionally wrapping content into a link
  // const ContentTag = to ? Link : 'div';
  const defaultStyle = {
    textDecoration: 'auto',
    color: 'blue',
  }

  const addr = '0xdc9232e2df177d7a12fdff6ecbab114e2231198d'
  const childrenCopy = children
  if (typeof children === 'string') {
    if (children.substring(0, 2) == '0x') {
      children = children.substring(0, 4) + '...' + children.substring(children.length - 4, children.length)
    }
    if (children.substring(0, 1) == '+') {
      defaultStyle.color = 'green'
      children += '%'
    }
    if (children.substring(0, 1) == '-') {
      defaultStyle.color = 'red'
      children += '%'
    }
  }
  let redirect = '/nft/'
  if (nftURL) {
    redirect += nftURL[0] + '/' + nftURL[1] + '/' + nftURL[2]
  }
  let link = '/pair/' + children
  if (to == 'Owner' || to == 'From') {
    link = 'https://polygonscan.com/address/' + childrenCopy
  }
  if (to == 'TransactionId') {
    link = 'https://polygonscan.com/tx/' + childrenCopy
  }
  if (to == 'Price') {
    redirect = '/pair/' + addr
  }

  return (
    <td onClick={() => handleOnClick(link, to)}>
      <Link style={defaultStyle} to={redirect}>
        {children}
      </Link>
    </td>
  )
}
function handleOnClick(link: string, to: string) {
  if (to != 'Price') {
    window.open(link)
  }
}

export function NFT({
  match: {
    params: { nftContractAddr: nftContractAddrUrl, tokenId: tokenIdUrl, creatorAddr: creatorAddrUrl },
  },
}: RouteComponentProps<{ nftContractAddr?: string; tokenId?: string; creatorAddr?: string }>) {
  // console.log()

  const isOwner = false
  const hasOwner = true
  const ownerAddress = !isOwner ? '- 0x14dC79964da2C08b23698B3D3cc7Ca32193d9955' : 'You'
  // api

  return (
    <div>
      <button>{nftContractAddrUrl}</button>
      <button>{tokenIdUrl}</button>
      <button>{creatorAddrUrl}</button>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="details">
          {/* <div className="green"> */}
          <div>Collection Name</div>
          <div>Name - Flying Horse</div>
          <div>Token Id - #{tokenIdUrl}</div>
          <div>
            Description - Drop 2 of Semiosis is 10 animated pieces, created to reflect the movement all around us.
            Signs, symbols and signals are everywhere around us in the built environment. They show us the way, warn us,
            excite us. But on their own they have no meaning. We all learn a shared visual language, devoid of words, to
            help us navigate the world. Semiosis is my first generative collection, featuring 25 unique symbols and 8
            different colours.
          </div>
          <div>Created By - 0x14dC79964da2C08b23698B3D3cc7Ca32193d9955</div>
          <div>Owned By {ownerAddress}</div>

          {/* <div>Properties</div> */}
          <div>Contract Address - {nftContractAddrUrl}</div>
          <div>Token Standard - ERC-721</div>

          <div>Blockchain - Polygon</div>
          {isOwner && hasOwner && <button>Return NFT</button>}
          {!(isOwner || hasOwner) && <button>Redeem NFT</button>}
        </div>
        <div className="chart">
          {/* <div className="blue"> */}
          <img src={asvg} width="300" height="300"></img>
        </div>
      </div>{' '}
      <ProductTable
        nftURL={[nftContractAddrUrl, tokenIdUrl, creatorAddrUrl]}
        caption={'Pools'}
        products={[
          {
            Owner: '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955',
            Price: '200 WETH',
            From: '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955',
            TransactionId: '0xa5d36fd4391758c50997085a22cd8cb7122754bf27200d09943fced034f8e729',
          },
          {
            Owner: '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955',
            Price: '200 WETH',
            From: '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955',
            TransactionId: '0xc60c695e08609b0e704fbdfe877930203750a4a5ba2b572d7d4383e962b81f69',
          },
          {
            Owner: '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955',
            Price: '200 WETH',
            From: '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955',
            TransactionId: '0xc60c695e08609b0e704fbdfe877930203750a4a5ba2b572d7d4383e962b81f69',
          },
          {
            Owner: '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955',
            Price: '200 WETH',
            From: '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955',
            TransactionId: '0xc60c695e08609b0e704fbdfe877930203750a4a5ba2b572d7d4383e962b81f69',
          },
          {
            Owner: '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955',
            Price: '200 WETH',
            From: '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955',
            TransactionId: '0xc60c695e08609b0e704fbdfe877930203750a4a5ba2b572d7d4383e962b81f69',
          },
          {
            Owner: '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955',
            Price: '200 WETH',
            From: '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955',
            TransactionId: '0xc60c695e08609b0e704fbdfe877930203750a4a5ba2b572d7d4383e962b81f69',
          },
        ]}
      />
    </div>
  )
}
