const Day = ({ day, activeDay, setActiveDay }) => {
  return (
    <p
      className={`${
        activeDay === day ? "calendar__active-day" : "calendar__day-number"
      }`}
      onClick={() => setActiveDay(day)}
    >
      {day}
    </p>
  );
};

export default Day;
