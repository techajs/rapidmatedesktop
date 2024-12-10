import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import CommonHeader from "../../common/CommonHeader";
import Styles from "../../assets/css/home.module.css";

import { ToastContainer } from "react-toastify";
import SideComponent from "./common/SideComponent";
import {useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faPlus, faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import { Form } from "react-bootstrap";
import CalenderEvent from "./setting/CalenderEvent";
import moment from "moment";
const SetNewSchedule = () => {
  const user = useSelector((state) => state.auth.user);
  const [loading,setLoading]=useState(false)
  const [currentData,setCurrentDate]=useState(moment(new Date()).format('MMMM D, YYYY'))
  const location = useLocation();
  const { vehicletypeId, serviceType,branch,deliveryType } = location.state;
  const [value, setValue] = useState(new Date());
  const [rows, setRows] = useState([{ from: "", to: "" }]);
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: '',
    end: '',
    allDay: false
  });
  const orders = [];
  const [calendarDate, setCalendarDate] = useState(new Date());
  const handleAddRow = () => {
    setRows([...rows, { from: "", to: "" }]);
  };

  const handleChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const handleDeleteRow = (index) => {
    // Avoid deleting the initial row
    if (rows.length > 1) {
      const updatedRows = rows.filter((_, i) => i !== index);
      setRows(updatedRows);
    }
  };

//   const currentMonth = moment().month();
//   const currentYear = moment().year();
//   const orders = [
//     {
//       title: 'Pickup on Jun 2, 2024 at 11:30 AM',
//       start: new Date(currentYear, currentMonth, 6, 11, 30),
//       end: new Date(currentYear, currentMonth, 6, 12, 30),
//       allDay: false,
//       resource: {
//         from: 'North Street, ABC',
//         to: '5th Avenue, XYZ',
//         orderId: '98237469'
//       }
//     }
//   ];
console.log('ts')
  const handleAddEvent = () => {
    
    if (!newEvent.start || !newEvent.end) {
      alert('Please provide all details for the event.');
      return;
    }

    const start = new Date(newEvent.start);
    const end = new Date(newEvent.end);
    newEvent.title=`creat shift on ${start} to ${end}`
    if (start >= end) {
      alert('End date/time must be after start date/time.');
      return;
    }
    

    setEvents([...events, { ...newEvent, start, end }]);
    setCalendarDate(start); // Automatically navigate to the selected start date
    setNewEvent({ title: '', start: '', end: '', allDay: false });
  };
  
  const continueHanger = () =>{
    setLoading(!loading)
  }
  return (
    <>
      <CommonHeader userData={user} />
      <section className={Styles.enterprisenewScheduleSec}>
        <div>
          <div className={`row ${Styles.manageRow}`}>
            <div className="col-md-3">
              <SideComponent />
            </div>

            <div className="col-md-9">
                <div className={Styles.enterpriseCreateShiftSetavailabilityActionBtnCard}>
                    <h4 className={Styles.enterpriseNewScheduleSelectType}>
                    Set availability
                    </h4>
                    <div>
                    <button className={Styles.enterpriseCreateShiftSetavailabilitycancelBtn}>
                        Cancel
                    </button>
                    <button onClick={handleAddEvent} className={Styles.enterpriseCreateShiftSetavailabilitySaveBtn}>
                        Save
                    </button>
                    </div>
                </div>
                <div className={`row ${Styles.manageRow}`}>
                    <div className="col-md-8">
                    <div>
                <div className={Styles.enterprisePlanningCalenderMain}>
                  <CalenderEvent  orders={orders} newEvent={newEvent} setNewEvent={setNewEvent} events={events} setEvents={setEvents} calendarDate={calendarDate} setCalendarDate={setCalendarDate}/>
                </div>
              </div>
                    </div>
                    <div className="col-md-4">
                        <div className={Styles.enterpriseCreateShiftAvailabilityMainCard}>
                            <div className={Styles.enterpriseCreateShiftAvailabilityHeader}>
                                <div>
                                    <p className={Styles.enterpriseCreateShiftAvailabilityText}>
                                    Set availability of
                                    </p>
                                    <h4 className={Styles.enterpriseCreateShiftAvailabilityDate}>
                                    {currentData}
                                    </h4>
                                </div>
                                <button className={Styles.enterprisePlannigDateCloseIcon}>
                                    <FontAwesomeIcon icon={faX} />
                                </button>
                            </div>
                            <div className={Styles.enterpriseCreateShiftAvailabilitySlotsMainCard}>
                                <div  className={Styles.enterpriseCreateShiftAvailabilityAddrowCard}>
                                From date : 
                                <div className={Styles.enterpriseCreateShiftAvailabilityFromCard}>
                                  
                                <input
                                    type="date"
                                    placeholder="Start"
                                    value={newEvent.start}
                                    onChange={e => setNewEvent({ ...newEvent, start: e.target.value })}
                                    className={Styles.enterpriseCreateShiftAvailabilityFromInput}
                                    style={{ marginRight: '10px' }}
                                    />
                                     </div>
                                     To 
                                     <div className={Styles.enterpriseCreateShiftAvailabilityFromCard}>
                                     <input
                                    type="date"
                                    placeholder="End"
                                    value={newEvent.end}
                                    onChange={e => setNewEvent({ ...newEvent, end: e.target.value })}
                                    style={{ marginRight: '10px' }}
                                    className={Styles.enterpriseCreateShiftAvailabilityFromInput}
                                    />
                                     </div>
                                    
                                    
                                    {/* <button className={Styles.enterpriseCreateShiftAvailabilityPasteSlot}>
                                    Paste time slots
                                    </button>
                                    <button className={Styles.enterpriseCreateShiftAvailabilityCopySlot}>
                                    Copy time slots
                                    </button> */}
                                   
                                </div>
                                <div>
                                    {rows.map((row, index) => (
                                    <div
                                        key={index}
                                        className={Styles.enterpriseCreateShiftAvailabilityAddrowCard}
                                    >
                                        <Form className={Styles.enterpriseCreateShiftAvailabilityFromCard}>
                                        <Form.Control
                                            className={Styles.enterpriseCreateShiftAvailabilityFromInput}
                                            type="text"
                                            placeholder="From HH:MM"
                                            value={row.from}
                                            onChange={(e) =>
                                            handleChange(index, "from", e.target.value)
                                            }
                                        />
                                        <FontAwesomeIcon
                                            className={Styles.enterpriseCreateShiftAvailabilityEnableClock}
                                            icon={faClock}
                                            style={{
                                            color:
                                                index === rows.length - 1
                                                ? "#FF0058"
                                                : "#ccc",
                                            }} // Apply color only to the last row
                                        />
                                        </Form>

                                        <Form className={Styles.enterpriseCreateShiftAvailabilityFromCard}>
                                        <Form.Control
                                            className={Styles.enterpriseCreateShiftAvailabilityFromInput}
                                            type="text"
                                            placeholder="To HH:MM"
                                            value={row.to}
                                            onChange={(e) =>
                                            handleChange(index, "to", e.target.value)
                                            }
                                        />
                                        <FontAwesomeIcon
                                            className={Styles.enterpriseCreateShiftAvailabilityEnableClock}
                                            icon={faClock}
                                            style={{
                                            color:
                                                index === rows.length - 1
                                                ? "#FF0058"
                                                : "#ccc",
                                            }} // Apply color only to the last row
                                        />
                                        </Form>

                                        {/* Render the delete button only if it's not the last row */}
                                        {index !== rows.length - 1 && (
                                        <button
                                            className={Styles.enterpriseCreateShiftAvailabilityDeleteBtn}
                                            onClick={() => handleDeleteRow(index)}
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                        )}

                                        {/* Render the "+" button only for the last row */}
                                        {index === rows.length - 1 && (
                                        <button
                                            className={Styles.enterpriseCreateShiftAvailabilityPlusBtn}
                                            onClick={handleAddRow}
                                        >
                                            <FontAwesomeIcon icon={faPlus} />
                                        </button>
                                        )}
                                    </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={Styles.enterpriseSelectServiceNextBtnCard}>
                    <div
                    onClick={continueHanger}
                    className={Styles.enterpriseSelectServiceNextBtn}
                    style={{ cursor: "pointer" }}
                    >
                    Finish
                    </div>
                </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default SetNewSchedule;
