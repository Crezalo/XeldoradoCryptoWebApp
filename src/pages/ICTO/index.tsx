import { Trans } from '@lingui/macro'
import { AutoColumn } from 'components/Column'
import styled from 'styled-components/macro'
import { TYPE } from 'theme'
import Texture from '../../assets/images/sandtexture.webp'
import { BaseButton } from '../../components/Button'
import { Link } from 'react-router-dom'
import { Table } from './table'

export const CTASection = styled.section`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 8px;
  margin-top: 8px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    grid-template-columns: auto;
    grid-template-rows: auto;
  `};
`

export const CTA1 = styled(Link)`
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

export const HeaderText = styled(TYPE.label)`
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
            <Trans>Buy Tokens of New Creator</Trans>
          </HeaderText>
          <TYPE.body fontWeight={300} style={{ alignSelf: 'center', justifyContent: 'center', display: 'flex' }}>
            <Trans>Bid best prices to buy in ICTOs</Trans>
          </TYPE.body>
        </ResponsiveColumn>
      </CTA1>
      <div style={{ marginTop: '10px' }}></div>
      <CTA1
        to={'/icto'}
        style={{
          background: 'whitesmoke',
        }}
      >
        {/* <ResponsiveColumn> */}
        <Table
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
        {/* </ResponsiveColumn> */}
      </CTA1>
    </>
  )
}
