import { RouteComponentProps } from 'react-router-dom'
import './index.css'
import asvg from '../../assets/images/abc.png'
import { Table } from './table'
import { NftDetails } from './nftdetails'

export function NFT({
  match: {
    params: { nftContractAddr: nftContractAddrUrl, tokenId: tokenIdUrl, creatorAddr: creatorAddrUrl },
  },
}: RouteComponentProps<{ nftContractAddr?: string; tokenId?: string; creatorAddr?: string }>) {
  // console.log()
  const isOwner = false
  const hasOwner = false
  return (
    <div>
      {/* <ButtonPrimary>{nftContractAddrUrl}</ButtonPrimary>
      <ButtonLight>{tokenIdUrl}</ButtonLight>
      <ButtonOutlined>{creatorAddrUrl}</ButtonOutlined> */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '50px',
          marginTop: '0px',
        }}
      >
        <div className="chart">
          <img className="cover" src={asvg}></img>
        </div>

        <NftDetails
          nftContractAddrUrl={nftContractAddrUrl ?? ''}
          tokenIdUrl={tokenIdUrl ?? ''}
          creatorAddrUrl={creatorAddrUrl ?? ''}
          isOwner={isOwner}
          hasOwner={hasOwner}
        />
      </div>
      <Table
        nftURL={[nftContractAddrUrl, tokenIdUrl, creatorAddrUrl]}
        caption={'Pools'}
        products={[
          {
            Owner: '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955',
            Price: '200 CT1',
            From: '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955',
            TransactionId: '0xa5d36fd4391758c50997085a22cd8cb7122754bf27200d09943fced034f8e729',
          },
          {
            Owner: '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955',
            Price: '200 CT1',
            From: '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955',
            TransactionId: '0xc60c695e08609b0e704fbdfe877930203750a4a5ba2b572d7d4383e962b81f69',
          },
          {
            Owner: '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955',
            Price: '200 CT1',
            From: '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955',
            TransactionId: '0xc60c695e08609b0e704fbdfe877930203750a4a5ba2b572d7d4383e962b81f69',
          },
          {
            Owner: '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955',
            Price: '200 CT1',
            From: '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955',
            TransactionId: '0xc60c695e08609b0e704fbdfe877930203750a4a5ba2b572d7d4383e962b81f69',
          },
          {
            Owner: '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955',
            Price: '200 CT1',
            From: '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955',
            TransactionId: '0xc60c695e08609b0e704fbdfe877930203750a4a5ba2b572d7d4383e962b81f69',
          },
          {
            Owner: '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955',
            Price: '200 CT1',
            From: '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955',
            TransactionId: '0xc60c695e08609b0e704fbdfe877930203750a4a5ba2b572d7d4383e962b81f69',
          },
        ]}
      />
    </div>
  )
}
