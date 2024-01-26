import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import './App.css'

//create a socket connection to the server
const socket = io('http://localhost:5555/')


const App = () => {

    const[inputValue, setInputValue] = useState('');
    const[display, setDisplay] = useState('')

    useEffect(()=>{
        socket.on('Client',(data)=>{
            console.log(data,"data")
            setDisplay(data)
        })

        socket.on('sendtoall',(data)=>{
            console.log(data,"data")
            setDisplay(data)
        })

        socket.on('exclusive',(data)=>{
            console.log(data,"data")
            setDisplay(data)
        })

        socket.on('JoinRoom',(data)=>{
            console.log(data)
            // alert(data)
            setDisplay(data)
        })

        socket.on('sendtoroomdata',(data)=>{
            console.log(data)
        })

    },[])
    
    const handleSendMsg=()=>{
        socket.emit('MESSAGE', inputValue)
    }

    const handleBroardcast=()=>{
        socket.emit('BROADCAST',inputValue)
    }

    const handleExclusiveBroardcast=()=>{
        socket.emit('EXCLUSIVEBROADCAST',inputValue)
    }

    const handleJoinRoom=()=>{
        let roomName = prompt("Please Enter the room name:")
        socket.emit('JOINROOM',roomName)
    }

    const handleSendMsgtoRoom=()=>{
        socket.emit('SENDTOROOM',inputValue)
    }
    

  return (
    <div className='container'>
        <input type='text' value={inputValue} onChange={(e)=>setInputValue(e.target.value)}/>
        <hr/>
        <button onClick={handleSendMsg}>Send Message</button>
        <hr/>
        <button onClick={handleBroardcast}>Send to All participants</button>
        <hr/>
        <button onClick={handleExclusiveBroardcast}>EXCLUSIVE BROADCAST</button>
        <hr/>
        <button onClick={handleJoinRoom}>Join Room</button>
        <hr/>
        <button onClick={handleSendMsgtoRoom}>Send msg to Room</button>
        
        
        <h1>msg: {display}</h1>
    </div>
  )
}

export default App
