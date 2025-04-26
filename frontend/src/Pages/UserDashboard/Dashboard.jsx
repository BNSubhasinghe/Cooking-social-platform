import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
import axios from "axios";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const fetchNotifications = async () => {
    if (!user || !user.id) return;
    try {
      const response = await axios.get(
        `http://localhost:8080/api/notifications?userId=${user.id}`
      );
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const fetchUnreadCount = async () => {
    if (!user || !user.id) return;
    try {
      const response = await axios.get(
        `http://localhost:8080/api/notifications/unread?userId=${user.id}`
      );
      setUnreadCount(response.data.length);
    } catch (error) {
      console.error("Error fetching unread count:", error);
    }
  };

  useEffect(() => {
    if (user && user.id) {
      fetchNotifications();
      fetchUnreadCount();
      const intervalId = setInterval(() => {
        fetchNotifications();
        fetchUnreadCount();
      }, 10000);
      return () => clearInterval(intervalId);
    }
  }, [user]);

  const markAsRead = async (notificationId) => {
    try {
      await axios.put(
        `http://localhost:8080/api/notifications/${notificationId}/read`
      );
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === notificationId ? { ...notif, read: true } : notif
        )
      );
      setUnreadCount((prev) => prev - 1);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter((notif) => !notif.read);
      await Promise.all(
        unreadNotifications.map((notif) =>
          axios.put(`http://localhost:8080/api/notifications/${notif.id}/read`)
        )
      );
      setNotifications((prev) =>
        prev.map((notif) => ({ ...notif, read: true }))
      );
      setUnreadCount(0);
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const capitalizeName = (name) => {
    return name
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(" ");
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div className="profile-area">
          <div className="avatar-container">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Profile"
              className="profile-icon"
            />
          </div>
          <span className="username">
            {user ? `Welcome, ${capitalizeName(user.name)}` : "Loading..."}
          </span>
        </div>

        <div className="action-buttons">
          <div className="notification-wrapper">
            <button
              className="notification-button"
              onClick={toggleNotifications}
            >
              <Bell className="notification-icon" />
              {unreadCount > 0 && (
                <span className="notification-badge">{unreadCount}</span>
              )}
            </button>
            {showNotifications && (
              <div className="notification-dropdown">
                <div className="notification-header">
                  <h3>Notifications</h3>
                  {unreadCount > 0 && (
                    <button className="mark-all-read" onClick={markAllAsRead}>
                      Mark all as read
                    </button>
                  )}
                </div>
                <div className="notification-list">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`notification-item ${
                          notification.read ? "read" : "unread"
                        }`}
                        onClick={() =>
                          !notification.read && markAsRead(notification.id)
                        }
                      >
                        <p>{notification.message}</p>
                        <span className="notification-time">
                          {new Date(notification.createdAt).toLocaleString()}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="no-notifications">No notifications</p>
                  )}
                </div>
              </div>
            )}
          </div>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        <h2 className="dashboard-title">Your Health Dashboard</h2>

        <div className="dashboard-grid">
          <div
            className="card food-logging"
            onClick={() => navigate("/food-logging")}
          >
            <div className="card-icon">🍽️</div>
            <div className="card-content">
              <h3>Food Logging</h3>
              <p>Log your meals and track your daily calorie intake.</p>
            </div>
          </div>

          <div
            className="card water-tracking"
            onClick={() => navigate("/water-tracking")}
          >
            <div className="card-icon">💧</div>
            <div className="card-content">
              <h3>Water Tracking</h3>
              <p>Track your daily water intake with a progress bar.</p>
            </div>
          </div>

          <div
            className="card fitness-logging"
            onClick={() => navigate("/fitness-logging")}
          >
            <div className="card-icon">🏃</div>
            <div className="card-content">
              <h3>Fitness Logging</h3>
              <p>Log activities like running or weightlifting.</p>
            </div>
          </div>

          <div
            className="card goal-tracking"
            onClick={() => navigate("/goal-tracking")}
          >
            <div className="card-icon">🎯</div>
            <div className="card-content">
              <h3>Goal Tracking</h3>
              <p>Monitor your daily calorie and water goals.</p>
            </div>
          </div>

          <div
            className="card progress-summary"
            onClick={() => navigate("/progress-summary")}
          >
            <div className="card-icon">📊</div>
            <div className="card-content">
              <h3>Progress Summary</h3>
              <p>View your weekly calorie and water summaries.</p>
            </div>
          </div>

          <div
            className="card profile"
            onClick={() => navigate(`/profile/${user?.id}`)}
          >
            <div className="card-icon">👤</div>
            <div className="card-content">
              <h3>Profile</h3>
              <p>View and update your health goals and preferences.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
