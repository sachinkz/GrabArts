import React, { useState } from "react"
import "../../styles/PricingInput.css"
import PricingInput from "./PricingInput"

function PricingMain({ getPricing }) {


  const [PDchecked, setPDChecked] = useState(false)
  const [CPchecked, setCPChecked] = useState(false)
  const [STchecked, setSTChecked] = useState(false)
  const [PTchecked, setPTChecked] = useState(false)
  //   const [DGchecked, setDGChecked] = useState(false)
  const [THchecked, setTHChecked] = useState(false)

  const [allValues, setAllValues] = useState([])
  const [error, setError] = useState('')

  const addValues = (values) => {
    let exist = allValues.find((val) => val.style === values.style)
    if (exist) {
      let filteredValues = allValues.filter(
        (item) => item.style !== exist.style
      )
      console.log(filteredValues)
      setAllValues([...filteredValues, { ...values }])
    } else {
      setAllValues([...allValues, { ...values }])
    }
  }


  const submitHandler = () => {
    if (allValues.length !== 0)
    {
      getPricing(allValues)
    } else
    {
      setError('please choose atleast 1 style')
    }
  }

  return (
    <div className="pricing-input-main-container">
      <h3 className="pricing-input-heading">PRICING FOR YOUR WORK</h3>
      <p className="pricing-input-subhead">
        select works you are good at and provide pricing responsively for the
        number of faces in your work and paper size in which you are drawing{" "}
      </p>
      <div className="pricing-input-section-selector">
        <input
          className="pricing-input-section-selector-checkbox"
          onChange={(e) => setPDChecked((prev) => !prev)}
          type="checkbox"
        />
        <label
          className={
            allValues && allValues.find((val) => val.style === "pencil drawing")
              ? "pricing-input-section-selector-label-green"
              : "pricing-input-section-selector-label"
          }
        >
          Pencil Drawing
          {allValues &&
            allValues.find((val) => val.style === "pencil drawing") && (
              <i class="bx bx-check pricing-input-section-selector-tick"></i>
            )}
        </label>

        {PDchecked && (
          <PricingInput
            allValues={allValues}
            closeForm={setPDChecked}
            addValues={addValues}
            style={"pencil drawing"}
          />
        )}
      </div>
      <div className="pricing-input-section-selector">
        <input
          className="pricing-input-section-selector-checkbox"
          onChange={(e) => setCPChecked((prev) => !prev)}
          type="checkbox"
          value={CPchecked}
        />
        <label
          className={
            allValues && allValues.find((val) => val.style === "color pencil")
              ? "pricing-input-section-selector-label-green"
              : "pricing-input-section-selector-label"
          }
        >
          Color Pencil
          {allValues &&
            allValues.find((val) => val.style === "color pencil") && (
              <i class="bx bx-check pricing-input-section-selector-tick"></i>
            )}
        </label>
        {CPchecked && (
          <PricingInput
            allValues={allValues}
            closeForm={setCPChecked}
            addValues={addValues}
            style={"color pencil"}
          />
        )}
      </div>
      <div className="pricing-input-section-selector">
        <input
          className="pricing-input-section-selector-checkbox"
          onChange={(e) => setSTChecked((prev) => !prev)}
          type="checkbox"
          value={STchecked}
        />
        <label
          className={
            allValues && allValues.find((val) => val.style === "stencil art")
              ? "pricing-input-section-selector-label-green"
              : "pricing-input-section-selector-label"
          }
        >
          Stencil Art
          {allValues &&
            allValues.find((val) => val.style === "stencil art") && (
              <i class="bx bx-check pricing-input-section-selector-tick"></i>
            )}
        </label>
        {STchecked && (
          <PricingInput
            allValues={allValues}
            closeForm={setSTChecked}
            addValues={addValues}
            style={"stencil art"}
          />
        )}
      </div>
      <div className="pricing-input-section-selector">
        <input
          className="pricing-input-section-selector-checkbox"
          onChange={(e) => setPTChecked((prev) => !prev)}
          type="checkbox"
          value={PTchecked}
        />
        <label
          className={
            allValues && allValues.find((val) => val.style === "painting")
              ? "pricing-input-section-selector-label-green"
              : "pricing-input-section-selector-label"
          }
        >
          Painting
          {allValues && allValues.find((val) => val.style === "painting") && (
            <i class="bx bx-check pricing-input-section-selector-tick"></i>
          )}
        </label>
        {PTchecked && (
          <PricingInput
            allValues={allValues}
            closeForm={setPTChecked}
            addValues={addValues}
            style={"painting"}
          />
        )}
      </div>
      {/* <div className="pricing-input-section-selector">
        <input
          className="pricing-input-section-selector-checkbox"
          onChange={(e) => setDGChecked((prev) => !prev)}
          type="checkbox"
          value={DGchecked}
        />
        <label className="pricing-input-section-selector-label">
          Digital Art
        </label>
        {DGchecked && (
          <PricingInput
            allValues={allValues}
            closeForm={setDGChecked}
            addValues={addValues}
            style={"digital art"}
          />
        )}
      </div> */}
      <div className="pricing-input-section-selector">
        <input
          className="pricing-input-section-selector-checkbox"
          onChange={(e) => setTHChecked((prev) => !prev)}
          type="checkbox"
          value={THchecked}
        />
        <label
          className={
            allValues && allValues.find((val) => val.style === "thread art")
              ? "pricing-input-section-selector-label-green"
              : "pricing-input-section-selector-label"
          }
        >
          Thread Art
          {allValues && allValues.find((val) => val.style === "thread art") && (
            <i class="bx bx-check pricing-input-section-selector-tick"></i>
          )}
        </label>
        {THchecked && (
          <PricingInput
            allValues={allValues}
            closeForm={setTHChecked}
            addValues={addValues}
            style={"thread art"}
          />
        )}
      </div>
      {error && (
        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
      )}
      <button className="pricing-input-submit-btn " onClick={submitHandler}>
        SUBMIT
      </button>
    </div>
  )
}

export default PricingMain
