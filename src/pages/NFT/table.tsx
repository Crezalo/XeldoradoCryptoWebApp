import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'

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

export const Table = (props: { products: any; caption: string; nftURL: any }) => {
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
        maxWidth: '-webkit-fill-available',
        marginTop: '50px',
        marginLeft: '500px',
        marginRight: '500px',
        border: '2px solid black',
      }}
    >
      {/* <caption>{props.caption}</caption> */}
      <thead>
        <tr>
          {rowHeader.map((rowHeader: string) => (
            <th key={rowHeader}>
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
  // Conditionally wrapping content into a link
  // const ContentTag = to ? Link : 'div';
  const defaultStyle = {
    textDecoration: 'auto',
    color: 'blue',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
