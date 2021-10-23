import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import './index.css'
import { ProductTable } from 'pages/Analytics'
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

export function Token({
  match: {
    params: { tokenId: tokenIdFromUrl },
  },
}: RouteComponentProps<{ tokenId?: string }>) {
  console.log(tokenIdFromUrl)

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
      <button>{tokenIdFromUrl}</button>

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
          { id: 5, name: 'Butter', price: 0.9, stock: 99 },
          { id: 6, name: 'Sour Cream ', price: 2.9, stock: 86 },
          { id: 7, name: 'Fancy French Cheese 🇫🇷', price: 99, stock: 12 },
        ]}
      />
    </div>
  )
}
