import { CTA1, HeaderText } from 'pages/ICTO'
import React from 'react'
import { Link } from 'react-router-dom'
import { TYPE } from 'theme'
import './index.css'

export const Table = (props: { products: any; caption: string }) => {
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

  type tdprops = {
    to: any
    children: any
  }
  const Td = ({ to, children }: tdprops) => {
    const defaultStyle = {
      textDecoration: 'auto',
      color: 'black',
      justifyContent: 'center',
      display: 'flex',
    }

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
    return (
      <td>
        <TYPE.darkGray>
          <Link style={defaultStyle} to={to}>
            {children}
          </Link>
        </TYPE.darkGray>
      </td>
    )
  }

  const { items, requestSort, sortConfig } = useSortableData(props.products)
  const getClassNamesFor = (name: string) => {
    if (!sortConfig) {
      return
    }
    return sortConfig.key === name ? sortConfig.direction : undefined
  }

  const rowHeader: any[] = Object.keys(items[0])
  const rowValue: any[] = Object.values(items)
  const addr = '0xdc9232e2df177d7a12fdff6ecbab114e2231198d'
  console.log(rowHeader)
  console.log(rowValue)
  Object.entries(rowValue[0]).map(([key, value]) => console.log('key: ' + key + ' value: ' + value))
  return (
    <table
      style={{
        maxWidth: 'max-content',
        // border: '2px solid black',
      }}
    >
      {/* <caption>{props.caption}</caption> */}
      <thead>
        <tr>
          {rowHeader.map((rowHeader: string) => (
            <th key={rowHeader}>
              {' '}
              <HeaderText
                style={{
                  justifyContent: 'center',
                  display: 'flex',

                  paddingLeft: '30px',
                  paddingRight: '30px',
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
                </button>{' '}
              </HeaderText>{' '}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* {items.map((item) => ( */}
        {rowValue.map((rowHeader: any) => (
          <tr key={rowHeader}>
            {Object.entries(rowHeader).map(([key, value]) => (
              <Td key={key} to={'/pair/' + addr}>
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

export default function Analytics() {
  return (
    <div className="App">
      <CTA1
        to={'/analytics'}
        style={{
          background: 'whitesmoke',
        }}
      >
        <Table
          caption={'Products'}
          products={[
            {
              Pair: 'CT1/WETH',
              'Volume 24H': 500000,
              '24H%': '+4.9',
              '7D%': '-20',
              Owners: 5100,
              'Total Supply': 1111888,
            },
            {
              Pair: 'CT1/WETH',
              'Volume 24H': 500000,
              '24H%': '+4.9',
              '7D%': '-20',
              Owners: 5100,
              'Total Supply': 1111888,
            },
            {
              Pair: 'CT1/WETH',
              'Volume 24H': 500000,
              '24H%': '+4.9',
              '7D%': '-20',
              Owners: 5100,
              'Total Supply': 1111888,
            },
            {
              Pair: 'CT1/WETH',
              'Volume 24H': 500000,
              '24H%': '+4.9',
              '7D%': '-20',
              Owners: 5100,
              'Total Supply': 1111888,
            },
            {
              Pair: 'CT1/WETH',
              'Volume 24H': 500000,
              '24H%': '+4.9',
              '7D%': '-20',
              Owners: 5100,
              'Total Supply': 1111888,
            },
            {
              Pair: 'CT1/WETH',
              'Volume 24H': 500000,
              '24H%': '+4.9',
              '7D%': '-20',
              Owners: 5100,
              'Total Supply': 1111888,
            },
            {
              Pair: 'CT1/WETH',
              'Volume 24H': 500000,
              '24H%': '+4.9',
              '7D%': '-20',
              Owners: 5100,
              'Total Supply': 1111888,
            },
            {
              Pair: 'CT1/WETH',
              'Volume 24H': 500000,
              '24H%': '+4.9',
              '7D%': '-20',
              Owners: 5100,
              'Total Supply': 1111888,
            },
            {
              Pair: 'CT1/WETH',
              'Volume 24H': 500000,
              '24H%': '+4.9',
              '7D%': '-20',
              Owners: 5100,
              'Total Supply': 1111888,
            },
            {
              Pair: 'CT1/WETH',
              'Volume 24H': 500000,
              '24H%': '+4.9',
              '7D%': '-20',
              Owners: 5100,
              'Total Supply': 1111888,
            },
          ]}
        />
      </CTA1>
    </div>
  )
}
