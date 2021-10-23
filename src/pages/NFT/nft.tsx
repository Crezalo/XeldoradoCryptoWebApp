import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import './index.css'
import { ProductTable } from 'pages/Analytics'
import ReactDOM from 'react-dom'
import { format } from 'd3-format'
import { timeFormat } from 'd3-time-format'

import asvg from '../../assets/images/big_unicorn.png'

export function NFT({
  match: {
    params: { nftId: nftIdFromUrl },
  },
}: RouteComponentProps<{ nftId?: string }>) {
  console.log(nftIdFromUrl)

  return (
    <div>
      <button>{nftIdFromUrl}</button>

      <div>
        <div className="details">
          {/* <div className="green"> */}
          <div>Name</div>
          <div>Creator</div>
          <div>Price</div>
          <div>Owner</div>
          {/* </div>   */}
          <ProductTable
            caption={'Pools'}
            products={[
              { id: 1, name: 'Cheese', price: 1.9, stock: 20 },
              { id: 2, name: 'Milk', price: 1.9, stock: 32 },
              { id: 3, name: 'Yoghurt', price: 2.4, stock: 12 },
              { id: 4, name: 'Heavy Cream', price: 3.9, stock: 9 },
            ]}
          />
        </div>

        <div className="chart">
          {/* <div className="blue"> */}
          <img src={asvg} width="500" height="500"></img>
          <div>Description</div>
          <div>Properties</div>
          <div>Detail</div>
          {/* </div> */}
        </div>
      </div>
    </div>
  )
}
