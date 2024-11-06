import React, { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import "../css/Authenticate.css";


const Authenticate = ({ account }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  return (
    <>
      <FontAwesomeIcon icon="fa-solid fa-xmark" />
      
      <div style={{ display: "flex", justifyContent: "between" }}>
        <FontAwesomeIcon
          icon="fa-solid fa-arrow-left"
          className="menu-icon"
          style={{ cursor: "pointer", marginTop: 20 }}
          onClick={() => navigate(-1)}
        />
        <h4 style={{ color: "#000", position: "fixed", right: 8, top: 2 }}>
          Wallet Address:
          {account.substring(0, 4) +
            "..." +
            account.substring(account.length - 4, account.length)}
        </h4>
      </div>
      
      <div className="cam">
        <br />
        <h2 style={{ position: "absolute", top: 20 }}>
          Hold QR Code Steady and Clear to Scan
        </h2>
        <QrReader
          onResult={async (result, error) => {
  if (result && result.text) {
    let data = JSON.parse(result.text);
    console.log("DATA:", data); // Log data to check if it's parsed correctly
    if (data.hash) {
      try {
        let res = await axios.get(
          "https://alfajores.celoscan.io/address/0xc7a9c0e4e3cd0af72b7d8ca28c8ceb3463125591"
        );
        console.log("RES:", res); // Log response to check the received data
        if (res.data && res.data.result) {
          setMessage("Product is Authenticated ✅");
          setAuth(true);
        } else {
          setMessage("Product is Not Authenticated ❌");
          setAuth(false);
        }
      } catch (error) {
        console.log("Error:", error); // Log any error during the API call
        setMessage("Error occurred while authenticating product");
        setAuth(false);
      }
    }
  }
  if (error) {
    console.log("ERROR:", error); // Log any error from the QR reader
    setMessage("Error occurred while scanning QR code");
    setAuth(false);
  }
}}
          style={{ width: "100%" }}
        />
        <div
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            top: "50%",
          }}
        >
          <div>
            <h1>{message}</h1>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 90 }}>
          <h3>
            Please wait for 15 sec if Authentication messages is not appearing
            on the screen then your product is not Authenticated.
          </h3>
          <br />
          <span>Please reload the page to Scan again.</span>
        </div>
      </div>
    </>
  );
};

export default Authenticate;
