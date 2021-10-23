import { RouteComponentProps } from 'react-router-dom'
import './index.css'
import asvg from '../../assets/images/big_unicorn.png'
import { SetStateAction, useState } from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap'
import classnames from 'classnames'
import Dashboard from 'pages/Dashboard'

export function CreatorProfile({
  match: {
    params: { creatorId: creatorIdFromUrl },
  },
}: RouteComponentProps<{ creatorId?: string }>) {
  console.log(creatorIdFromUrl)
  const [activeTab, setActiveTab] = useState('1')

  const toggle = (tab: SetStateAction<string>) => {
    if (activeTab !== tab) setActiveTab(tab)
  }
  const Tabs = () => {
    return (
      <>
        <Nav tabs style={{ width: '100%', justifyContent: 'center' }}>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '1' })}
              onClick={() => {
                toggle('1')
              }}
            >
              All NFTs
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '2' })}
              onClick={() => {
                toggle('2')
              }}
            >
              Redemmed NFTs
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '3' })}
              onClick={() => {
                toggle('3')
              }}
            >
              Tokens
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">{Dashboard()}</TabPane>
          <TabPane tabId="2">{Dashboard()}</TabPane>
          <TabPane tabId="3">{Dashboard()}</TabPane>
        </TabContent>
      </>
    )
  }
  return (
    <div>
      <button>{creatorIdFromUrl}</button>

      <div>
        <div className="image">
          <img src={asvg} width="500" height="500"></img>
        </div>

        <div className="description">
          <div>Username</div>
          <div>Address</div>
          <div>Detail</div>
        </div>

        <div className="tokenDetails">
          <div>Creator Token</div>
          <div>Price/Base Token</div>
        </div>
      </div>
      <Tabs />
    </div>
  )
}
