import React, { useEffect, useState } from "react";
import Calendar from "react-awesome-calendar";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Flip } from "react-toastify";

const CalendarApp = () => {
  const [modal, setModal] = useState(false);
  const [modalTow, setModalTow] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [title, setTitle] = useState("");
  const [dateDebut, setDateDebut] = useState(new Date());
  const [heureDebut, setHeureDebut] = useState("");
  const [heureFin, setHeureFin] = useState("");
  const [eventToday, setEventToday] = useState([]);
  const [eventId, setEventId] = useState("");
  const [events, setEvents] = useState([]);

  useEffect(async () => {
    const res = await axios.get("http://localhost:8000/api/events");
    if (res.data.status === 200) {
      setEvents(res.data.events);
    }
  }, []);

  const getEventToday = async (e) => {
    var month = parseInt(e.month) + 1;
    var month = month.toString();
    if (month.length == 1) {
      var month = "0" + month;
    }
    var day = parseInt(e.day);
    var day = day.toString();
    if (day.length == 1) {
      var day = "0" + day;
    }
    var date = e.year + "-" + month + "-" + day;
    const res = await axios.get(`http://localhost:8000/api/get-event/${date}`);
    console.log(`res.data`, res.data);
    if (res.data.status === 200) {
      setEventToday(res.data.events);
    }
    setModal(true);
    setDay(day);
    setMonth(month);
    setYear(parseInt(e.year));
  };

  const openModal = () => {
    setModal(!modal);
  };

  const openModalTow = () => {
    setModal(false);
    setModalTow(!modalTow);
  };

  const suppEvent = (id) => {
    setModal(false);
    setModalDelete(!modalDelete);
    setEventId(id);
  };

  const openModalDelete = () => {
    setModalDelete(!modalDelete);
  };

  const ajoutEvent = async () => {
    //  date debut
    let dateD = dateDebut;
    let month = "" + (dateD.getMonth() + 1);
    let day = "" + dateD.getDate();
    let year = dateD.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    var date = [year, month, day].join("-");
    // heure Debut
    var heureD = heureDebut.toTimeString();
    heureD = heureD.split(" ")[0];
    // heure Fin
    var heureF = heureFin.toTimeString();
    heureF = heureF.split(" ")[0];
    //
    const res = await axios.post("http://localhost:8000/api/add-event", {
      title,
      date,
      heureD,
      heureF,
    });
    if (res.data.status === 200) {
      toast.success("✅ Event Added Successfuly", { containerId: "A" });
      setModalTow(false);
    }
  };

  const deleteEvent = async () => {
    var id = eventId;
    const res = await axios.delete(
      `http://localhost:8000/api/delete-event/${id}`
    );
    if (res.data.status === 200) {
      toast.success("✅ Event Deleted Successfuly", { containerId: "A" });
      setModalDelete(false);
    }
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row bg-title">
          <div className="col-lg-12">
            <h4
              style={{
                marginTop: "3%",
                color: "#ff3e52",
                fontWeight: "bold",
                fontSize: "40px",
              }}
              className="page-title"
            >
              Calendar App
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="white-box">
              <div className="row">
                <Calendar
                  events={events}
                  onClickTimeLine={(e) => getEventToday(e)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        size="lg"
        style={{ maxWidth: "700px", width: "100%" }}
        isOpen={modal}
        toggle={(e) => openModal(e)}
        fade={false}
      >
        <ModalHeader toggle={(e) => openModal(e)}>
          <h3
            style={{ textAlign: "center", color: "brown", fontWeight: "bold" }}
          >
            Date : {year}-{month}-{day}
          </h3>
        </ModalHeader>
        <ModalBody>
          <div
            style={{
              fontFamily: "Montserrat, sans-serif",
              FontSize: "14px",
              FontWeight: "700",
              LineHeight: "18.375px",
              width: "100%",
            }}
          >
            <div>
              <table style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th
                      style={{
                        textAlign: "center",
                        border: "solid",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      Event
                    </th>
                    <th
                      style={{
                        textAlign: "center",
                        border: "solid",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      Heure Debut
                    </th>
                    <th
                      style={{
                        textAlign: "center",
                        border: "solid",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      Heure Fin
                    </th>
                    <th
                      style={{
                        textAlign: "center",
                        border: "solid",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      {" "}
                      Supp{" "}
                    </th>
                  </tr>
                </thead>
                {eventToday.length > 0
                  ? eventToday.map((el) => (
                      <tbody>
                        <tr>
                          <td
                            style={{
                              textAlign: "center",
                              border: "solid",
                              color: "black",
                            }}
                          >
                            {el.title}
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              border: "solid",
                              color: "black",
                            }}
                          >
                            {el.heureDebut}
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              border: "solid",
                              color: "black",
                            }}
                          >
                            {el.heureFin}
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              border: "solid",
                              color: "black",
                            }}
                          >
                            <button
                              style={{
                                backgroundColor: "#D9534F",
                                borderRadius: "5px",
                              }}
                              onClick={() => suppEvent(el.id)}
                            >
                              <i
                                style={{ color: "white" }}
                                className="fas fa-trash-alt"
                              ></i>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    ))
                  : null}
              </table>
            </div>
            <div
              style={{
                textAlign: "center",
                marginBottom: "10px",
                marginTop: "5%",
              }}
            >
              <button
                style={{ borderRadius: "5px" }}
                type="button"
                className="btn btn-success"
                onClick={() => openModalTow()}
              >
                Ajout Event
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>
      <Modal isOpen={modalTow} toggle={() => openModalTow()} fade={false}>
        <ModalHeader toggle={() => openModalTow()}>
          {" "}
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "465px",
            }}
          >
            <p
              style={{
                textAlign: "center",
                color: "brown",
                fontWeight: "bold",
              }}
            >
              {" "}
              Ajout Event{" "}
            </p>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Title Event</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="event"
                  onChange={(e) => setTitle(e.target.value)}
                  style={{
                    borderRadius: "5px",
                    border: "solid 1px #B3B3B3",
                  }}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div style={{ width: "100%" }} className="form-group">
                <label>Date</label>
                <CalendarContainer style={{ width: "100%" }} />
                <DatePicker
                  class="form-control ddate"
                  style={{ border: "none" }}
                  value={dateDebut}
                  selected={dateDebut}
                  onChange={(d) => setDateDebut(d)}
                  dateFormat="yyyy/MM/dd"
                  width={"500px"}
                />
              </div>
            </div>
          </div>
          <div style={{ marginTop: "3%" }} className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Heure Début</label>
                <DatePicker
                  class="form-control ddate"
                  style={{ border: "none" }}
                  selected={heureDebut}
                  onChange={(e) => setHeureDebut(e)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Heure Fin</label>
                <DatePicker
                  class="form-control ddate"
                  style={{ border: "none" }}
                  selected={heureFin}
                  onChange={(d) => setHeureFin(d)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                />
              </div>
            </div>
          </div>
          <div
            style={{
              textAlign: "center",
              marginBottom: "10px",
              marginTop: "5%",
            }}
          >
            <button
              style={{ borderRadius: "5px" }}
              type="button"
              className="btn btn-success"
              onClick={() => ajoutEvent()}
            >
              Confirmer
            </button>
          </div>
        </ModalBody>
      </Modal>
      <Modal isOpen={modalDelete} toggle={() => openModalDelete()} fade={false}>
        <ModalHeader toggle={() => openModalDelete()}>
          {" "}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "465px",
            }}
          >
            <img width="30%" src="./images/deleteModal.png" alt=".." />
          </div>
        </ModalHeader>
        <ModalBody>
          <div
            style={{
              fontFamily: "Montserrat, sans-serif",
              FontSize: "14px",
              FontWeight: "700",
              LineHeight: "18.375px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <p>Êtes-Vous sûr de vouloir supprimer cet event ?</p>
            </div>
            <div
              className="hvr-push"
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginBottom: "15px",
              }}
            >
              <div>
                <button
                  onClick={() => deleteEvent()}
                  style={{
                    backgroundColor: "#00FF7F",
                    borderRadius: "5px",
                    color: "white",
                  }}
                >
                  <i
                    style={{ color: "white" }}
                    className="far fa-thumbs-up"
                  ></i>
                  Oui
                </button>
              </div>
              <div>
                <button
                  onClick={() => openModalDelete()}
                  style={{
                    backgroundColor: "#D9534F",
                    borderRadius: "5px",
                    color: "white",
                  }}
                >
                  <i
                    style={{ color: "white" }}
                    className="far fa-thumbs-down"
                  ></i>
                  Non
                </button>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
      <ToastContainer
        transition={Flip}
        enableMultiContainer
        containerId={"A"}
        position={toast.POSITION.TOP_RIGHT}
        autoClose={2500}
      />
    </div>
  );
};

export default CalendarApp;
