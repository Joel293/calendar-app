import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TextareaAutosize from "react-textarea-autosize";
import Day from "./Day";
import Event from "./Event";
import PastDay from "./PastDay";

const Calendar = ({ activeEvent, setActiveEvent }) => {
  const [date, setDate] = useState(new Date());

  const [days, setDays] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()
  );
  const [pastDays, setPastDays] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDate()
  );
  const [pastDaysArr, setPastDaysArr] = useState([]);
  const [UTCDays, setUTCDays] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth()).getUTCDay()
  );
  const [nextDays, setNextDays] = useState(42 - (UTCDays + days));

  const [months, setMonths] = useState([
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]);

  const [events, setEvents] = useState([]);

  const [text, setText] = useState(
    `${months[date.getMonth()]} ${date.getFullYear()}`
  );
  const [activeDay, setActiveDay] = useState(date.getDate());
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [activeAdd, setActiveAdd] = useState(false);
  const [event, setEvent] = useState("");

  useEffect(() => {
    setText(`${months[date.getMonth()]} ${date.getFullYear()}`);
    setNextDays(42 - (UTCDays + days));
    handleSetPastDaysArr();
  }, [date]);

  const handleSwitchMonth = (direction) => {
    let mon = date.getMonth();
    let year = date.getFullYear();

    switch (direction) {
      case "right":
        if (mon < 11) {
          mon += 1;
        } else {
          mon = 0;
          year += 1;
        }
        break;

      case "left":
        if (mon === 0) {
          mon = 11;
          year -= 1;
        } else {
          mon -= 1;
        }
        break;

      default:
        break;
    }

    handleSetDate(mon, year);
  };

  const handleSetDate = (month, year) => {
    const newDate = new Date(year, month, date.getDate());
    setPastDays(new Date(date.getFullYear(), month, 0).getDate());

    setDays(new Date(year, month + 1, 0).getDate()); //devuelve los dias de cada mes
    setUTCDays(new Date(year, month).getUTCDay()); //devuelve los dias pasados de cada mes
    setDate(newDate);
  };

  const handleSetPastDaysArr = () => {
    let arr = [...Array(pastDays + 1).keys()],
      newArr = [];

    for (let i = UTCDays - 1; i >= 0; i--) {
      newArr.push(arr[pastDays - i]);
    }
    setPastDaysArr(newArr);
  };

  const handleSetEventText = (e) => {
    setEvent(e.target.value);
  };

  const handleAddEvent = () => {
    const newEvent = {
      id: uuidv4(),
      title: event,
      day: activeDay,
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      hours,
      minutes,
    };
    setEvents([...events, newEvent]);
    setHours("00");
    setMinutes("00");
    setEvent("");
    setActiveAdd(false);
  };

  const handleDeleteEvent = () => {
    if (!activeEvent) return;

    const updatedEvents = events.filter((event) => event.id !== activeEvent);
    setEvents(updatedEvents);
    setActiveEvent(null);
  };

  return (
    <div className="calendar">
      <div className="calendar__month">
        <p className="calendar__month-text">{text}</p>

        <div className="calendar__chev-cont">
          <div
            className="calendar__chevron-icon calendar__chevron-left"
            onClick={() => handleSwitchMonth("left")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </div>
          <div
            className="calendar__chevron-icon calendar__chevron-right"
            onClick={() => handleSwitchMonth("right")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="calendar__days">
        <div className="calendar__grid">
          <p className="calendar__day-text">Su</p>
          <p className="calendar__day-text">Mo</p>
          <p className="calendar__day-text">Tu</p>
          <p className="calendar__day-text">We</p>
          <p className="calendar__day-text">Th</p>
          <p className="calendar__day-text">Fr</p>
          <p className="calendar__day-text">Sa</p>

          {pastDaysArr.map((element, i) => (
            <PastDay key={i + 1} day={element} />
          ))}

          {[...Array(days)].map((element, i) => {
            return (
              <Day
                key={i + 1}
                day={i + 1}
                activeDay={activeDay}
                setActiveDay={setActiveDay}
              />
            );
          })}

          {[...Array(nextDays)].map((element, i) => (
            <PastDay key={i + 1} day={i + 1} />
          ))}
        </div>
      </div>

      <div className="calendar__to-do">
        <div className="calendar__actions">
          {activeEvent && (
            <div
              className="calendar__plus-icon"
              title="Delete event"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteEvent();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </div>
          )}

          {!activeAdd ? (
            <div
              className="calendar__plus-icon"
              title="New event"
              onClick={() => setActiveAdd(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </div>
          ) : (
            <>
              <div
                className={`${
                  event.length > 2
                    ? "calendar__check-icon"
                    : "calendar__check-icon--disabled"
                }`}
                title="Add event"
                onClick={() => {
                  if (event.length <= 2) return;
                  handleAddEvent();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>

              <div
                className="calendar__x-mark-icon"
                title="Discard"
                onClick={() => setActiveAdd(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </>
          )}
        </div>

        {activeAdd && (
          <>
            <div className="calendar__event">
              <div>
                <p className="calendar__event-day">
                  <span>Day: </span>
                  <span>{activeDay}</span>
                </p>

                <p className="calendar__event-day">
                  <span>Mon: </span>
                  <span>{months[date.getMonth()].slice(0, 3)}</span>
                </p>

                <p className="calendar__event-day">
                  <span>Y: </span>
                  <span>{date.getFullYear()}</span>
                </p>

                <div className="calendar__event-cont">
                  <p className="calendar__event-day">
                    <span>Time: </span>
                  </p>
                  <div className="calendar__event-time">
                    <select
                      className="calendar__event-select"
                      onChange={(e) => {
                        setHours(e.target.value);
                      }}
                    >
                      {[...Array(24)].map((elem, i) => {
                        let value = i.toString().length < 2 ? `0${i}` : i;
                        return (
                          <option value={value} key={value}>
                            {value}
                          </option>
                        );
                      })}
                    </select>
                    <p>:</p>
                    <select
                      className="calendar__event-select"
                      onChange={(e) => {
                        setMinutes(e.target.value);
                      }}
                    >
                      {[...Array(60)].map((elem, i) => {
                        let value = i.toString().length < 2 ? `0${i}` : i;
                        return (
                          <option value={value} key={value}>
                            {value}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <TextareaAutosize
              className="calendar__textarea"
              placeholder="Your new event goes here!"
              onChange={handleSetEventText}
            />
          </>
        )}
      </div>

      <div className="events">
        {events.map((event) => (
          <Event
            key={event.id}
            activeEvent={activeEvent}
            setActiveEvent={setActiveEvent}
            {...event}
          />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
