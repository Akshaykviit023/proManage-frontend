import React, { useState, useEffect } from 'react';
import { getSummary } from '../services/task';
import Loader from './Loader';

const Analytics = () => {
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(true); 

  const style = {
    analyticsContainer: {
      backgroundColor: '#F9FCFF',
      width: '475px',
      borderRadius: '12px',
      fontSize: '18px',
      fontWeight: 400,
      marginTop: '2rem',
    },
    dot: {
      width: '12px',
      height: '12px',
      borderRadius: '999px',
      backgroundColor: '#90C4CC',
    },
    textContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '2rem',
    },
  };

  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true); 
      try {
        
        const response = await getSummary();
        console.log(response);
        setAnalytics(response);
      } catch (error) {
        console.error("Failed to fetch analytics summary:", error);
      }
      finally {
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
    <div style={{ padding: '1rem 2.5rem' }}>
      {loading && <Loader />}
      <h1 style={{ fontSize: '22px', fontWeight: 600 }}>Analytics</h1>
      {analytics && analytics.statusCounts && (
        <div style={{ display: 'flex', gap: '1rem' }}>
          {/* Status Counts */}
          <div style={style.analyticsContainer}>
            {statusData.map(({ label, key }) => (
              <div style={style.textContainer} key={key}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={style.dot} />
                  {label}
                </div>
                <div>{analytics.statusCounts[key] || 0}</div>
              </div>
            ))}
          </div>
          
          {/* Priority Counts */}
          <div style={style.analyticsContainer}>
            {priorityData.map(({ label, key }) => (
              <div style={style.textContainer} key={key}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={style.dot} />
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