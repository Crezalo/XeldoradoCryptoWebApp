import { CTA1 } from 'pages/ICTO'
import { RouteComponentProps } from 'react-router-dom'
import './index.css'
// import { PairChart } from './pairchart'
import { Table } from './table'

export function Pair({
  match: {
    params: { pairId: nftIdFromUrl },
  },
}: RouteComponentProps<{ pairId?: string }>) {
  console.log(nftIdFromUrl)

  return (
    <>
      {/* <button>{nftIdFromUrl}</button>
      <> */}
      <div style={{ width: '30%', float: 'left' }}>
        <div>Volume 24H</div>
        <div>24H%</div>
        <div>7D%</div>
        <div>Owner</div>
      </div>

      <div style={{ width: '70%', float: 'left' }}>{/* <PairChart /> */}</div>
      {/* </> */}
      <CTA1
        to={'/pair' + nftIdFromUrl}
        style={{
          background: 'whitesmoke',
        }}
      >
        <Table
          caption={'Pools'}
          products={[
            {
              'Total Value': '$500',
              'In Token': '5 CT1',
              'Out Token': '100 USDC',
              Account: '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955',
              TransactionId: '0xa5d36fd4391758c50997085a22cd8cb7122754bf27200d09943fced034f8e729',
            },
            {
              'Total Value': '$500',
              'In Token': '5 CT1',
              'Out Token': '100 USDC',
              Account: '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955',
              TransactionId: '0xa5d36fd4391758c50997085a22cd8cb7122754bf27200d09943fced034f8e729',
            },
            {
              'Total Value': '$500',
              'In Token': '5 CT1',
              'Out Token': '100 USDC',
              Account: '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955',
              TransactionId: '0xa5d36fd4391758c50997085a22cd8cb7122754bf27200d09943fced034f8e729',
            },
            {
              'Total Value': '$500',
              'In Token': '5 CT1',
              'Out Token': '100 USDC',
              Account: '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955',
              TransactionId: '0xa5d36fd4391758c50997085a22cd8cb7122754bf27200d09943fced034f8e729',
            },
            {
              'Total Value': '$500',
              'In Token': '5 CT1',
              'Out Token': '100 USDC',
              Account: '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955',
              TransactionId: '0xa5d36fd4391758c50997085a22cd8cb7122754bf27200d09943fced034f8e729',
            },
            {
              'Total Value': '$500',
              'In Token': '5 CT1',
              'Out Token': '100 USDC',
              Account: '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955',
              TransactionId: '0xa5d36fd4391758c50997085a22cd8cb7122754bf27200d09943fced034f8e729',
            },
            {
              'Total Value': '$500',
              'In Token': '5 CT1',
              'Out Token': '100 USDC',
              Account: '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955',
              TransactionId: '0xa5d36fd4391758c50997085a22cd8cb7122754bf27200d09943fced034f8e729',
            },
          ]}
          nftURL={nftIdFromUrl}
        />
      </CTA1>
    </>
  )
}
