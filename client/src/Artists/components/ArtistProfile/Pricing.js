import React from 'react'

import '../../styles/Pricing.css'

function Pricing(props) {

  console.log(props.styles)
  
  return props.styles[0].map((price, i) => (
    <div className="total-table-box">
      <h3 className="style-name">STYLE : {price.style}</h3>
      <table key={i}>
        <thead>
          <tr>
            <th>Paper Size</th>
            <th>One Face</th>
            <th>Two Face</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>A5 paper</th>
            <td>{price.a5f1}</td>
            <td>{price.a5f2}</td>
          </tr>
          <tr>
            <th>A4 paper</th>
            <td>{price.a4f1}</td>
            <td>{price.a4f2}</td>
          </tr>
          <tr>
            <th>A3 paper</th>
            <td>{price.a3f1}</td>
            <td>{price.a3f2}</td>
          </tr>
        </tbody>
      </table>
    </div>
  ))}
export default Pricing
