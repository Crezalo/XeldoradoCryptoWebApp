// import { Trans } from '@lingui/macro'
// import { AutoColumn } from 'components/Column'
// import { CHAIN_INFO, SupportedChainId } from 'constants/chains'
// import { useActiveWeb3React } from 'hooks/web3'
// import styled from 'styled-components/macro'
// import { TYPE } from 'theme'

// import Texture from '../../assets/images/sandtexture.webp'
// import { ExternalLink } from '../../theme'

// const CTASection = styled.section`
//   display: grid;
//   grid-template-columns: 2fr 1fr;
//   gap: 8px;
//   margin-top: 8px;

//   ${({ theme }) => theme.mediaWidth.upToSmall`
//     grid-template-columns: auto;
//     grid-template-rows: auto;
//   `};
// `

// const CTA1 = styled(ExternalLink)`
//   background-color: ${({ theme }) => theme.bg2};
//   background: radial-gradient(
//       92.78% 103.09% at 50.06% 7.22%,
//       rgba(255, 58, 212, 0.072) 0%,
//       rgba(255, 255, 255, 0.042) 100%
//     ),
//     radial-gradient(100% 97.16% at 0% 12.22%, rgba(235, 0, 255, 0.2) 0%, rgba(243, 19, 19, 0.2) 100%);
//   padding: 2rem;
//   border-radius: 20px;
//   display: flex;
//   flex-direction: column;
//   position: relative;
//   justify-content: space-between;
//   align-items: center;
//   overflow: hidden;
//   border: 1px solid transparent;

//   * {
//     color: ${({ theme }) => theme.text1};
//     text-decoration: none !important;
//   }

//   :hover {
//     border: 1px solid ${({ theme }) => theme.bg0};
//     text-decoration: none;
//     * {
//       text-decoration: none !important;
//     }
//   }

//   :before {
//     content: '';
//     position: absolute;
//     width: 800%;
//     height: 480%;
//     top: -390px;
//     left: -310px;
//     z-index: -1;
//     opacity: 0.4;
//     background: url(${Texture}) 0 0 repeat;
//     transform: rotate(-4deg);
//   }
// `

// const HeaderText = styled(TYPE.label)`
//   align-items: center;
//   display: flex;
//   margin-bottom: 24px;
//   font-weight: 400;
//   font-size: 20px;
//   ${({ theme }) => theme.mediaWidth.upToMedium`
//     font-size: 20px;
//   `};
// `

// const ResponsiveColumn = styled(AutoColumn)`
//   grid-template-columns: 1fr;
//   width: 100%;
//   gap: 12px;
//   ${({ theme }) => theme.mediaWidth.upToMedium`
//     gap: 8px;
//   `};
//   justify-content: space-between;
// `

// export default function CTACards() {
//   const { chainId } = useActiveWeb3React()
//   const { infoLink } = CHAIN_INFO[chainId ? chainId : SupportedChainId.MAINNET]
//   return (
//     <>
//       <CTASection>
//         <CTA1>
//           <ResponsiveColumn>
//             <HeaderText>
//               <Trans>Become a Creator</Trans>
//             </HeaderText>
//             <TYPE.body fontWeight={300} style={{ alignItems: 'center', display: 'flex', maxWidth: '80%' }}>
//               <Trans>Launch your Creator Token</Trans>
//             </TYPE.body>
//           </ResponsiveColumn>
//         </CTA1>
//       </CTASection>
//     </>
//   )
// }
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

const CTA1 = styled(ExternalLink)`
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

  * {
    color: ${({ theme }) => theme.text1};
    text-decoration: none !important;
  }

  :hover {
    border: 1px solid ${({ theme }) => theme.bg0};
    text-decoration: none;
    * {
      text-decoration: none !important;
    }
  }

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
  }
`

const CTA2 = styled(ExternalLink)`
  position: relative;
  overflow: hidden;
  padding: 32px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid transparent;

  * {
    color: ${({ theme }) => theme.text1};
    text-decoration: none !important;
  }

  // :hover {
  //   border: 1px solid ${({ theme }) => theme.bg0};
  //   text-decoration: none !important;
  //   * {
  //     text-decoration: none !important;
  //   }
  // }

  :before {
    content: '';
    position: absolute;
    width: 340%;
    height: 280%;
    top: -170%;
    left: -134%;
    opacity: 0.4;
    z-index: -1;
    background: url(${Texture}) 0 0 repeat;
    transform: rotate(-4deg);
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

export default function ICTO() {
  const { chainId } = useActiveWeb3React()
  const { infoLink } = CHAIN_INFO[chainId ? chainId : SupportedChainId.MAINNET]
  return (
    <CTASection>
      <CTA1 href={''}>
        <ResponsiveColumn>
          {/* <HeaderText>
            <Trans>Become a Creator</Trans>
          </HeaderText>
          <TYPE.body fontWeight={300} style={{ alignItems: 'center', display: 'flex', maxWidth: '80%' }}>
            <Trans>Launch you Creator Token</Trans>
          </TYPE.body> */}
          <HeaderText style={{ alignSelf: 'flex-start' }}>
            <Trans>Become a Creator</Trans>
          </HeaderText>
          <TYPE.body fontWeight={300} style={{ alignSelf: 'flex-start' }}>
            <Trans>Launch your own Creator Token</Trans>
          </TYPE.body>
        </ResponsiveColumn>
      </CTA1>
      <CTA2 href={''}>
        <ButtonOutlined
          // to="/migrate/v2"
          // id="import-pool-link"
          style={{
            padding: '8px 16px',
            margin: '0 4px',
            borderRadius: '12px',
            width: 'fit-content',
            fontSize: '14px',
          }}
        >
          {/* <ChevronsRight size={16} style={{ marginRight: '8px' }} /> */}
          {/* <TYPE.body fontWeight={300} style={{ alignItems: 'center', display: 'flex', maxWidth: '80%' }}> */}
          <Trans>Launch Token</Trans> {/* </TYPE.body> */}
        </ButtonOutlined>
      </CTA2>
    </CTASection>
  )
}
