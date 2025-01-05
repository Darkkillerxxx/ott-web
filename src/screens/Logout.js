import React, { useEffect, useState } from 'react';

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modal: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        width: '300px',
        textAlign: 'center',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    title: {
        margin: '0 0 10px',
        fontSize: '20px',
        fontWeight: 'bold',
    },
    message: {
        margin: '0 0 20px',
        fontSize: '16px',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    yesButton: {
        padding: '10px 20px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    noButton: {
        padding: '10px 20px',
        backgroundColor: '#6c757d',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};


const Logout = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        // Show the modal on component mount (page load)
        setIsModalVisible(true);
    }, []);

    const handleLogout = () => {
        // Perform logout logic
        localStorage.removeItem('auth');
        setIsModalVisible(false);
        window.location.href = '/login'; // Redirect to login page
    };

    const handleCancel = () => {
        // Close the modal and redirect back to home or another page
        setIsModalVisible(false);
        window.location.href = '/'; // Redirect to home page or a safe fallback
    };

    return (
        <>
            {isModalVisible && (
                <div style={styles.overlay}>
                    <div style={styles.modal}>
                        <h2 style={styles.title}>Confirm Logout</h2>
                        <p style={styles.message}>Are you sure you want to logout?</p>
                        <div style={styles.buttonContainer}>
                            <button style={styles.noButton} onClick={handleCancel}>
                                No
                            </button>
                            <button style={styles.yesButton} onClick={handleLogout}>
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Logout;
