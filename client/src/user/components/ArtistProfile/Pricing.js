import React from 'react'

import '../../styles/Pricing.css'

function Pricing(props) {

  console.log(props.styles)
  
  return props.styles.styles.map((price, i) => (
    <div className="total-table-box">
      <h3 className="style-name">STYLE : {price.style}</h3>
      <table key={i}>
        <thead>
          <tr>
            <th>no of face</th>
            <th>A3</th>
            <th>A4</th>
            <th>A5 </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>1</th>
            <td>{price.A3_1}</td>
            <td>{price.A4_1}</td>
            <td>{price.A5_1}</td>
          </tr>
          <tr>
            <th>2</th>
            <td>{price.A3_2}</td>
            <td>{price.A4_2}</td>
            <td>{price.A5_2}</td>
          </tr>
          <tr>
            <th>3 </th>
            <td>{price.A3_3}</td>
            <td>{price.A4_3}</td>
            <td>{price.A5_3}</td>
          </tr>
          <tr>
            <th>4</th>
            <td>{price.A3_4}</td>
            <td>{price.A4_4}</td>
            <td>{price.A5_4}</td>
          </tr>
          <tr>
            <th>+ 4</th>
            <td>{price.A3_5}</td>
            <td>{price.A4_5}</td>
            <td>{price.A5_5}</td>
          </tr>
        </tbody>
      </table>
    </div>
  ))}
export default Pricing
