import React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import './index.css'
// import { ProductTable } from 'pages/Analytics'
import ReactDOM from 'react-dom'
import { format } from 'd3-format'
import { timeFormat } from 'd3-time-format'
import {
  elderRay,
  ema,
  discontinuousTimeScaleProviderBuilder,
  Chart,
  ChartCanvas,
  CurrentCoordinate,
  BarSeries,
  CandlestickSeries,
  ElderRaySeries,
  LineSeries,
  MovingAverageTooltip,
  OHLCTooltip,
  SingleValueTooltip,
  lastVisibleItemBasedZoomAnchor,
  XAxis,
  YAxis,
  CrossHairCursor,
  EdgeIndicator,
  MouseCoordinateX,
  MouseCoordinateY,
  ZoomButtons,
  withDeviceRatio,
  withSize,
} from 'react-financial-charts'
import { initialData } from './data'
import './index.css'

const useSortableData = (items: any, _config = null) => {
  const [sortConfig, setSortConfig] = React.useState<any | null>(null)

  const sortedItems = React.useMemo(() => {
    const sortableItems = [...items]
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1
        }
        return 0
      })
    }
    return sortableItems
  }, [items, sortConfig])

  const requestSort = (key: any) => {
    let direction = 'ascending'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  return { items: sortedItems, requestSort, sortConfig }
}

export const ProductTable = (props: { products: any; caption: string; nftURL: string | undefined }) => {
  const { items, requestSort, sortConfig } = useSortableData(props.products)
  const getClassNamesFor = (name: string) => {
    if (!sortConfig) {
      return
    }
    return sortConfig.key === name ? sortConfig.direction : undefined
  }

  const rowHeader: any[] = Object.keys(items[0])
  const rowValue: any[] = Object.values(items)

  return (
    <table>
      {/* <caption>{props.caption}</caption> */}
      <thead>
        <tr>
          {rowHeader.map((rowHeader: string) => (
            <th key={rowHeader}>
              <button type="button" onClick={() => requestSort(rowHeader)} className={getClassNamesFor(rowHeader)}>
                {rowHeader}
              </button>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* {items.map((item) => ( */}
        {rowValue.map((rowHeader: any) => (
          <tr key={rowHeader}>
            {Object.entries(rowHeader).map(([key, value]) => (
              <Td key={key} to={key} nftURL={props.nftURL}>
                {value}
              </Td>
            ))}{' '}
          </tr>
        ))}
        {/* ))} */}
      </tbody>
    </table>
  )
}
type tdprops = {
  to: any
  children: any
  nftURL: string | undefined
}
export function Td({ to, children, nftURL }: tdprops) {
  // Conditionally wrapping content into a link
  // const ContentTag = to ? Link : 'div';
  const defaultStyle = {
    textDecoration: 'auto',
    color: 'blue',
  }
  const childrenCopy = children
  if (typeof children === 'string') {
    if (children.substring(0, 2) == '0x') {
      children = children.substring(0, 4) + '...' + children.substring(children.length - 4, children.length)
    }
    if (children.substring(0, 1) == '+') {
      defaultStyle.color = 'green'
      children += '%'
    }
    if (children.substring(0, 1) == '-') {
      defaultStyle.color = 'red'
      children += '%'
    }
  }
  const redirect = '/pair/0xdc9232e2df177d7a12fdff6ecbab114e2231198d'
  // if (nftURL) {
  //   redirect += nftURL
  // }
  let link = '/pair/' + children
  if (to == 'Account') {
    link = 'https://polygonscan.com/address/' + childrenCopy
  }
  if (to == 'TransactionId') {
    link = 'https://polygonscan.com/tx/' + childrenCopy
  }

  if (to == 'Total Value' || to == 'In Token' || to == 'Out Token') {
    return <td>{children}</td>
  }

  return (
    <td onClick={() => handleOnClick(link, to)}>
      <Link style={defaultStyle} to={redirect}>
        {children}
      </Link>
    </td>
  )
}
function handleOnClick(link: string, to: string) {
  if (to != 'Total Value' && to != 'In Token' && to != 'Out Token') {
    window.open(link)
  }
}

export function Token({
  match: {
    params: { tokenId: nftIdFromUrl },
  },
}: RouteComponentProps<{ tokenId?: string }>) {
  console.log(nftIdFromUrl)

  const App = () => {
    const ScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor((d) => new Date(d.date))
    const height = 700
    const width = 900
    const margin = { left: 0, right: 48, top: 0, bottom: 24 }

    const ema12 = ema()
      .id(1)
      .options({ windowSize: 12 })
      .merge((d: { ema12: any }, c: any) => {
        d.ema12 = c
      })
      .accessor((d: { ema12: any }) => d.ema12)

    const ema26 = ema()
      .id(2)
      .options({ windowSize: 26 })
      .merge((d: { ema26: any }, c: any) => {
        d.ema26 = c
      })
      .accessor((d: { ema26: any }) => d.ema26)

    const elder = elderRay()

    const calculatedData = elder(ema26(ema12(initialData)))
    const { data, xScale, xAccessor, displayXAccessor } = ScaleProvider(initialData)
    const pricesDisplayFormat = format('.2f')
    const max = xAccessor(data[data.length - 1])
    const min = xAccessor(data[Math.max(0, data.length - 100)])
    const xExtents = [min, max + 5]

    const gridHeight = height - margin.top - margin.bottom

    const elderRayHeight = 100
    const elderRayOrigin = (_: any, h: number) => [0, h - elderRayHeight]
    const barChartHeight = gridHeight / 4
    const barChartOrigin = (_: any, h: number) => [0, h - barChartHeight - elderRayHeight]
    const chartHeight = gridHeight - elderRayHeight
    const yExtents = (data: { high: any; low: any }) => {
      return [data.high, data.low]
    }
    const dateTimeFormat = '%d %b'
    const timeDisplayFormat = timeFormat(dateTimeFormat)

    const barChartExtents = (data: { volume: any }) => {
      return data.volume
    }

    const candleChartExtents = (data: { high: any; low: any }) => {
      return [data.high, data.low]
    }

    const yEdgeIndicator = (data: { close: any }) => {
      return data.close
    }

    const volumeColor = (data: { close: number; open: number }) => {
      return data.close > data.open ? 'rgba(38, 166, 154, 0.3)' : 'rgba(239, 83, 80, 0.3)'
    }

    const volumeSeries = (data: { volume: any }) => {
      return data.volume
    }

    const openCloseColor = (data: { close: number; open: number }) => {
      return data.close > data.open ? '#26a69a' : '#ef5350'
    }

    return (
      <ChartCanvas
        height={height}
        ratio={3}
        width={width}
        margin={margin}
        data={data}
        displayXAccessor={displayXAccessor}
        seriesName="Data"
        xScale={xScale}
        xAccessor={xAccessor}
        xExtents={xExtents}
        zoomAnchor={lastVisibleItemBasedZoomAnchor}
      >
        <Chart id={2} height={barChartHeight} origin={barChartOrigin} yExtents={barChartExtents}>
          <BarSeries fillStyle={volumeColor} yAccessor={volumeSeries} />
        </Chart>
        <Chart id={3} height={chartHeight} yExtents={candleChartExtents}>
          <XAxis showGridLines showTickLabel={false} />
          <YAxis showGridLines tickFormat={pricesDisplayFormat} />
          <CandlestickSeries />
          <LineSeries yAccessor={ema26.accessor()} strokeStyle={ema26.stroke()} />
          <CurrentCoordinate yAccessor={ema26.accessor()} fillStyle={ema26.stroke()} />
          <LineSeries yAccessor={ema12.accessor()} strokeStyle={ema12.stroke()} />
          <CurrentCoordinate yAccessor={ema12.accessor()} fillStyle={ema12.stroke()} />
          <MouseCoordinateY rectWidth={margin.right} displayFormat={pricesDisplayFormat} />
          <EdgeIndicator
            itemType="last"
            rectWidth={margin.right}
            fill={openCloseColor}
            lineStroke={openCloseColor}
            displayFormat={pricesDisplayFormat}
            yAccessor={yEdgeIndicator}
          />
          <MovingAverageTooltip
            origin={[8, 24]}
            options={[
              {
                yAccessor: ema26.accessor(),
                type: 'EMA',
                stroke: ema26.stroke(),
                windowSize: ema26.options().windowSize,
              },
              {
                yAccessor: ema12.accessor(),
                type: 'EMA',
                stroke: ema12.stroke(),
                windowSize: ema12.options().windowSize,
              },
            ]}
          />

          <ZoomButtons />
          <OHLCTooltip origin={[8, 16]} />
        </Chart>
        <Chart
          id={4}
          height={elderRayHeight}
          yExtents={[0, elder.accessor()]}
          origin={elderRayOrigin}
          padding={{ top: 8, bottom: 8 }}
        >
          <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
          <YAxis ticks={4} tickFormat={pricesDisplayFormat} />

          <MouseCoordinateX displayFormat={timeDisplayFormat} />
          <MouseCoordinateY rectWidth={margin.right} displayFormat={pricesDisplayFormat} />

          <ElderRaySeries yAccessor={elder.accessor()} />

          <SingleValueTooltip
            yAccessor={elder.accessor()}
            yLabel="Elder Ray"
            yDisplayFormat={(d) => `${pricesDisplayFormat(d)}, ${pricesDisplayFormat(d)}`}
            origin={[8, 16]}
          />
        </Chart>
        <CrossHairCursor />
      </ChartCanvas>
    )
  }

  // ReactDOM.render(<App />, document.getElementById('container'))

  return (
    <div>
      <button>{nftIdFromUrl}</button>

      <div>
        <div className="details" style={{ width: '30%' }}>
          <div>Volume 24H</div>
          <div>24H%</div>
          <div>7D%</div>
          <div>Owner</div>
        </div>

        <div className="chart" style={{ width: '70%' }}>
          <div>
            <App />
          </div>
        </div>
      </div>

      <ProductTable
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
    </div>
  )
}
