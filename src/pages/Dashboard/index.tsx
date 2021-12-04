import './dashboard.css'
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Container, Row, Col } from 'reactstrap'
import { Info } from 'react-feather'
import { Link, RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components/macro'
import 'bootstrap/dist/css/bootstrap.min.css'
import asvg from '../../assets/images/abc.png'

const StyledInfo = styled(Info)`
  height: 16px;
  width: 16px;
  margin-left: 4px;
  color: ${({ theme }) => theme.text3};
  :hover {
    color: ${({ theme }) => theme.text1};
  }
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
            {name}
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
    <Container>
      <Row xs={3}>
        {[...Array(numberOfCards)].map((e, i) => {
          return (
            <Col key={e + i} className="col">
              {' '}
              {CardComponent(name)}
            </Col>
          )
        })}
      </Row>
    </Container>
  )
}
