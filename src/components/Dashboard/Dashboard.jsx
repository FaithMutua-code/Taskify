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
  { title: "Web Dashboard", progress: 90, daysLeft: 3 },
  { title: "Mobile App", progress: 30, daysLeft: 15 },
  { title: "Animation", progress: 75, daysLeft: 7 }
];

const assignmentdata = [
  { title: "Colour Theory", dueDate: "05/10/2024", score: "86/100" },
  { title: "Design System", dueDate: "06/10/2024", score: "90/100" },
  { title: "Prototyping", dueDate: "10/10/2024", score: "80/100" }
];

const batchmates = [
  { name: "Rinsen Jey", role: "UX Designer" },
  { name: "Kim Jee yong", role: "UI Designer" },
  { name: "Kim Beo yong", role: "UX/UI Designer" }
];

const Dashboard = () => {
  const [date, setDate] = useState(new Date());
  const [schedule, setSchedule] = useState([
    { time: "10:00am - 12:00pm", task: "UI Motion" },
    { time: "12:00pm - 02:00pm", task: "UI Design" }
  ]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [newTask, setNewTask] = useState({ task: '', time: '' });
  const [editIndex, setEditIndex] = useState(null); // State to track the task to edit

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleEditTask = (index) => {
    const taskToEdit = schedule[index];
    setNewTask({ task: taskToEdit.task, time: taskToEdit.time });
    setEditIndex(index); // Set the index of the task to edit
    setShowTaskForm(true); // Show the task form
  };

  const handleDeleteTask = (index) => {
    setSchedule((prevSchedule) => prevSchedule.filter((_, i) => i !== index)); // Remove the task at the specified index
  };

  const handleAddOrUpdateTask = () => {
    if (newTask.task && newTask.time) {
      if (editIndex !== null) {
        // If editIndex is not null, update the task
        setSchedule(prevSchedule => 
          prevSchedule.map((item, index) => 
            index === editIndex ? { ...item, ...newTask } : item
          )
        );
      } else {
        // If editIndex is null, it's a new task, add it to the list
        setSchedule(prev => [...prev, newTask]);
      }
      setNewTask({ task: '', time: '' });
      setShowTaskForm(false);
      setEditIndex(null); // Reset editIndex after adding/updating
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h1 className="logo">Taskify</h1>
        <nav className="nav-links">
          <div className="top">
            <a href="#"><img src="/src/assets/dashboard.png" alt="" /> Dashboard</a>
            <a href="#"><img src="/src/assets/track.png" alt="" /> Track</a>
            <a href="#"><img src="/src/assets/projects.png" alt="" /> Projects</a>
            <a href="#"><img src="/src/assets/reports.png" alt="" /> Reports</a>
          </div>
          <div className="bottom">
            <a href="#"><img src="/src/assets/support.png" alt="" /> Support</a>
            <a href="#"><img src="/src/assets/settings.png" alt="" /> Settings</a>
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
              <p className="days-left">{task.daysLeft} days left</p>
            </div>
          ))}
        </div>

        <div className="chart-assignments-section">
          <div className="card chart-card">
            <h3>Tasks Progress</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="timeSpent" fill="#6a0dad" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="card assignments-card">
            <h3>Assignments (12)</h3>
            <p className="completed">2/5 completed</p>
            <div className="assignment-list">
              {assignmentdata.map((item, index) => (
                <div className="assignment-item" key={index}>
                  <div className="details">
                    <h4>{item.title}</h4>
                    <p>Due: {item.dueDate}</p>
                  </div>
                  <div className="score">{item.score}</div>
                </div>
              ))}
            </div>
          </div>
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

          <div className="calendar-header">
            <h4>{date.toLocaleString('default', { month: 'long' })}</h4>
            <button 
              className="add-task-btn" 
              onClick={() => setShowTaskForm(prev => !prev)}
            >
              + Add Task
            </button>
          </div>

          {showTaskForm && (
            <div className="add-task-form">
              <input
                type="text"
                placeholder="Task name"
                value={newTask.task}
                onChange={(e) => setNewTask({ ...newTask, task: e.target.value })}
              />
              <input
                type="text"
                placeholder="Time range (e.g. 2:00pm - 4:00pm)"
                value={newTask.time}
                onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
              />
              <button onClick={handleAddOrUpdateTask}>
                {editIndex !== null ? 'Update' : 'Add'} Task
              </button>
            </div>
          )}

          <div className="calendar-wrapper">
            <Calendar
              onChange={handleDateChange}
              value={date}
              view="month"
              tileClassName="single-tile"
            />
          </div>

          <div className="schedule-list">
            <h4>Schedule</h4>
            {schedule.length === 0 ? (
              <p>No activities scheduled yet.</p>
            ) : (
              schedule.map((item, index) => (
                <div key={index} className="schedule-item">
                  <p>{item.task}</p>
                  <small>{item.time}</small>
                  <div className="task-actions">
                    <button onClick={() => handleEditTask(index)}>Edit</button>
                    <button onClick={() => handleDeleteTask(index)}>Delete</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="card batchmates-card">
          <h4>Batchmates</h4>
          <div className="batchmate-list">
            {batchmates.map((mate, index) => (
              <div key={index} className="batchmate">
                <img src="/src/assets/avator.jpg" alt="" className="batchmate-avatar" />
                <div>
                  <p>{mate.name}</p>
                  <small>{mate.role}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Dashboard;
