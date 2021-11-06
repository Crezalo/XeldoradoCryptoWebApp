import { Trans } from '@lingui/macro'
import { AutoColumn } from 'components/Column'
import { CHAIN_INFO, SupportedChainId } from 'constants/chains'
import { useActiveWeb3React } from 'hooks/web3'
import styled from 'styled-components/macro'
import { TYPE } from 'theme'

import Texture from '../../assets/images/sandtexture.webp'
import { ExternalLink } from '../../theme'

import { ChevronsRight } from 'react-feather'
import { BaseButton } from '../../components/Button'
import React, { useState } from 'react'
import { linkRadial } from 'd3-shape'
import { Link } from 'react-router-dom'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
const CTASection = styled.section`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 8px;
  margin-top: 8px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    grid-template-columns: auto;
    grid-template-rows: auto;
  `};
`

const CTA1 = styled(Link)`
  background-color: ${({ theme }) => theme.bg2};
  background: radial-gradient(
      92.78% 103.09% at 50.06% 7.22%,
      rgba(255, 58, 212, 0.072) 0%,
      rgba(255, 255, 255, 0.042) 100%
    ),
    radial-gradient(100% 97.16% at 0% 12.22%, rgba(235, 0, 255, 0.2) 0%, rgba(243, 19, 19, 0.2) 100%);
  padding: 2rem;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  border: 1px solid transparent;
  cursor: auto;
  text-decoration: auto;

  :before {
    content: '';
    position: absolute;
    width: 800%;
    height: 480%;
    top: -390px;
    left: -310px;
    z-index: -1;
    opacity: 0.4;
    background: url(${Texture}) 0 0 repeat;
    transform: rotate(-4deg);
    cursor: auto;
    text-decoration: auto;
  }
`

const HeaderText = styled(TYPE.label)`
  align-items: center;
  display: flex;
  margin-bottom: 24px;
  font-weight: 400;
  font-size: 20px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    font-size: 20px;
  `};
`

const ResponsiveColumn = styled(AutoColumn)`
  grid-template-columns: 1fr;
  width: 100%;
  gap: 12px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    gap: 8px;
  `};
  justify-content: space-between;
`

export const ButtonOutlined = styled(BaseButton)`
  border: 1px solid ${({ theme }) => theme.bg2};
  background-color: transparent;
  color: ${({ theme }) => theme.text1};
  &:focus {
    box-shadow: 0 0 0 1px ${({ theme }) => theme.bg4};
  }
  &:hover {
    box-shadow: 0 0 0 1px ${({ theme }) => theme.bg4};
  }
  &:active {
    box-shadow: 0 0 0 1px ${({ theme }) => theme.bg4};
  }
  &:disabled {
    opacity: 50%;
    cursor: auto;
  }
`

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
export function ICTO() {
  return (
    <>
      <CTA1
        to={'/icto'}
        style={{
          background: 'whitesmoke',
        }}
      >
        <ResponsiveColumn>
          <HeaderText style={{ alignSelf: 'center' }}>
            <Trans>Buy Ongoing Creator Token Offering</Trans>
          </HeaderText>
          <TYPE.body fontWeight={300} style={{ alignSelf: 'center', justifyContent: 'center', display: 'flex' }}>
            <Trans>Bid best prices to buy in ICTOs</Trans>
          </TYPE.body>
        </ResponsiveColumn>
      </CTA1>
      <ProductTable
        caption={'Pools'}
        products={[
          {
            Creator: '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955',
            Token: 'Creator Token 1 (CT1)',
            'Min Bid Price': '0.1 WETH',
            'Liquidity %': '10%',
            'Last Bid Price': '0.2 WETH',
            'Bid Creator Token': 'Buy',
            'Time Remaining': '1 days',
          },
          {
            Creator: '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955',
            Token: 'Creator Token 1 (CT1)',
            'Min Bid Price': '0.1 WETH',
            'Liquidity %': '10 %',
            'Last Bid Price': '0.2 WETH',
            'Bid Creator Token': 'Buy',
            'Time Remaining': '1 days',
          },
          {
            Creator: '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955',
            Token: 'Creator Token 1 (CT1)',
            'Min Bid Price': '0.1 WETH',
            'Liquidity %': '10 %',
            'Last Bid Price': '0.2 WETH',
            'Bid Creator Token': 'Buy',
            'Time Remaining': '1 days',
          },
          {
            Creator: '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955',
            Token: 'Creator Token 1 (CT1)',
            'Min Bid Price': '0.1 WETH',
            'Liquidity %': '10 %',
            'Last Bid Price': '0.2 WETH',
            'Bid Creator Token': 'Buy',
            'Time Remaining': '1 days',
          },
        ]}
      />
    </>
  )
}
