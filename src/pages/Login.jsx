import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [isLogin, setIsLogin] = useState(true); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); 
  const [gamingId, setGamingId] = useState(''); 
  const navigate = useNavigate(); 

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      
      console.log('Login Attempt:', { email, password });
      if (email && password) {
        alert('Logged in successfully! Redirecting to Home...');
        navigate('/'); 
      } else {
        alert('Please fill in all fields!');
      }
    } else {
      
      if (!name.trim() || !email.trim() || !password.trim() || !gamingId.trim()) {
        alert('Please fill in all fields!');
        return;
      }
      console.log('Sign Up Attempt:', { name, email, password, gamingId });
      alert('Registered successfully! Redirecting to Login...');
      setIsLogin(true); 
      setName('');
      setGamingId('');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div
      style={{
        background: 'url("src/assets/1.jpg") no-repeat center center fixed',
        backgroundSize: 'center',
        minHeight: '100vh',
      }}
    >
      <div className="container">
        <div className="login-form">
          <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
          <div style={{ marginBottom: '20px' }}>
            <button
              onClick={() => setIsLogin(true)}
              style={{ background: isLogin ? '#e94560' : '#16213e', marginRight: '10px', padding: '8px 16px' }}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              style={{ background: !isLogin ? '#e94560' : '#16213e', padding: '8px 16px' }}
            >
              Sign Up
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name *"
                  style={{ marginBottom: '15px' }}
                />
                <input
                  type="text"
                  value={gamingId}
                  onChange={(e) => setGamingId(e.target.value)}
                  placeholder="Gaming ID (e.g., Player#123) *"
                  style={{ marginBottom: '15px' }}
                />
              </>
            )}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email *"
              style={{ marginBottom: '15px' }}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password *"
              style={{ marginBottom: '15px' }}
            />
            <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
          </form>
          {isLogin ? (
            <p style={{ marginTop: '15px', color: '#aaa' }}>
              New to Victory Vault? <Link to="/login" onClick={() => setIsLogin(false)}>Sign Up here</Link>
            </p>
          ) : (
            <p style={{ marginTop: '15px', color: '#aaa' }}>
              Already have an account? <Link to="/login" onClick={() => setIsLogin(true)}>Login here</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;