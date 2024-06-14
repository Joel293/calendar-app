const Event = ({
  id,
  title,
  day,
  month,
  year,
  hours,
  minutes,
  activeEvent,
  setActiveEvent,
}) => {
  const handleSetActiveEvent = () => {
    if (id !== activeEvent) {
      setActiveEvent(id);
    } else {
      setActiveEvent(null);
    }
  };

  return (
    <div
      className={`event ${activeEvent === id ? "event--active" : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        handleSetActiveEvent();
      }}
    >
      <div className="event__cont-title">
        <p className="event__title">{title}</p>
      </div>
      <div className="event__schedule">
        <p className="event__date">{`${day}/${month}/${year}`}</p>
        <p className="event__date">{`${hours}:${minutes}`}</p>
      </div>
    </div>
  );
};

export default Event;
