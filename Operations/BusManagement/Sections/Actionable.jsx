import React, { useState } from "react";
import "./Actionable.css";
import img from "../../../../Assets/Bus_9M.png";

const Actionable = () => {
  const [showRenewals, setShowRenewals] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    cardName: "",
    billingAddress: "",
    zip: "",
    city: "",
    billingSame: false,
  });

  const renewals = [
    { vrn: "MHxx xx xxxx", months: 10, amount: "₹500.00" },
    { vrn: "Pellentesque adipiscing", months: 10, amount: "₹300.00" },
  ];

  const handleRenewAll = () => {
    setShowRenewals(true);
  };

  const handleClose = () => {
    setShowRenewals(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = () => {
    localStorage.setItem("paymentData", JSON.stringify(formData));
    alert("Payment details saved in localStorage!");
  };

  return (
    <div className="action-wrapper">
      <div className="action-header">
        <table>
          <thead>
            <tr>
              <th>VRN</th>
              <th>Subscription till</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>MHxx xx xxxx</td>
              <td>dd/mm/yyyy</td>
              <td className="expire-soon">Expires in 5 days</td>
            </tr>
            <tr>
              <td>MHxx xx xxxx</td>
              <td>dd/mm/yyyy</td>
              <td className="expire-urgent">Expires in 1 day</td>
            </tr>
          </tbody>
        </table>
        <div className="renew-all" onClick={handleRenewAll}>
          Renew all
        </div>
      </div>

      {showRenewals && (
        <div className="renewal-modal">
          <div className="order-summary">
            <h2>Your order</h2>
            {renewals.map((item, index) => (
              <div key={index} className="order-item">
                <img src={img} alt="bus" />
                <div>
                  <p>{item.vrn}</p>
                  <p>Months: {item.months}</p>
                </div>
                <p>{item.amount}</p>
              </div>
            ))}
            <p className="input-label">Discount Code</p>
            <div className="discount-code">
              <input type="text" placeholder="Discount Code" />
              <button>Apply</button>
            </div>
            <div className="totals">
              <p>Subtotal: ₹800.00</p>
              <p>Handling Cost: ₹20.00</p>
              <p>Discount: ₹50.00</p>
              <h3>Total: ₹770.00</h3>
            </div>
          </div>

          <div className="payment-section">
            <div style={{ textAlign: "right" }}>
              <i
                className="bi bi-x-lg"
                style={{ cursor: "pointer", fontSize: "20px" }}
                onClick={handleClose}
              ></i>
            </div>

            <p className="input-label">Email</p>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <p className="input-label">Phone Number</p>
            <input
              type="tel"
              name="phone"
              placeholder="Phone number"
              value={formData.phone}
              onChange={handleChange}
            />
            <p className="input-label">Payment Method</p>
            <div className="payment-methods">
              <button className="card-btn">
                <i className="bi bi-credit-card-2-front"></i> Visa •••• 8304
              </button>
              <button className="bank-btn">
                <i className="bi bi-bank"></i> Bank Account
              </button>
              <p>Add a New Payment Method</p>
              <div className="upi-options">
                <button>
                  <i className="bi bi-google"></i> GPay
                </button>
                <button>
                  <i className="bi bi-phone"></i> PhonePe
                </button>
                <button>
                  <i className="bi bi-wallet2"></i> Paytm
                </button>
              </div>
            </div>
            <p className="input-label">Card Holder Name</p>
            <input
              type="text"
              name="cardName"
              placeholder="Card holder name"
              value={formData.cardName}
              onChange={handleChange}
            />
            <p className="input-label">Billing Address</p>
            <input
              type="text"
              name="billingAddress"
              placeholder="Billing address"
              value={formData.billingAddress}
              onChange={handleChange}
            />
            <div className="city-zip">
              <div className="input-group">
                <p className="input-label">Zip Code</p>
                <input
                  type="text"
                  name="zip"
                  placeholder="Zip code"
                  value={formData.zip}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <p className="input-label">City</p>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="billing-checkbox">
              <input
                type="checkbox"
                name="billingSame"
                checked={formData.billingSame}
                onChange={handleChange}
              />{" "}
              Billing address is same as shipping
            </div>

            <button className="swipe-btn" onClick={handleSubmit}>
              Swipe to Pay
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Actionable;
