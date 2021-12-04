//import Modal from 'components/Modal'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Button } from 'rebass'

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

export const Table = (props: { products: any; caption: string }) => {
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
        maxWidth: 'fit-content',
        marginTop: '50px',
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
              </div>{' '}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* {items.map((item) => ( */}
        {rowValue.map((rowHeader: any) => (
          <tr key={rowHeader}>
            {Object.entries(rowHeader).map(([key, value]) => (
              <Td key={key} to={key} rowValue={rowHeader}>
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
  rowValue: any
}
export function Td(this: any, { to, children, rowValue }: tdprops) {
  // Conditionally wrapping content into a link
  // const ContentTag = to ? Link : 'div';
  const defaultStyle = {
    textDecoration: 'auto',
    color: 'blue',
    justifyContent: 'center',
    display: 'flex',
  }
  if (to == 'Bid Creator Token') {
    defaultStyle.color = 'green'
  }
  console.log('td: ' + rowValue)
  const sto = rowValue.Creator
  console.log('sto ' + sto)

  const addr = '0xdc9232e2df177d7a12fdff6ecbab114e2231198d'
  const childrenCopy = children
  if (typeof children === 'string') {
    if (children.substring(0, 2) == '0x') {
      children = children.substring(0, 4) + '...' + children.substring(children.length - 4, children.length)
    }
  }
  let redirect = '/icto'
  if (to == 'Creator') {
    redirect = '/creator/' + children
  }

  const [modal, setModal] = useState(false)

  const toggle = () => setModal(!modal)
  return (
    <td>
      {to == 'Bid Creator Token' ? (
        <>
          <div style={defaultStyle}>
            <button onClick={toggle} style={{ color: 'black' }}>
              {children}
            </button>
          </div>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Modal title</ModalHeader>
            <ModalBody>
              <div>Min Bid Price - {rowValue['Min Bid Price']}</div>
              <div>Deadline - {rowValue['Time Remaining']}</div>
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
      ) : (
        <Link style={to == 'Creator' ? defaultStyle : { ...defaultStyle, color: 'black' }} to={redirect}>
          {children}
        </Link>
      )}
    </td>
  )
}
