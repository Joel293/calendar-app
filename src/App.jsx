import { useState } from "react";
import Calendar from "./components/Calendar";

function App() {
  const [activeEvent, setActiveEvent] = useState(null);

  return (
    <div className="background" onClick={() => setActiveEvent(null)}>
      <Calendar activeEvent={activeEvent} setActiveEvent={setActiveEvent} />
    </div>
  );
}

export default App;
