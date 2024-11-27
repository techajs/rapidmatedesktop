import React, { useEffect, useState } from "react";
import Styles from "../assets/css/home.module.css";
import Loginbanner from "../assets/images/Login-banner.png";
import Logo from "../assets/images/Logo-icon.png";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import ForgotPasswordEmailModal from "./ForgotPasswordEmailModal";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess, loginStart, loginFailed } from "../redux/authSlice";
import { authenticateUser, getLookupData } from "../data_manager/dataManage";
import localforage from "localforage";
import { commonDataList } from "../redux/commonDataSlice";
import { UseFetch } from "../utils/UseFetch";
import { ToastContainer } from "react-toastify";
import { showErrorToast, showSuccessToast } from "../utils/Toastify";
const Login = () => {
  const {lookup}=UseFetch()
  const { loading } = useSelector((state) => state.auth);
  // console.log("loading--------", loading)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fcmToken, setFcmToken] = useState('');
  const [errors, setErrors] = useState({});
  const [iserror, setIserror] = useState(false);
  const checkboxTypes = ["checkbox"];
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
    }

    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(loginStart());
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      dispatch(loginFailed());
      return;
    }
    let params = {
      info: {
        userName: email,
        password: password,
        token: fcmToken,
      },
    };
    authenticateUser(
      params,
      (successResponse) => {
        if (successResponse[0]._success) {
          if (successResponse[0]._response) {
            if (successResponse[0]._response.name == "NotAuthorizedException") {
              showErrorToast("Username or password is incorrect");
              dispatch(loginFailed());
            } else if (
              successResponse[0]._response.name == "UserNotConfirmedException"
            ) {
              showErrorToast("Delivery Boy Verfication Pending");
              dispatch(loginFailed());
            } else {
              const dataRes =successResponse[0]._response.user?.idToken?.payload;
              const userData = {
                userInfo: {
                  username: dataRes["cognito:username"],
                  email: dataRes.email,
                  name: dataRes.name,
                  email_verify: dataRes.email_verified,
                  auth_time: dataRes.auth_time,
                  exp: dataRes.exp,
                },
                userDetails: successResponse[0]._response.user_profile[0],
              };
              const getToken = successResponse[0]._response?.token;
              const userRole=successResponse[0]._response.user_profile[0].role
              const refreshToken = successResponse[0]._response?.refreshtoken;
              if (getToken && userData) {
                // const userInfo={role:userRole, user: userData }
                localforage.setItem(1, getToken);
                // localforage.setItem(2, refreshToken);
                dispatch(loginSuccess({role:userRole, user: userData }));
                dispatch(commonDataList(lookup))
                showSuccessToast('Login successful! Welcome back!')
                navigateBasedOnRole(successResponse[0]._response.user_profile[0].role);
              } else {
                showErrorToast("Login failed due to missing token or user data.")
                dispatch(loginFailed());
              }
            }
          }
        } else {
          showErrorToast("Invalid credentials")
          dispatch(loginFailed());
        }
      },
      (errorResponse) => {
        let err = "";
        if (errorResponse.errors) {
          err = errorResponse.errors.msg[0].msg;
        } else {
          err = errorResponse[0]._errors.message;
        }
        showErrorToast(err)
        dispatch(loginFailed());
      }
    );
  };

  const navigateBasedOnRole = (role) => {
    const baseUrl=role?.toLowerCase().replace(/_/g, '');
    setTimeout(()=>{
      navigate("/"+baseUrl+"/dashboard")
    },2000)
    
  };
  return (
    <>
      <section className={Styles.loginSection}>
        <div className={`row ${Styles.manageRow}`}>
          <div className="col-md-5">
            <div className={Styles.loginMain}>
              <div>
                <Link className={Styles.logoCard} to="/">
                  <img className={Styles.logo} src={Logo} alt="banner" />
                  <h2 className={Styles.companyName}>Rapidmate</h2>
                </Link>
              </div>

              <div className={Styles.loginCard}>
                <div className={Styles.welcomeuserCard}>
                  <h1 className={Styles.welcomeLogin}>{t("welcome")}</h1>
                  <p className={Styles.loginInfo}>{t("login_with_email")}</p>
                </div>

                <div>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label className={`${Styles.loginLabels} ${errors.email ? Styles.forgotPassword : ''}`}>
                      {errors.email !== undefined && errors.email !== null ? errors.email : t("email")}

                      </Form.Label>
                      
                      <Form.Control
                        className={Styles.loginInputs}
                        type="email"
                        placeholder={t("email") + "..."}
                        onChange={(e) => setEmail(e.target.value)}
                        isInvalid={!!errors.email}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="formPlaintextPassword"
                    >
                      <Form.Label className={`${Styles.loginLabels} ${errors.password ? Styles.forgotPassword : ''}`}>
                      {errors.password !== undefined && errors.password !== null ? errors.password : t("password")}
                      </Form.Label>
                      <div className={Styles.passwordInputContainer}>
                        <Form.Control
                          className={`password-field ${Styles.loginInputs}`}
                          type={showPassword ? "text" : "password"}
                          placeholder={t("password") + "..."}
                          onChange={(e) => setPassword(e.target.value)}
                          isInvalid={!!errors.password}
                        />
                        <FontAwesomeIcon
                          icon={showPassword ? faEyeSlash : faEye}
                          onClick={togglePasswordVisibility}
                          className={Styles.eyeIcon}
                        />
                      </div>
                    </Form.Group>
                  </Form>
                  <div className={Styles.forgotCard}>
                    <Link
                      onClick={handleShowModal}
                      className={Styles.forgotPassword}
                      to="#"
                    >
                      {t("forgot_password")}
                    </Link>
                  </div>
                </div>
                <div>
                  <Link
                    className={Styles.signinBtn}
                    disabled={loading}
                    onClick={handleSubmit}
                  >
                    {loading ? "Logging in..." : t("sign_in")}
                  </Link>
                  {/* <div>
                    <Form>
                      {checkboxTypes.map((type) => (
                        <div key={`default-${type}`} className={`mb-3 ${Styles.checkboxCard}`}>
                          <Form.Check
                            type={type}
                            id={`default-${type}`}
                            label={null}
                            className={Styles.customCheckbox}
                          />
                          <p className={Styles.checkText}>{t('i_have_read_agree')} <Link className={Styles.termsCheck} to="#">{t('terms_of_use')}</Link></p>
                        </div>
                      ))}
                    </Form>
                  </div> */}
                </div>
              </div>

              <div className={Styles.registerCard}>
                <p className={Styles.noAccount}>
                  {t("dont_have_account")}{" "}
                  <Link to="/profile-choose" className={Styles.registerText}>
                    {t("register")}
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-7">
            <div>
              <img
                className={Styles.loginBanner}
                src={Loginbanner}
                alt="banner"
              />
            </div>
          </div>

          {/* ---------- Modal include here ---------  */}
          <ForgotPasswordEmailModal
            show={showModal}
            handleClose={handleCloseModal}
          />
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default Login;

/**
 * [
    {
        "_success": true,
        "_httpsStatus": "OK",
        "_httpsStatusCode": 200,
        "_responedOn": 1724855224677,
        "_response": {
            "token": "eyJraWQiOiJ3SWFxU0lUWlpcL3k3cEZcLzJcL3hNdDhxXC9HenJyM0tVSVYxVGlqSFdDamNiYz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJjMDFjNjljYy1kMDgxLTcwZWQtMWQ5OS00NGZhNjRhNzAxODkiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtbm9ydGgtMS5hbWF6b25hd3MuY29tXC9ldS1ub3J0aC0xX2dCWDlVdDhQMSIsImNsaWVudF9pZCI6IjNyNmNhNWNzcWVpYWNpODA1cGt0OWV1ODA5Iiwib3JpZ2luX2p0aSI6ImViOGU1NzRhLTgzMjYtNDMyOS04ZmZhLWE5OTc3NWI4OWU2ZSIsImV2ZW50X2lkIjoiNmQxYWE5ZDUtOTM1NC00OGVkLWI2NWQtMDQzMGRmMzQyZDA2IiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTcyNDg1NTIyNCwiZXhwIjoxNzI0ODU4ODI0LCJpYXQiOjE3MjQ4NTUyMjQsImp0aSI6Ijc1Y2EzZWZmLWM4ZjQtNGQzYy1iYzllLTZjOGM4ZTVkNDc1NSIsInVzZXJuYW1lIjoiemlrb2x5QHBvbGthcm9hZC5uZXQifQ.DB-XvCI4vALVWiLjgV4bunHFTJ5riBcwRsRIjXkCqtmUW2ZPCjfWnD4QaaIOAIfBDGoXm8JM7wshUIpVo1q9noWke2CfeYCHO49wM-Yr8xvpcehyKTIDduNFd8_w9YXUoe149VqR2nfrP8DW5zAy20SDFsKiuZLBWSQk4mhrYITmWjiXgdW3cVaj1GuVMxmTdWIH6YxX2anet5GNbNsZsKdkSWOgmKA5H5LxRJD5x-poBpShtDp6uPN3QSFUPEcI-kvf6rXnZHpxpK5HKks4SDZUiL57gMKxvzTKbTF28oRao3jsjVxywMSql3w3tOcV33HMXjUaCa-S4RJcoqViGg",
            "refreshtoken": "eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.Ew9GiOlBs3amfrJ0S1wAuH_MbfXSTGcYYBf5EjMIOOJVM_vKARzD7ADKUuvJscidArgancRkvd2pJ6IvtdA3IOrJGEc6vu0oxYU7SyJKpp6Y1CYtV-LkmX1gQtZYG_Y7ErFHBzoXhvooZi2jIn0Rk70zvTf2pHgYHC5hi_kp4ZBMN9-GmtWcErGr3ho5XBGVHGkCtN7cN5fVi5B7sHObpJgiwRyskLxo7_d3DCtnQnCep-o3l8BgaCd4tMEH6l8oWvviUCXMGEjF6dBtBPXWJ5wg8H7DHdP7Hsiom8hfDnI-sVFqKhN3EWIy9udoL8yQwJIz_R-QE9pKYMWHfvHZJg.ZcTDruZX2v_Ia5Tn.2nUcxwJqHT0xCDw2md298SkCsJfTTUH8I3MebmF2Lmf4L8ZeWEfqTyoIUjloOJlDblrYC_4sgEHdllI7sUttvj1JfUo5vDCs7ckiEc6lYomA701svuM61VjUQTsnBUbYJuBhpAzcpL_qUxi7zryIvB7MHYVus8pcTVCCaA-DrFaTUC34AGlvYPR_kNYA5N1Lls_M65q99OUdbSeY3HxvnkHo2eHteYF0xTBgVe7Qq76IduCHYZSrHkHXhp0MEJiVEgq9RNPVkAWK4KzHptgz7hvjBeTvoL58vaeDfEYaNxBq4lLfcfuJdfT8NUjcu5MndvHuNwzV6mLh9A3m38lreOAZ1OQJyfPdI86lQjtmAKl7CS6C16ig1iSm3kSzjjevBnMEA6Sgs5Epw67P6-4Ae7EHlzLqDZO7yNfHig1rsMFoMckJ4UVAZeqlsPJC1Lj2XVUcdD1Rt9ccajm-fiPjkCbtDlujB1Z4Nz3Pu1n9lhpFD_V15kByb9mAvpQoARKFIL1_WfJfVB6xk9Sn7zBzK5peAhx1C4-zn5X2NN3duXb13yRspIawVfl1VAEPsmEctpVTQ2_hzI7MjbBGz1tXB55R5oJDgXlU3BKtx23JZiVJPO-tQzQyK587h1m1wCnEb26FP6vHSKZYjZ-bN1yMgrk2E5JR6tBUy3EA6ZSmzDPiSzStm9P8x-xquKuzGFg8JkBwdQ3hICxpoCEZI-2zQcR8SIAwDns2eeZ7WZxwvZVpFixCrLu6lqcphDAxW9P28o8w7Vue1kDdX2MhyLLqbuz-lBmIRNpMML5opUf7lCy_gfkN2e5d61y9t7SQM6R9y8WOAHmcy3w6Y_Td25f3L9O0FfYCEWYx55sGrOYa6KvfbEXnA0UjK6_y7k62R39jXwrR6TvckW53OU91gB4xMJ_gjf0yyft0rke6uuXZkrC7iivw8eN35KI4U12Nr4A4KNdZQYagw68kCEih4lOwb29C6CtsQ5OyvTUEVNn4hjrg1ph0LJm7MO_oBnluZzbcZi6RRJ64wP-D-G5gs_jKCrHI1I2V0prI3ayKAkTsoQae_gbODU6bGJob8jahBWA95c7pBvOlqK6tEeDELCUxlcROvLPI3GaWrNBcAGIIa4cHOXsUUfm_2Tcx9X2yfGHyjx9DRnhJGAq-Xrab018tqimyk7f9rHEZL5EdSJoJMhBxVH3wPKR78WVOkQFAeXCB3MTTmN1B0zh0z67CWu3yUuLnXiJLS8sAk-yc9ykYgKNcLJCntA29oulR5DsB9U4gREtZh0WcKKtTsc0f3JLJyXfe7p8jjc1AyA.DvLt50-pBZvsvbROKtPA-Q",
            "user": {
                "idToken": {
                    "jwtToken": "eyJraWQiOiJaeDNPbFR1TTZUKytSd21qRDlWTkVIcDZ1OGlGSkp2MzRCdGZtXC9pQnRqTT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJjMDFjNjljYy1kMDgxLTcwZWQtMWQ5OS00NGZhNjRhNzAxODkiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LW5vcnRoLTEuYW1hem9uYXdzLmNvbVwvZXUtbm9ydGgtMV9nQlg5VXQ4UDEiLCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOmZhbHNlLCJjb2duaXRvOnVzZXJuYW1lIjoiemlrb2x5QHBvbGthcm9hZC5uZXQiLCJvcmlnaW5fanRpIjoiZWI4ZTU3NGEtODMyNi00MzI5LThmZmEtYTk5Nzc1Yjg5ZTZlIiwiYXVkIjoiM3I2Y2E1Y3NxZWlhY2k4MDVwa3Q5ZXU4MDkiLCJldmVudF9pZCI6IjZkMWFhOWQ1LTkzNTQtNDhlZC1iNjVkLTA0MzBkZjM0MmQwNiIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNzI0ODU1MjI0LCJuYW1lIjoiemlrb2x5QHBvbGthcm9hZC5uZXQiLCJwaG9uZV9udW1iZXIiOiIrMzM3ODA3NjM3MzMiLCJleHAiOjE3MjQ4NTg4MjQsImlhdCI6MTcyNDg1NTIyNCwianRpIjoiYjVlZTM2NDgtNWY3My00ZTliLWI4YzQtYzRiMzQ5NWY3NTQwIiwiZW1haWwiOiJ6aWtvbHlAcG9sa2Fyb2FkLm5ldCJ9.HU-9Sj0_0GKR2suG2hYnJ32DcrGFYlisEjX4SDqPXRlFjBE_D3zW9YJk3LBvDNHaT1jMyxPCMv0rTPZ3qRwO2PV4t5RpkMPSHeBReTZSjspwyeKebn68-7uQS-0MLghuAfK-sI92qPa756ukGQT0vVC-Ymj-a7dS5fHkZOphg1EThNmoBdNXuG9Ud-2gJIMuyd9UPUbhrsoZr9jLywUf4Py7YAXeB9m-Eu88ZlTBeOVu7xfDoR_MQqBElm6wzwaZOxNn01oQXjvT1RXddxsqE_OCTf7np9Lw7sT_iZDdiuvl3nqEP0a_QrvmYSNIU7IOH3f5qe04xmt0-PvltFFJlA",
                    "payload": {
                        "sub": "c01c69cc-d081-70ed-1d99-44fa64a70189",
                        "email_verified": true,
                        "iss": "https://cognito-idp.eu-north-1.amazonaws.com/eu-north-1_gBX9Ut8P1",
                        "phone_number_verified": false,
                        "cognito:username": "zikoly@polkaroad.net",
                        "origin_jti": "eb8e574a-8326-4329-8ffa-a99775b89e6e",
                        "aud": "3r6ca5csqeiaci805pkt9eu809",
                        "event_id": "6d1aa9d5-9354-48ed-b65d-0430df342d06",
                        "token_use": "id",
                        "auth_time": 1724855224,
                        "name": "zikoly@polkaroad.net",
                        "phone_number": "+33780763733",
                        "exp": 1724858824,
                        "iat": 1724855224,
                        "jti": "b5ee3648-5f73-4e9b-b8c4-c4b3495f7540",
                        "email": "zikoly@polkaroad.net"
                    }
                },
                "refreshToken": {
                    "token": "eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.Ew9GiOlBs3amfrJ0S1wAuH_MbfXSTGcYYBf5EjMIOOJVM_vKARzD7ADKUuvJscidArgancRkvd2pJ6IvtdA3IOrJGEc6vu0oxYU7SyJKpp6Y1CYtV-LkmX1gQtZYG_Y7ErFHBzoXhvooZi2jIn0Rk70zvTf2pHgYHC5hi_kp4ZBMN9-GmtWcErGr3ho5XBGVHGkCtN7cN5fVi5B7sHObpJgiwRyskLxo7_d3DCtnQnCep-o3l8BgaCd4tMEH6l8oWvviUCXMGEjF6dBtBPXWJ5wg8H7DHdP7Hsiom8hfDnI-sVFqKhN3EWIy9udoL8yQwJIz_R-QE9pKYMWHfvHZJg.ZcTDruZX2v_Ia5Tn.2nUcxwJqHT0xCDw2md298SkCsJfTTUH8I3MebmF2Lmf4L8ZeWEfqTyoIUjloOJlDblrYC_4sgEHdllI7sUttvj1JfUo5vDCs7ckiEc6lYomA701svuM61VjUQTsnBUbYJuBhpAzcpL_qUxi7zryIvB7MHYVus8pcTVCCaA-DrFaTUC34AGlvYPR_kNYA5N1Lls_M65q99OUdbSeY3HxvnkHo2eHteYF0xTBgVe7Qq76IduCHYZSrHkHXhp0MEJiVEgq9RNPVkAWK4KzHptgz7hvjBeTvoL58vaeDfEYaNxBq4lLfcfuJdfT8NUjcu5MndvHuNwzV6mLh9A3m38lreOAZ1OQJyfPdI86lQjtmAKl7CS6C16ig1iSm3kSzjjevBnMEA6Sgs5Epw67P6-4Ae7EHlzLqDZO7yNfHig1rsMFoMckJ4UVAZeqlsPJC1Lj2XVUcdD1Rt9ccajm-fiPjkCbtDlujB1Z4Nz3Pu1n9lhpFD_V15kByb9mAvpQoARKFIL1_WfJfVB6xk9Sn7zBzK5peAhx1C4-zn5X2NN3duXb13yRspIawVfl1VAEPsmEctpVTQ2_hzI7MjbBGz1tXB55R5oJDgXlU3BKtx23JZiVJPO-tQzQyK587h1m1wCnEb26FP6vHSKZYjZ-bN1yMgrk2E5JR6tBUy3EA6ZSmzDPiSzStm9P8x-xquKuzGFg8JkBwdQ3hICxpoCEZI-2zQcR8SIAwDns2eeZ7WZxwvZVpFixCrLu6lqcphDAxW9P28o8w7Vue1kDdX2MhyLLqbuz-lBmIRNpMML5opUf7lCy_gfkN2e5d61y9t7SQM6R9y8WOAHmcy3w6Y_Td25f3L9O0FfYCEWYx55sGrOYa6KvfbEXnA0UjK6_y7k62R39jXwrR6TvckW53OU91gB4xMJ_gjf0yyft0rke6uuXZkrC7iivw8eN35KI4U12Nr4A4KNdZQYagw68kCEih4lOwb29C6CtsQ5OyvTUEVNn4hjrg1ph0LJm7MO_oBnluZzbcZi6RRJ64wP-D-G5gs_jKCrHI1I2V0prI3ayKAkTsoQae_gbODU6bGJob8jahBWA95c7pBvOlqK6tEeDELCUxlcROvLPI3GaWrNBcAGIIa4cHOXsUUfm_2Tcx9X2yfGHyjx9DRnhJGAq-Xrab018tqimyk7f9rHEZL5EdSJoJMhBxVH3wPKR78WVOkQFAeXCB3MTTmN1B0zh0z67CWu3yUuLnXiJLS8sAk-yc9ykYgKNcLJCntA29oulR5DsB9U4gREtZh0WcKKtTsc0f3JLJyXfe7p8jjc1AyA.DvLt50-pBZvsvbROKtPA-Q"
                },
                "accessToken": {
                    "jwtToken": "eyJraWQiOiJ3SWFxU0lUWlpcL3k3cEZcLzJcL3hNdDhxXC9HenJyM0tVSVYxVGlqSFdDamNiYz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJjMDFjNjljYy1kMDgxLTcwZWQtMWQ5OS00NGZhNjRhNzAxODkiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtbm9ydGgtMS5hbWF6b25hd3MuY29tXC9ldS1ub3J0aC0xX2dCWDlVdDhQMSIsImNsaWVudF9pZCI6IjNyNmNhNWNzcWVpYWNpODA1cGt0OWV1ODA5Iiwib3JpZ2luX2p0aSI6ImViOGU1NzRhLTgzMjYtNDMyOS04ZmZhLWE5OTc3NWI4OWU2ZSIsImV2ZW50X2lkIjoiNmQxYWE5ZDUtOTM1NC00OGVkLWI2NWQtMDQzMGRmMzQyZDA2IiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTcyNDg1NTIyNCwiZXhwIjoxNzI0ODU4ODI0LCJpYXQiOjE3MjQ4NTUyMjQsImp0aSI6Ijc1Y2EzZWZmLWM4ZjQtNGQzYy1iYzllLTZjOGM4ZTVkNDc1NSIsInVzZXJuYW1lIjoiemlrb2x5QHBvbGthcm9hZC5uZXQifQ.DB-XvCI4vALVWiLjgV4bunHFTJ5riBcwRsRIjXkCqtmUW2ZPCjfWnD4QaaIOAIfBDGoXm8JM7wshUIpVo1q9noWke2CfeYCHO49wM-Yr8xvpcehyKTIDduNFd8_w9YXUoe149VqR2nfrP8DW5zAy20SDFsKiuZLBWSQk4mhrYITmWjiXgdW3cVaj1GuVMxmTdWIH6YxX2anet5GNbNsZsKdkSWOgmKA5H5LxRJD5x-poBpShtDp6uPN3QSFUPEcI-kvf6rXnZHpxpK5HKks4SDZUiL57gMKxvzTKbTF28oRao3jsjVxywMSql3w3tOcV33HMXjUaCa-S4RJcoqViGg",
                    "payload": {
                        "sub": "c01c69cc-d081-70ed-1d99-44fa64a70189",
                        "iss": "https://cognito-idp.eu-north-1.amazonaws.com/eu-north-1_gBX9Ut8P1",
                        "client_id": "3r6ca5csqeiaci805pkt9eu809",
                        "origin_jti": "eb8e574a-8326-4329-8ffa-a99775b89e6e",
                        "event_id": "6d1aa9d5-9354-48ed-b65d-0430df342d06",
                        "token_use": "access",
                        "scope": "aws.cognito.signin.user.admin",
                        "auth_time": 1724855224,
                        "exp": 1724858824,
                        "iat": 1724855224,
                        "jti": "75ca3eff-c8f4-4d3c-bc9e-6c8c8e5d4755",
                        "username": "zikoly@polkaroad.net"
                    }
                },
                "clockDrift": 0
            },
            "user_profile": [
                {
                    "ext_id": "D1724760881139",
                    "role": "DELIVERY_BOY",
                    "username": "zikoly@polkaroad.net",
                    "first_name": "Hinata",
                    "last_name": "Uzumaki",
                    "email": "zikoly@polkaroad.net",
                    "phone": "+33780763733",
                    "profile_pic": "delivery_boy",
                    "work_type_id": 3,
                    "verification_code": 123456,
                    "enable_push_notification": 1,
                    "enable_email_notification": 1,
                    "language_id": 1
                }
            ]
        },
        "_trackId": "bad4537a-797c-4c47-99b0-18143a5510d4"
    }
]
 */
