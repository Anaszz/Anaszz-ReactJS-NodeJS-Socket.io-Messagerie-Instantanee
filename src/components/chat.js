import React, {useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import InfoBar from './infobar'
import '../style/chat.css'
import Input from './input'
import Messages from './messages'
import TextContainer from './textContainer'
let socket

function Chat({ location }){
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const ENDPOINT = 'https://anas-react-chat-application.herokuapp.com/'

  useEffect( () =>{
    console.log('lfefe')
  })
  useEffect(() => {
      const {name, room } = queryString.parse(location.search) //récupère les paramètres du lien 
        
        socket = io(ENDPOINT)

        setName(name)
        setRoom(room)

        console.log(name, room)
        console.log(socket)
       
        socket.emit('join', { name, room})

        socket.on('roomData', ({ users }) => {
          setUsers(users);
        })
    
        //agit comme le didUnmounted
        return () => {
            socket.emit('disconnect')
            socket.off()
        }
        
  }, [ENDPOINT, location.search])    //render seulemement quand les elements de cette liste changent donc pas de "we have a new connection" 2x
  
  useEffect(() => {
    socket.on('message', (message) =>{
      setMessages([...messages, message]) // les ... servent à "spread", séparer les dif valeurs du tableau en diff variables 
    })
  }, [messages])

const sendMessage = (event) => {
  event.preventDefault();
  
  if(message){
    socket.emit('sendMessage', message, () => setMessage(''))
  }
}

console.log(message, messages)

  return(
     <div className="outerContainer">
        <div className="container">
            <InfoBar room={room}/>
            <Messages messages={ messages } name={ name } />
            <Input setMessage={setMessage} sendMessage={sendMessage} message={message}/>
        </div>
        <TextContainer users={users} />
     </div>
    )
}

export default Chat