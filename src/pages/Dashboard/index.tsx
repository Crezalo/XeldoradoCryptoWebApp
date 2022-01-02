import './dashboard.css'
import { CardImg, CardBody, CardTitle, CardSubtitle, Container, Row, Col } from 'reactstrap'
import { Info } from 'react-feather'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import 'bootstrap/dist/css/bootstrap.min.css'
import asvg from '../../assets/images/abc.png'
import { TYPE } from 'theme'
import { Trans } from '@lingui/macro'
import { AutoColumn } from 'components/Column'
import Texture from '../../assets/images/sandtexture.webp'
import { ButtonOutlined } from 'components/Button'

const StyledInfo = styled(Info)`
  height: 16px;
  width: 16px;
  margin-left: 4px;
  color: ${({ theme }) => theme.text3};
  :hover {
    color: ${({ theme }) => theme.text1};
  }
`

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

  // :before {
  //   content: '';
  //   position: absolute;
  //   width: 800%;
  //   height: 480%;
  //   top: -390px;
  //   left: -310px;
  //   z-index: -1;
  //   opacity: 0.4;
  //   background: url(${Texture}) 0 0 repeat;
  //   transform: rotate(-4deg);
  //   cursor: auto;
  //   text-decoration: auto;
  // }
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

type tdprops = {
  to: any
  children: any
}
export function CardLink({ to, children }: tdprops) {
  return (
    <td>
      <Link to={to}>{children}</Link>
    </td>
  )
}
const defaultStyle = {
  textDecoration: 'none',
  color: 'black',
  justifyContent: 'center',
  display: 'flex',
  fontFamily: 'sans-serif',
}

const CardComponent = (name: string) => {
  const tempLink = '/nft/0xA5F1Ea7DF861952863dF2e8d1312f7305dabf215/1111/0x9b814233894cd227f561b78cc65891aa55c62ad2'
  return (
    <div className="card">
      <CardLink to={tempLink}>
        <CardImg top width="100%" src={asvg} alt="Card image cap" />
        <CardBody>
          <CardTitle style={defaultStyle} tag="h5">
            <TYPE.black>
              <Trans>{name}</Trans>
            </TYPE.black>
          </CardTitle>
          <CardSubtitle style={defaultStyle} tag="h6" className="mb-2 text-muted">
            Price
          </CardSubtitle>
          {/* <CardText>
          Some quick example text to build on the card title and make up the bulk of the cards content.
        </CardText> */}
          {/* <Button>Button</Button> */}
        </CardBody>
      </CardLink>
    </div>
  )
}

export default function Dashboard() {
  const numberOfCards = 11
  const name = 'Xeldrorado-Nft'
  return (
    <>
      <CTA1
        to={'/dashboard'}
        style={{
          background: 'whitesmoke',
        }}
      >
        <ResponsiveColumn>
          <HeaderText style={{ alignSelf: 'center' }}>
            <Trans> Start your Community</Trans>
            <ButtonOutlined style={{ width: 'auto', marginLeft: '40px' }}>Become a Creator</ButtonOutlined>
          </HeaderText>
        </ResponsiveColumn>
      </CTA1>
      <div style={{ marginTop: '10px' }}></div>
      <Container>
        <Row xs={3}>
          {[...Array(numberOfCards)].map((e, i) => {
            return (
              <Col key={e + i} className="col">
                {CardComponent(name)}
              </Col>
            )
          })}
        </Row>
      </Container>
    </>
  )
}
