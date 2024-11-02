import React, { useState, useEffect } from 'react';
import { getSummary } from '../services/task';
import Loader from './Loader';
import '../styles/Analytics.css'; 

const Analytics = () => {
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      try {
        const response = await getSummary();
        console.log(response);
        setAnalytics(response);
      } catch (error) {
        console.error("Failed to fetch analytics summary:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  const statusData = [
    { label: 'Backlog Tasks', key: 'backlog' },
    { label: 'To-do Tasks', key: 'to do' },
    { label: 'In-Progress Tasks', key: 'in progress' },
    { label: 'Completed Tasks', key: 'completed' },
  ];

  const priorityData = [
    { label: 'Low Priority', key: 'low' },
    { label: 'Moderate Priority', key: 'moderate' },
    { label: 'High Priority', key: 'high' },
    { label: 'Due Date Tasks', key: 'totalDueDateTasks' },
  ];

  return (
    <div className="analytics-container">
      {loading && <Loader />}
      <h1 className="analytics-title">Analytics</h1>
      {analytics && analytics.statusCounts && (
        <div className="analytics-content">
          <div className="analytics-section">
            {statusData.map(({ label, key }) => (
              <div className="analytics-text-container" key={key}>
                <div className="analytics-label">
                  <div className="analytics-dot" />
                  {label}
                </div>
                <div>{analytics.statusCounts[key] || 0}</div>
              </div>
            ))}
          </div>

          <div className="analytics-section">
            {priorityData.map(({ label, key }) => (
              <div className="analytics-text-container" key={key}>
                <div className="analytics-label">
                  <div className="analytics-dot" />
                  {label}
                </div>
                <div>{key === 'totalDueDateTasks' ? analytics.totalDueDateTasks || 0 : analytics.priorityCounts[key] || 0}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
