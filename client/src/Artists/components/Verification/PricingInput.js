import React, { useState } from "react"
import "../../styles/PricingInput.css"

function PricingInput({ style, allValues, addValues, closeForm }) {


  let detailsExist = allValues && allValues.find((val) => val.style === style)
  const [error,setError]=useState('')
  const [values, setValues] = useState({
    style: style,
    A3_1: detailsExist ? detailsExist.A3_1 : "",
    A3_2: detailsExist ? detailsExist.A3_2 : "",
    A3_3: detailsExist ? detailsExist.A3_3 : "",
    A3_4: detailsExist ? detailsExist.A3_4 : "",
    A3_5: "varries",
    A4_1: detailsExist ? detailsExist.A4_1 : "",
    A4_2: detailsExist ? detailsExist.A4_2 : "",
    A4_3: detailsExist ? detailsExist.A4_3 : "",
    A4_4: detailsExist ? detailsExist.A4_4 : "",
    A4_5: "varries",
    A5_1: detailsExist ? detailsExist.A4_1 : "",
    A5_2: detailsExist ? detailsExist.A4_2 : "",
    A5_3: detailsExist ? detailsExist.A4_3 : "",
    A5_4: detailsExist ? detailsExist.A4_4 : "",
    A5_5: "varries",
  })

  
  



  const onChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    const isEmptyValuePresent = Object.values(values).some(
      (value) => value === ""
    )
    if (isEmptyValuePresent) {
      setError('Please fill all empty fields')
    } else
    {
      addValues(values)
      closeForm((prev) => !prev)
    }
  }

  

  return (
    <div>
      <div className="pricing-input-container row">
        <div className="pricing-input-section col-md-4">
          <h4 className="pricing-input-section-head">A3 SIZE PAPER</h4>
          <label className="pricing-input-label">A3 paper with 1 Face</label>
          <input
            className="pricing-input-input"
            required
            type="number"
            value={detailsExist && values.A3_1}
            onChange={onChangeHandler}
            name="A3_1"
          />
          <label className="pricing-input-label">A3 paper with 2 Faces</label>
          <input
            className="pricing-input-input"
            required
            value={detailsExist && values.A3_2}
            onChange={onChangeHandler}
            type="number"
            name="A3_2"
          />
          <label className="pricing-input-label"> A3 paper with 3 Faces</label>
          <input
            className="pricing-input-input"
            required
            value={detailsExist && values.A3_3}
            onChange={onChangeHandler}
            type="number"
            name="A3_3"
          />
          <label className="pricing-input-label">A3 paper with 4 Faces</label>
          <input
            className="pricing-input-input"
            required
            value={detailsExist && values.A3_4}
            onChange={onChangeHandler}
            type="number"
            name="A3_4"
          />
        </div>
        <div className="pricing-input-section col-md-4">
          <h4 className="pricing-input-section-head">A4 SIZE PAPER</h4>
          <label className="pricing-input-label">A4 paper with 1 Face</label>
          <input
            className="pricing-input-input"
            required
            value={detailsExist && values.A4_1}
            onChange={onChangeHandler}
            type="number"
            name="A4_1"
          />
          <label className="pricing-input-label">A4 paper with 2 Faces</label>
          <input
            className="pricing-input-input"
            required
            value={detailsExist && values.A4_2}
            onChange={onChangeHandler}
            type="number"
            name="A4_2"
          />
          <label className="pricing-input-label">A4 paper with 3 Faces</label>
          <input
            className="pricing-input-input"
            required
            value={detailsExist && values.A4_3}
            onChange={onChangeHandler}
            type="number"
            name="A4_3"
          />
          <label className="pricing-input-label">A4 paper with 4 Faces</label>
          <input
            className="pricing-input-input"
            required
            value={detailsExist && values.A4_4}
            onChange={onChangeHandler}
            type="number"
            name="A4_4"
          />
        </div>
        <div className="pricing-input-section col-md-4">
          <h4 className="pricing-input-section-head">A5 SIZE PAPER</h4>
          <label className="pricing-input-label">A5 paper with 1 Face</label>
          <input
            className="pricing-input-input"
            required
            value={detailsExist && values.A5_1}
            onChange={onChangeHandler}
            type="number"
            name="A5_1"
          />
          <label className="pricing-input-label">A5 paper with 2 Faces</label>
          <input
            className="pricing-input-input"
            required
            value={detailsExist && values.A5_2}
            onChange={onChangeHandler}
            type="number"
            name="A5_2"
          />
          <label className="pricing-input-label">A5 paper with 3 Faces</label>
          <input
            className="pricing-input-input"
            required
            value={detailsExist && values.A5_3}
            onChange={onChangeHandler}
            type="number"
            name="A5_3"
          />
          <label className="pricing-input-label">A5 paper with 4 Faces</label>
          <input
            className="pricing-input-input"
            required
            value={detailsExist && values.A5_4}
            onChange={onChangeHandler}
            type="number"
            name="A5_4"
          />
        </div>
        <p style={{ color: "red", textAlign: "center" }}>{error && error}</p>
        <h2
          onClick={handleSave}
          className="btn btn-success mt-3"
          style={{ width: "100px" }}
        >
          SAVE
        </h2>
      </div>
    </div>
  )
}

export default PricingInput
