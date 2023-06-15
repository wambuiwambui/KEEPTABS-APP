import React, { useState, useEffect } from 'react';
import { BACKEND_URL } from './utility/constants'
import { getSession } from '../auth';

const Employee = () => {
  const [accessToken, setAccessToken] = useState();
  const [todayStatus, setTodayStatus] = useState();
  const [buttonsDisabled, setButtonStatus] = useState(false)
  const [timeIn, setTimeIn] = useState(new Date().toLocaleTimeString());
  const [timeOut, setTimeOut] = useState(new Date().toLocaleTimeString());

  const handleSubmitTimeIn = (event) => {
    event.preventDefault();

    const timeData = {
      time_in: timeIn
    };

    const requestOptions = {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(timeData)
    }

    fetch(`${BACKEND_URL}/employee/submitTimeIn`, requestOptions)
      .then((response) => response.json())
      .then(data => {
        if (data.message) {
          alert(data.message)
        }
        setTimeIn('');
        setTodayStatus(true)
      })
      .catch((error) => {
        console.error(error);
      })
  };

  const handleSubmitTimeOut = (event) => {
    event.preventDefault();

    const timeData = {
      time_out: timeOut,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(timeData)
    }

    fetch(`${BACKEND_URL}/employee/submitTimeOut`, requestOptions)
      .then((response) => response.json())
      .then(data => {
        if (data.message) {
          alert(data.message)
        }
        setTimeOut('');
        setButtonStatus(true)
      })
      .catch((error) => {
        console.error(error);
      })
  };

  const handleStatusCheck = () => {
    const unclocked_status = "User yet to clock in"
    const clocked_in_and_out = "User done for the day"
    const clocked_in_only = "User had clocked in"

    const requestOptions = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      }
    }

    fetch(`${BACKEND_URL}/employee/getTodayStatus`, requestOptions)
      .then((response) => response.json())
      .then(data => {
        if (data.message) {
          if (data.message === unclocked_status){
            setTodayStatus(false);
          } else if (data.message === clocked_in_only) {
            setTodayStatus(true);
          } else if (data.message === clocked_in_and_out) {
            setTodayStatus(true)
            setButtonStatus(true)
          }
        }
      })
      .catch((error) => {
        console.error(error);
      })
  }

  useEffect(() => {
    async function fetchToken(){
      const { access_token } = await getSession();
      setAccessToken(access_token)
    }
    fetchToken()
  })

  useEffect(() => {
    handleStatusCheck()
  }, [accessToken, buttonsDisabled, todayStatus])

  return (
    <div className="employee">
      <h1 className="title">KEEPTABS</h1>
      <p className="description">
        Get ready to clock in and rock on with our employee app! We've got your info covered and your time logged, so you can focus on doing what you do best - making work a party!
      </p>
      <form>
        {todayStatus ? (
          <input
            type="text"
            value={timeOut}
            placeholder="Time Out"
            className="time-input"
            disabled
          />
        ) : (
          <input
            type="text"
            value={timeIn}
            placeholder="Time In"
            className="time-input"
            disabled
          />
        )}
        <button hidden={buttonsDisabled} type="button" onClick={todayStatus ? handleSubmitTimeOut : handleSubmitTimeIn} className={`login-btn ${todayStatus ? 'logout' : 'login'}`}>
          {todayStatus ? 'Time Out' : 'Time In'}
        </button>
      </form>
    </div>
  );
};

export default Employee;

