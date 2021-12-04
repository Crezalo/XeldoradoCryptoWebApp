import './index.css'
import styled from 'styled-components/macro'
import { ButtonPrimary } from 'components/Button'
import { TYPE } from 'theme'

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

type NftDetailsProps = {
  nftContractAddrUrl: string
  tokenIdUrl: string
  creatorAddrUrl: string
  isOwner: boolean
  hasOwner: boolean
}

export const NftDetails = ({ nftContractAddrUrl, tokenIdUrl, creatorAddrUrl, isOwner, hasOwner }: NftDetailsProps) => {
  const addr = '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955'
  const ownerAddress = !isOwner ? addr : 'You'
  return (
    <div className="details">
      {/* <div className="green"> */}
      <div
        style={
          {
            // fontSize: 'larger',
          }
        }
      >
        <HeaderText>Collection Name</HeaderText>
      </div>
      <div>
        <HeaderText className="triad" style={{ justifyContent: 'left' }}>
          Flying Horse
        </HeaderText>
        <HeaderText className="block">|</HeaderText>
        <HeaderText className="triad">#{tokenIdUrl}</HeaderText>
        <HeaderText className="block">|</HeaderText>
        <HeaderText className="triad">200 CT1</HeaderText>
      </div>
      <div style={{ paddingRight: '50px' }}>
        Drop 2 of Semiosis is 10 animated pieces, created to reflect the movement all around us. Signs, symbols and
        signals are everywhere around us in the built environment. They show us the way, warn us, excite us. But on
        their own they have no meaning. We all learn a shared visual language, devoid of words, to help us navigate the
        world. Semiosis is my first generative collection, featuring 25 unique symbols and 8 different colours.
      </div>
      {/* <div>Created By - 0x14dC79964da2C08b23698B3D3cc7Ca32193d9955</div>
          <div>Contract Address - {nftContractAddrUrl}</div>
          <div>Owned By - {ownerAddress}</div> */}
      <TYPE.subHeader color="text3" style={{ width: '20%', float: 'left' }}>
        Created By:
      </TYPE.subHeader>
      <div style={{ width: '80%', float: 'left' }}>0x14dC79964da2C08b23698B3D3cc7Ca32193d9955</div>
      <TYPE.subHeader color="text3" style={{ width: '20%', float: 'left' }}>
        Contract Address:
      </TYPE.subHeader>
      <div style={{ width: '80%', float: 'left' }}>{nftContractAddrUrl}</div>{' '}
      <TYPE.subHeader color="text3" style={{ width: '20%', float: 'left' }}>
        Owned By:
      </TYPE.subHeader>
      <div style={{ width: '80%', float: 'left' }}>{ownerAddress}</div>
      <TYPE.subHeader color="text3" style={{ width: '20%', float: 'left' }}>
        Blockchain:
      </TYPE.subHeader>
      <div style={{ width: '80%', float: 'left' }}>Polygon</div>
      {/* <div style={{ float: 'left' }}>|</div> */}
      <TYPE.subHeader color="text3" style={{ width: '20%', float: 'left' }}>
        Token Standard:
      </TYPE.subHeader>
      <div style={{ width: '80%', float: 'left' }}>ERC-721</div>
      {/* <div>Token Standard - ERC-721</div> */}
      <div>
        {isOwner && hasOwner && <ButtonPrimary>Return NFT</ButtonPrimary>}
        {!(isOwner || hasOwner) && <ButtonPrimary>Redeem NFT</ButtonPrimary>}
      </div>
    </div>
  )
}
