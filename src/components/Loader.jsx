import React from 'react'

const Loader = () => {
  return (
    <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    }}>
        <div className="spinner" style={{
            width: '50px',
            height: '50px',
            border: '6px solid #ddd',
            borderTop: '6px solid #17A2B8',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
        }}></div>
    </div>
  )
}

export default Loader