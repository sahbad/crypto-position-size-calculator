import { useState } from 'react'

function App() {
  const [accountSize, setAccountSize] = useState('')
  const [riskPercentage, setRiskPercentage] = useState('')
  const [entryPrice, setEntryPrice] = useState('')
  const [stopLoss, setStopLoss] = useState('')

  const calculatePosition = () => {
    if (!accountSize || !riskPercentage || !entryPrice || !stopLoss) return null

    const riskAmount = (accountSize * (riskPercentage / 100))
    const priceDifference = Math.abs(entryPrice - stopLoss)
    const positionSize = riskAmount / priceDifference
    const totalPosition = positionSize * entryPrice

    return {
      positionSize: positionSize.toFixed(8),
      riskAmount: riskAmount.toFixed(2),
      totalPosition: totalPosition.toFixed(2)
    }
  }

  const result = calculatePosition()

  return (
    <div className="calculator">
      <h1>Crypto Position Calculator</h1>
      
      <div className="form-group">
        <label>Account Size (USD)</label>
        <input
          type="number"
          value={accountSize}
          onChange={(e) => setAccountSize(parseFloat(e.target.value))}
          placeholder="Enter your account size"
        />
      </div>

      <div className="form-group">
        <label>Risk Percentage (%)</label>
        <input
          type="number"
          value={riskPercentage}
          onChange={(e) => setRiskPercentage(parseFloat(e.target.value))}
          placeholder="Enter risk percentage"
          step="0.1"
          min="0.1"
          max="100"
        />
      </div>

      <div className="form-group">
        <label>Entry Price (USD)</label>
        <input
          type="number"
          value={entryPrice}
          onChange={(e) => setEntryPrice(parseFloat(e.target.value))}
          placeholder="Enter entry price"
          step="0.0001"
        />
      </div>

      <div className="form-group">
        <label>Stop Loss (USD)</label>
        <input
          type="number"
          value={stopLoss}
          onChange={(e) => setStopLoss(parseFloat(e.target.value))}
          placeholder="Enter stop loss price"
          step="0.0001"
        />
      </div>

      {result && (
        <div className="result">
          <p><strong>Position Size:</strong> {result.positionSize} coins</p>
          <p><strong>Risk Amount:</strong> ${result.riskAmount}</p>
          <p><strong>Total Position Value:</strong> ${result.totalPosition}</p>
        </div>
      )}
    </div>
  )
}

export default App
