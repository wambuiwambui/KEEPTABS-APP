import React, { useState } from 'react'
import {Form,Button} from 'react-bootstrap'
import { Link} from 'react-router-dom'
import { login } from '../auth'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';


const Login=()=>{
    
  const {register,handleSubmit,reset,formState:{errors}}=useForm()

  const history=useHistory()
  

  const loginUser=(data)=>{
    console.log(data)

    const requestOptions={
        method:"POST",
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(data)
    }
       
    fetch('/auth/login',requestOptions)
    .then(res=>res.json())
    .then(data=>{
        console.log(data.access_token)
        
        if (data){
         login(data.access_token)

         history.push('/')
        }
        else{
            alert('Invalid username or password')
        }


    })
        reset()
        

    }

    return(
        <div className="container">
        <div className="form">
            <h1>Login</h1>
            <form>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text"
                        placeholder="Your username"
                        {...register('username',{required:true,maxLength:25})}
                    />
              </Form.Group>
              {errors.username && <p style={{color:'red'}}> <small>Username required</small></p>}
              

              <br />
    
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password"
                  placeholder="Enter Password"
                  {...register('password', {required:true, minlength:10})}
                />
              </Form.Group>
              
              <br />
              <Form.Group>
                <Button variant="primary" onClick={handleSubmit(loginUser)}>
                  Login
                </Button>
              </Form.Group>

              <br/>

              <Form.Group>
                <small>Do not have an account? <Link to='/signup'>Create account</Link></small>
              </Form.Group>
            </form>
          </div>
        </div>
    )
}

export default Login