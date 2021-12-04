import { RouteComponentProps } from 'react-router-dom'
import './index.css'
import asvg from '../../assets/images/big_unicorn.png'
import { TokenDetails } from './tokendetails'
import { Tabs } from './tabs'

const linkStyle = {
  color: 'black',
  '&:hover': {
    color: 'blue',
    cursor: 'pointer',
  },
}
export function CreatorProfile(
  this: any,
  {
    match: {
      params: { creatorId: creatorIdFromUrl },
    },
  }: RouteComponentProps<{ creatorId?: string }>
) {
  console.log(creatorIdFromUrl)

  const isCreator = true
  const isVaultGenerated = true

  const displyCreatorAddr = creatorIdFromUrl
    ? creatorIdFromUrl.substring(0, 4) +
      '...' +
      creatorIdFromUrl.substring(creatorIdFromUrl.length - 4, creatorIdFromUrl.length)
    : undefined

  function handleCreatorAddressClick(creatorIdFromUrl: string | undefined): void {
    const addr = 'https://polygonscan.com/address/' + creatorIdFromUrl
    window.open(addr)
  }

  return (
    <>
      <div className="image">
        <img src={asvg} width="200" height="200" style={{ borderRadius: '200px', float: 'right' }}></img>
      </div>

      <div className="description">
        <div style={linkStyle} onClick={() => handleCreatorAddressClick(creatorIdFromUrl)}>
          {displyCreatorAddr}
        </div>
        <div>Creator Token</div>
        <div>100 WETH</div>
      </div>

      <div className="tokenDetails">{<TokenDetails isCreator={isCreator} isVaultGenerated={isVaultGenerated} />}</div>

      <Tabs creatorIdFromUrl={creatorIdFromUrl ?? ''} isCreator={isCreator} isVaultGenerated={isVaultGenerated} />
    </>
  )
}
