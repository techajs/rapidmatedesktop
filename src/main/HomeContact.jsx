import React from 'react';
import { Form } from "react-bootstrap";
import Sender from "../assets/images/ContactForm-SenderImg.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import Styles from "../assets/css/home.module.css"

const HomeContact = () => {
  return (
    <>
    <section className={Styles.homeContactSec}>
        <div>
          <div className={`row ${Styles.manageRow}`}>
            <div className="col-md-6">
              <div className={Styles.homeContactDetailsCard}>
                <h4 className={Styles.homeContactTitleText}>Contact us</h4>
                <p className={Styles.homeContactDiscriptionText}>
                  Say something to start an email thread
                </p>
                <div className={Styles.homeContactNumberMainCard}>
                  <div className={Styles.homeContactNumberCard}>
                    <FontAwesomeIcon
                      className={Styles.homeContactPhoneIcon}
                      icon={faPhone}
                    />
                    <p className={Styles.homeContactNumbertext}>+33761406084</p>
                  </div>

                  <div className={Styles.homeContactNumberCard}>
                    <FontAwesomeIcon
                      className={Styles.homeContactPhoneIcon}
                      icon={faEnvelope}
                    />
                    <p className={Styles.homeContactNumbertext}>elyas@rapidmate.fr</p>
                  </div>

                  <div className={Styles.homeContactNumberCard}>
                    <FontAwesomeIcon
                      className={Styles.homeContactPhoneIcon}
                      icon={faLocationDot}
                    />
                    <p className={Styles.homeContactNumbertext}>
                      8B Avenue Danielle Casanova, 95210 Saint-Gratien, France
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <Form className={Styles.homeContactFormMainCardForm}>
                <div className={`row ${Styles.manageRow}`}>
                  <div className="col-md-6">
                    <Form.Group
                      className={`mb-3 ${Styles.mr2}`}
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className={Styles.homeContactFormLabel}>
                        First Name
                      </Form.Label>
                      <Form.Control
                        className={Styles.homeContactFormInput}
                        type="text"
                        placeholder="Type here.."
                      />
                    </Form.Group>
                  </div>

                  <div className="col-md-6">
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput2"
                    >
                      <Form.Label className={Styles.homeContactFormLabel}>
                        Last Name
                      </Form.Label>
                      <Form.Control
                        className={Styles.homeContactFormInput}
                        type="text"
                        placeholder="Type here.."
                      />
                    </Form.Group>
                  </div>

                  <div className="col-md-6">
                    <Form.Group
                      className={`mb-3 ${Styles.mr2}`}
                      controlId="exampleForm.ControlInput3"
                    >
                      <Form.Label className={Styles.homeContactFormLabel}>
                        Email
                      </Form.Label>
                      <Form.Control
                        className={Styles.homeContactFormInput}
                        type="email"
                        placeholder="Type here.."
                      />
                    </Form.Group>
                  </div>

                  <div className="col-md-6">
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput4"
                    >
                      <Form.Label className={Styles.homeContactFormLabel}>
                        Phone Number
                      </Form.Label>
                      <Form.Control
                        className={Styles.homeContactFormInput}
                        type="text"
                        placeholder="Type here.."
                      />
                    </Form.Group>
                  </div>

                  <div className="col-md-12">
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput5"
                    >
                      <Form.Label className={Styles.homeContactFormLabel}>
                        Subject
                      </Form.Label>
                      <Form.Control
                        className={Styles.homeContactFormInput}
                        type="text"
                        placeholder="Type here.."
                      />
                    </Form.Group>
                  </div>

                  <div className="col-md-12">
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput6"
                    >
                      <Form.Label className={Styles.homeContactFormLabel}>
                        Message
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        className={Styles.homeContactFormInput}
                        type="text"
                        placeholder="Type here.."
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-12">
                    <div className={Styles.HomeContactFromMessageSendBtnCard}>
                      <button className={Styles.HomeContactFromMessageSendBtn}>Send Message</button>
                      <img className={Styles.homeContactSenderImg} src={Sender} alt="img"/>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomeContact