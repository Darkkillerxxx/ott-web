import '../common/login.css';
import { AppText } from '../components/AppText';
import { AppTextBold } from '../components/AppTextBold';
import loginImage from '../assets/loginImage.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Make sure styles are imported

const Login = ({ handleLogin }) => {
  const navigate = useNavigate();
  const [userNameOrContact, setUsernameOrContact] = useState('');
  const [otpMode, setOtpMode] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']); // Four fields for OTP
  const [error, setError] = useState('');

  const onSendOtp = (e) => {
    e.preventDefault();
    if (!userNameOrContact.trim()) {
      setError('Please enter your username or contact number.');
      toast.error('Please enter your username or contact number.', {
        position: 'top-right', // Correct positioning syntax
      });
      return;
    }
    setError('');
    setOtpMode(true);
  };

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const onLoginClick = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (!enteredOtp || enteredOtp.length !== 4) {
      setError('Please enter a valid 4-digit OTP.');
      toast.error('Please enter a valid 4-digit OTP.', {
        position: 'top-right', // Correct positioning syntax
      });
      return;
    }
    setError('');

    const payload = {
      username: userNameOrContact,
      otp: enteredOtp,
    };

    try {
      const response = await fetch('http://localhost:3000/api/auth/authenticateOtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.code === 200) {
        toast.success(data.message, {
          position: 'top-right', // Correct positioning syntax
        });
        localStorage.setItem('auth', data.accessToken);
        handleLogin(); // Invoke the login handler
        navigate('/dashboard'); // Navigate to the dashboard
      } else {
        toast.error(data.message || 'Failed to authenticate OTP.', {
          position: 'top-right', // Correct positioning syntax
        });
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.', {
        position: 'top-right', // Correct positioning syntax
      });
    }
  };

  return (
    <div className="w-100 vh-100 d-flex">
      {/* Left column with image */}
      <div className="col-4 p-0 m-0">
        <div className="login-image-container position-relative w-100 h-100">
          <img
            src={loginImage}
            alt="Login Illustration"
            className="login-image w-100 h-100"
            style={{ objectFit: 'cover' }}
          />
          <div className="login-overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center text-white text-center p-3">
            <h1>OTT Live !!!</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>

      {/* Right column with the form */}
      <div
        className="col-8 d-flex justify-content-center align-items-center"
        style={{ backgroundColor: '#f7f6fe', padding: '0 3rem' }}
      >
        <div
          className="w-100"
          style={{
            maxWidth: '400px',
          }}
        >
          <AppTextBold className="mb-3" style={{ fontSize: '2rem' }}>
            {otpMode ? 'Enter OTP' : 'Login'}
          </AppTextBold>
          <AppText className="mb-4 text-muted" style={{ fontSize: '1.5rem' }}>
            {otpMode
              ? 'Enter the 4-digit OTP sent to your phone.'
              : 'Welcome back, Admin. Please sign in to your account.'}
          </AppText>
          <form>
            {error && (
              <p className="text-danger" style={{ fontSize: '0.9rem' }}>
                {error}
              </p>
            )}
            {!otpMode ? (
              <div className="mb-3">
                <AppText style={{ fontWeight: 'bold', fontSize: '1rem' }}>
                  Username/Contact
                </AppText>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your Username or Phone"
                  value={userNameOrContact}
                  onChange={(e) => setUsernameOrContact(e.target.value)}
                />
              </div>
            ) : (
              <div className="d-flex justify-content-between mb-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    className="form-control text-center"
                    style={{
                      width: '60px',
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      marginRight: index < 3 ? '10px' : '0',
                    }}
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                  />
                ))}
              </div>
            )}
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                borderRadius: '20px',
                width: '100px',
                fontWeight: 'bold',
              }}
              onClick={!otpMode ? onSendOtp : onLoginClick}
            >
              {otpMode ? 'Login' : 'Send OTP'}
            </button>
          </form>
          <hr style={{ border: '1px solid #ddd', margin: '20px 0' }} />
          <AppText
            style={{ fontSize: '1rem', textAlign: 'center', color: '#666' }}
          >
            If you are not able to log in, please{' '}
            <a href="#" style={{ color: '#007bff' }}>
              click here
            </a>
          </AppText>
        </div>
      </div>
    </div>
  );
};

export default Login;
