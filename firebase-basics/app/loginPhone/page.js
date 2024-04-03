"use client";
import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { RecaptchaVerifier, getAuth } from "firebase/auth";
import { useState } from "react";
import { signInWithPhoneNumber } from "firebase/auth";
import { app } from "@/firebase.config";
import { useRouter } from "next/navigation";

export default function login() {
  const [phone, setPhone] = useState("");
  const [otp, setOTP] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otpSend, setOtpSend] = useState(false);
  const navigator = useRouter();
  let auth = getAuth(app);

  //TODO::1.setup recaptcha
  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "normal",
        callback: (response) => {},
        "expired-callback": () => {},
      }
    );
  }, []);

  //TODO::2.handleSendOTP
  const handleSendOTP = async () => {
    try {
      //   const formattedPhoneNumber = `+${phone.replace(/\D/g, "")}`;
      const conformation = await signInWithPhoneNumber(
        auth,
        phone,
        window.recaptchaVerifier
      );
      setConfirmationResult(conformation);
      setOtpSend(true);
      setPhone("");
      console.log("conformation", conformation);
      alert("OTP has been sent");
    } catch (err) {
      console.error(err);
      alert("Failed to send OTP");
    }
  };

  //TODO::3.handleOTPSubmit
  const handleOTPSubmit = async () => {
    try {
      await confirmationResult.confirm(otp);
      setOTP("");
      alert("Valid Operations");
      navigator.push("/");
    } catch (err) {
      console.error(err);
      alert("Error in handleOTPSubmit");
    }
  };

  return (
    <div>
      <Container fluid="sm" className="mt-3">
        <h2 className="mb-3">Login Using Phone</h2>
        {!otpSend ? (
          <>
            <div id="recaptcha-container"></div>
            <Row className="justify-content-center">
              <div>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="mobile"
                    placeholder="Mobile Number"
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </Form.Group>
                <button onClick={() => handleSendOTP()} id="sign-in-button">
                  Send Code
                </button>
              </div>
            </Row>
          </>
        ) : (
          <>
            <Row className="justify-content-center">
              <Col xs={12} md={6} lg={5}>
                <h2 className="mb-3">Enter OTP</h2>
                <Form.Group>
                  <Form.Control
                    id="otp"
                    type="number"
                    name="otp"
                    placeholder="OTP"
                    onChange={(e) => setOTP(e.target.value)}
                  />
                </Form.Group>
                <button onClick={() => handleOTPSubmit()}>Submit</button>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
}
