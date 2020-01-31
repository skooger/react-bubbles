import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState({
      username: '',
      password: ''
  });

  const handleChange = e => {
      setUserInfo({...userInfo,
        [e.target.name]: e.target.value
      
      })}

  const login = e => {
    e.preventDefault();
    // make a POST request to the server
    // the server will "authenticate" the user based on their credentials
    // If they can be authenticated the server will return a token
    axios
      .post('http://localhost:5000/api/login', userInfo)
      .then(res => {
        console.log(res);
        localStorage.setItem('token', res.data.payload);
        history.push('/BubblesPage')
      })
      .catch(err => console.log(err));
  };

 
    return (
      <div>
        <form onSubmit={login}>
        <div className="InputWrap">
            <input 
                type="text"
                name="username"
                placeholder="User Name"
                value={login.username}
                onChange={handleChange}
            />

        </div>
        <div className="InputWrap">
          <input
            type="password"
            name="password"
            value={login.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </div>
          <button>Log in</button>
        </form>
      </div>
    );
  }


export default Login;

