import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from 'react';
import './Dashboard.css';
import Calendar from 'react-calendar';  // Correct import for Calendar component

const data = [
  { day: "Mon", timeSpent: 4 },
  { day: "Tue", timeSpent: 6 },
  { day: "Wed", timeSpent: 7 },
  { day: "Thur", timeSpent: 8 },
  { day: "Fri", timeSpent: 5 },
  { day: "Sat", timeSpent: 4 },
  { day: "Sun", timeSpent: 6 },
];

const Dashboard = () => {
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [task, setTask] = useState('');
  const [schedule, setSchedule] = useState([]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    const formattedDate = newDate.toLocaleDateString();
    console.log('Selected date:', formattedDate);
  };

  // Handle form submission to add schedule item
  const handleAddSchedule = (e) => {
    e.preventDefault();

    // Add the new schedule item to the list
    if (startTime && endTime && task) {
      const newScheduleItem = { startTime, endTime, task, id: Math.random() }; // Random ID for each activity
      setSchedule((prevSchedule) => [...prevSchedule, newScheduleItem]); // Update schedule state
      setStartTime(''); // Reset start time input
      setEndTime(''); // Reset end time input
      setTask(''); // Reset task input
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h1 className="logo">Taskify</h1>
          <nav className="nav-links">
            <a href="">
              <img src="/src/assets/dashboard.png" alt="" /> Dashboard
            </a>
            <a href="">
              <img src="/src/assets/track.png" alt="" /> Track
            </a>
            <a href="">
              <img src="/src/assets/projects.png" alt="" /> Projects
            </a>
            <a href="">
              <img src="/src/assets/reports.png" alt="" /> Reports
            </a>
          </nav>
      
      </aside>

      <main className="main-content">
      <div className="card header-card">
  <div className="left-content">
    <h2>Today's Task</h2>
    <p>Check your daily tasks and schedules</p>
    <button className="btn">Today’s Schedule</button>
  </div>
  <img className="time-mgment" src="/src/assets/imag1.jpg" alt="Task" />
</div>


        <div className="task-cards">
          <div className="card">
            <h3>Web Dashboard</h3>
            <p>Progress: 90%</p>
            <p className="small">3 days left</p>
          </div>
          <div className="card">
            <h3>Mobile App</h3>
            <p>Progress: 30%</p>
            <p className="small">25 days left</p>
          </div>
          <div className="card">
            <h3>Animation</h3>
            <p>Progress: 75%</p>
            <p className="small">7 days left</p>
          </div>
          <div className="card">
            <h3>Mobile App</h3>
            <p>Progress: 30%</p>
            <p className="small">25 days left</p>
          </div>
          <div className="card">
            <h3>Animation</h3>
            <p>Progress: 75%</p>
            <p className="small">7 days left</p>
          </div>
        </div>

        <div className="card chart-card">
          <h3>Tasks Progress</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="timeSpent" fill="#6a0dad" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>

      <aside className="right-sidebar">
        <div className="card profile-card">
          <div className="profile"></div>
          <h3>Kim Namjoon</h3>
          <p className="small">UI/UX Designer</p>
          <div className="avatar">KN</div>
          <div className="calendar">
            <h4>Mark the date</h4>
            <div className="calendar-wrapper">
              <Calendar onChange={handleDateChange} value={date} view="month"   tileClassName="single-tile" />
            </div>
          </div>
        </div>

        <div className="schedule">
          <h4>Schedule</h4>

          {/* Schedule Form */}
          <form onSubmit={handleAddSchedule}>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
              placeholder="Start time"
            />
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
              placeholder="End time"
            />
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              required
              placeholder="Enter Task"
            />
            <button type="submit">Add Task</button>
          </form>

          {/* Displaying added schedule */}
          <div className="schedule-list">
            {schedule.length === 0 ? (
              <p>No activities scheduled yet.</p>
            ) : (
              schedule.map((item) => (
                <div key={item.id} className="schedule-item">
                  <p>
                    {item.startTime} - {item.endTime} : {item.task}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Dashboard;
