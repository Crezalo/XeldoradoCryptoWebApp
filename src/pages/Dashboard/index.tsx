import './dashboard.css'
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Container, Row, Col } from 'reactstrap'
import { Info } from 'react-feather'
import { Link, RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components/macro'
import 'bootstrap/dist/css/bootstrap.min.css'
import asvg from '../../assets/images/big_unicorn.png'

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
const CardComponent = (name: string) => {
  return (
    <CardLink to={'/nft/' + name}>
      <CardImg top width="100%" src={asvg} alt="Card image cap" />
      <CardBody>
        <CardTitle tag="h5">{name}</CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">
          Price
        </CardSubtitle>
        {/* <CardText>
          Some quick example text to build on the card title and make up the bulk of the cards content.
        </CardText> */}
        {/* <Button>Button</Button> */}
      </CardBody>
    </CardLink>
  )
}

export default function Dashboard() {
  const numberOfCards = 11
  const name = 'Xeldrorado-Nft'
  return (
    // <div className="App">
    <Container>
      <Row xs={4}>
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
    // </div>
  )
}
