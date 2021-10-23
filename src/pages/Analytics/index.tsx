import Row from 'components/Row'
import React, { useState } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components/macro'
import './index.css'
// import Token from '../Token/token'

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

export const ProductTable = (props: { products: any; caption: string }) => {
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
              <Td key={key} to={'/token/' + value}>
                {value}
              </Td>
              /* <Td to={'/token/' + item.name}>{item.name}</Td>
            <Td to={'/token/' + item.name}>${item.price}</Td>
            <Td to={'/token/' + item.name}>{item.stock}</Td> */
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
}
export function Td({ to, children }: tdprops) {
  // Conditionally wrapping content into a link
  // const ContentTag = to ? Link : 'div';

  return (
    <td>
      <Link to={to}>{children}</Link>
    </td>
  )
}

export default function Analytics() {
  return (
    <div className="App">
      <ProductTable
        caption={'Products'}
        products={[
          { id: 1, name: 'Cheese', price: 4.9, stock: 20 },
          { id: 2, name: 'Milk', price: 1.9, stock: 32 },
          { id: 3, name: 'Yoghurt', price: 2.4, stock: 12 },
          { id: 4, name: 'Heavy Cream', price: 3.9, stock: 9 },
          { id: 5, name: 'Butter', price: 0.9, stock: 99 },
          { id: 6, name: 'Sour Cream ', price: 2.9, stock: 86 },
          { id: 7, name: 'Fancy French Cheese 🇫🇷', price: 99, stock: 12 },
        ]}
      />
    </div>
  )
}
