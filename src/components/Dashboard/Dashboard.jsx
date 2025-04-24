import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from 'react';
import './Dashboard.css';
import Calendar from 'react-calendar';

const data = [
  { day: "Mon", timeSpent: 4 },
  { day: "Tue", timeSpent: 6 },
  { day: "Wed", timeSpent: 7 },
  { day: "Thur", timeSpent: 8 },
  { day: "Fri", timeSpent: 5 },
  { day: "Sat", timeSpent: 4 },
  { day: "Sun", timeSpent: 6 },
];

const taskdata = [
  { title: "Web development", progress: 90, daysLeft: 3 },
  { title: "Mobile App", progress: 30, daysLeft: 25 },
  { title: "Animation", progress: 75, daysLeft: 7 }
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

  const handleAddSchedule = (e) => {
    e.preventDefault();
    if (startTime && endTime && task) {
      const newScheduleItem = { startTime, endTime, task, id: Math.random() };
      setSchedule((prev) => [...prev, newScheduleItem]);
      setStartTime('');
      setEndTime('');
      setTask('');
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h1 className="logo">Taskify</h1>
        <nav className="nav-links">
          <div className="top">
            <a href=""><img src="/src/assets/dashboard.png" alt="" /> Dashboard</a>
            <a href=""><img src="/src/assets/track.png" alt="" /> Track</a>
            <a href=""><img src="/src/assets/projects.png" alt="" /> Projects</a>
            <a href=""><img src="/src/assets/reports.png" alt="" /> Reports</a>
          </div>
          <div className="bottom">
            <a href=""><img src="/src/assets/support.png" alt="" /> Support</a>
            <a href=""><img src="/src/assets/settings.png" alt="" /> Settings</a>
          </div>
        </nav>
      </aside>

      <main className="main-content">
        <div className="header">
          <div className="greet">
            <p>Hi, <span>Kim Namjoon</span></p>
            <h3>Let's finish your task today</h3>
          </div>
          <div className="notification">
            <img src="/src/assets/notification.png" alt="" />
          </div>
        </div>

        <div className="card header-card">
          <div className="left-content">
            <h2>Today's Task</h2>
            <p>Check your daily tasks and schedules</p>
            <button className="btn">Today’s Schedule</button>
          </div>
          <img className="time-mgment" src="/src/assets/imag1.jpg" alt="Task" />
        </div>

        <div className="task-cards">
          {taskdata.map((task, index) => (
            <div className="card" key={index}>
              <h3>{task.title}</h3>
              <div className="progress-container">
                <div
                  className="progress-bar"
                  style={{
                    width: `${task.progress}%`,
                    backgroundColor:
                      task.progress > 70 ? '#c627d4' :
                      task.progress > 40 ? '#f17de0' :
                      '#f44336'
                  }}
                ></div>
              </div>
              <p className="progress-text">Progress: {task.progress}%</p>
              <p className="days-left">Days Left: {task.daysLeft}</p>
            </div>
          ))}
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
        <div className="card assignments">
          
        </div>
      </main>

      <aside className="right-sidebar">
        <div className="card profile-card">
          <div className="profile">
            <div className="avatar"><img src="/src/assets/avator.jpg" alt="" /></div>
            <div className="name_role">
              <h3>Kim Namjoon</h3>
              <p>UI/UX Designer</p>
            </div>
          </div>

          <div className="calendar">
            <h4>Mark the date</h4>
            <div className="calendar-wrapper">
              <Calendar onChange={handleDateChange} value={date} view="month" tileClassName="single-tile" />
            </div>
          </div>
        </div>

        <div className="schedule">
          <h4>Schedule</h4>
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

          <div className="schedule-list">
            {schedule.length === 0 ? (
              <p>No activities scheduled yet.</p>
            ) : (
              schedule.map((item) => (
                <div key={item.id} className="schedule-item">
                  <p>{item.startTime} - {item.endTime} : {item.task}</p>
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
