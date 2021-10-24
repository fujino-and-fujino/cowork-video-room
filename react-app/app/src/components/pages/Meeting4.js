import Button from 'react-bootstrap/Button';
import React, { useState, setState } from 'react'
import './Meeting.css'
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import io from 'socket.io-client';
import Form from 'react-bootstrap/Form';


class Meeting4 extends React.Component {
  // prlocalVideoRef =  React.RefObject<HTMLVideoElement>
  // remoteVideoRef =  React.RefObject<HTMLVideoElement>
  // psocket =  SocketIOClient.Socket
  // localStream: MediaStream
  // remoteStream =  MediaStream
  // peerConnection =  RTCPeerConnection
  state = {
    localWidth: '500px',
    remoteWidth: '500px',
    localStatus: 'Happy',
    remoteStatus: 'Happy',
    isLocalClicked: false,
    isRemoteClicked: false,
    isInitiator: false,
    isStarted: false,
    isChannelReady: false,
  }

  constructor(props) {
    super(props)
    this.localVideoRef = React.createRef()
    this.remoteVideoRef = React.createRef()
    this.socket = io.connect('http://localhost:8000')
    // this.state = {
    //   isInitiator: false,
    //   isStarted: false,
    //   isChannelReady: false,
    // }
    const room = 'foo'
    if (room !== '') {
      console.log('Asking to join room ' + room)
      this.socket.emit('create or join', room)
    }

    this.socket.on('created', (room, clientId) => {
      console.log(room, clientId)
      this.setState({ isInitiator: true })
    })

    this.socket.on('full', (room) => {
      console.log('Room ' + room + ' is full :^(')
    })

    this.socket.on('ipaddr', (ipaddr) => {
      console.log('Server IP address is ' + ipaddr)
    })

    this.socket.on('join', (room) => {
      console.log('Another peer made a request to join room ' + room)
      console.log('This peer is the initiator of room ' + room + '!')
      this.setState({ isChannelReady: true })
    })

    this.socket.on('joined', (room, clientId) => {
      console.log(room, clientId)
      this.setState({ isChannelReady: true })
    })

    this.socket.on('log', (text) => {
      console.log(text)
    })

    const messageEventTarget = new EventTarget()
    messageEventTarget.addEventListener('got user media', () => {
      this.initiatorStart()
    })

    messageEventTarget.addEventListener('bye', () => {
      console.log('Session terminated.')
      if (this.peerConnection) this.peerConnection.close()
      this.setState({
        isStarted: false,
        isChannelReady: false,
        isInitiator: true,
      })
    })
    messageEventTarget.addEventListener('offer', async (e) => {
      const message = e.detail
      if (!this.state.isInitiator && !this.state.isStarted) {
        await this.receiverStart()
      }
      if (!this.peerConnection) return
      this.peerConnection.setRemoteDescription(
        new RTCSessionDescription(message),
      )
      console.log('Sending answer to peer.')
      const description = await this.peerConnection.createAnswer()
      this.setLocalAndSendMessage(description)
    })
    messageEventTarget.addEventListener('answer', async (e) => {
      const message = e.detail
      if (!this.peerConnection) return
      this.peerConnection.setRemoteDescription(
        new RTCSessionDescription(message),
      )
    })
    messageEventTarget.addEventListener('candidate', async (e) => {
      const message = e.detail
      if (!this.peerConnection || !this.state.isStarted) return
      const candidate = new RTCIceCandidate({
        sdpMLineIndex: message.label,
        candidate: message.candidate,
      })
      this.peerConnection.addIceCandidate(candidate)
    })

    this.socket.on('message', async (message) => {
      if (typeof message === 'string') {
        messageEventTarget.dispatchEvent(new Event(message))
      } else {
        messageEventTarget.dispatchEvent(
          new CustomEvent(message.type, { detail: message }),
        )
      }
    })

    this.onicecandidate = this.onicecandidate.bind(this);
    this.ontrack = this.ontrack.bind(this);
    this.createPeer = this.createPeer.bind(this);
    this.initiatorStart = this.initiatorStart.bind(this);
    this.receiverStart = this.receiverStart.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.setLocalAndSendMessage = this.setLocalAndSendMessage.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
  }

  async componentDidMount() {
    //console.log(`hostname: ${location.hostname}`)

    this.localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
    })
    if (this.localVideoRef.current) {
      this.localVideoRef.current.srcObject = this.localStream
      this.sendMessage('got user media')
    }
    window.addEventListener('beforeunload', () => {
      this.sendMessage('bye')
    })
  }

  async componentWillUnmount() {
    if (this.peerConnection) this.peerConnection.close()
    if (this.localStream) this.localStream.getTracks()[0].stop()
    this.sendMessage('bye')
    if (this.socket) this.socket.close()
  }

  render() {
    const { isStarted, isChannelReady, isInitiator } = this.state
    return (
      <div className='multi-video'>
        {/* <h2>Sample 5</h2>
        <p>Signaling and video Peer Connection</p>
        <p>isStarted: {String(isStarted)},</p>
        <p>isChannelReady: {String(isChannelReady)}</p>
        <p>isInitiator: {String(isInitiator)}</p> */}
        <br></br>
        <br></br>
        <br></br>
        <div>
          <h2>あなた</h2>
          <h5>Now：{this.state.localStatus}</h5>
          <div className='video'>
            <BootstrapSwitchButton
              onChange={() => {
                this.setState({ isLocalClicked: (!this.state.isLocalClicked), localWidth: (this.state.isLocalClicked ? '500px' : '0px') });
              }}
            />
            <br></br>
            <video
              style={{ width: this.state.localWidth, maxWidth: '100%' }}
              ref={this.localVideoRef}
              autoPlay
              playsInline
            />
            <div className='form'>
              <Form  onClick={this.updateStatus}>
                <Form.Group>
                  <Form.Label>自分の状態をあいてに伝えましょう</Form.Label>
                  <Form.Control size="sm" type="text" placeholder="How are you ?" />
                </Form.Group>
                <Button>Update</Button>
              </Form>
            </div>
          </div>
        </div >

        <br></br>
        <br></br>
        <br></br>
        <div>
          <h2>あいて</h2>
          <h5>Now：{this.state.remoteStatus}</h5>
          <div className='video'>
            <BootstrapSwitchButton
              onChange={() => {
                this.setState({ isRemoteClicked: (!this.state.isRemoteClicked), remoteWidth: (this.state.isRemoteClicked ? '500px' : '0px') });
              }}
            />
            <br></br>
            <video
              style={{ width: this.state.remoteWidth, maxWidth: '100%' }}
              ref={this.remoteVideoRef}
              autoPlay
              playsInline
            />
          </div>
        </div >

        {/* <p>あなた</p>
        <BootstrapSwitchButton
          onChange={() => {
            this.setState({ isClicked: (!this.state.isClicked), width: (this.state.isClicked ? '320px' : '0px') });
          }}
        />
        <br></br>
        <video
          ref={this.localVideoRef}
          style={{ width: this.state.width, maxWidth: '100%' }}
          autoPlay
          playsInline
        />
        <video
          ref={this.remoteVideoRef}
          style={{ width: '320px', maxWidth: '100%' }}
          autoPlay
          playsInline
        /> */}
      </div>
    )
  }

  onicecandidate = (event) => {
    console.log('icecandidate event: ', event)
    if (event.candidate) {
      this.sendMessage({
        type: 'candidate',
        label: event.candidate.sdpMLineIndex,
        id: event.candidate.sdpMid,
        candidate: event.candidate.candidate,
      })
    } else {
      console.log('End of candidates.')
    }
  }

  ontrack = (event) => {
    console.log('ontrack')
    if (!this.remoteVideoRef.current) return
    if (event.streams && event.streams[0]) return
    this.remoteStream = new MediaStream()
    this.remoteStream.addTrack(event.track)
    this.remoteVideoRef.current.srcObject = this.remoteStream
  }

  createPeer = () => {
    console.log('>>>>>> creating peer connection')
    if (!this.localStream) return
    this.peerConnection = new RTCPeerConnection()
    this.peerConnection.addEventListener('icecandidate', this.onicecandidate)
    this.peerConnection.addEventListener('track', this.ontrack)
    this.peerConnection.addTrack(this.localStream.getVideoTracks()[0])
    this.setState({ isStarted: true })
  }

  initiatorStart = async () => {
    const { isStarted, isChannelReady } = this.state
    console.log('>>>>>>> initiatorStart() ', isStarted, isChannelReady)
    if (!isStarted && isChannelReady) {
      this.createPeer()
      if (!this.peerConnection) return
      console.log('Sending offer to peer')
      const description = await this.peerConnection.createOffer()
      this.setLocalAndSendMessage(description)
    }
  }

  receiverStart = async () => {
    const { isStarted, isChannelReady } = this.state
    console.log('>>>>>>> receiverStart() ', isStarted, isChannelReady)
    if (!isStarted && isChannelReady) {
      this.createPeer()
    }
  }

  sendMessage = (message) => {
    if (!this.socket) return
    console.log('Client sending message: ', message)
    this.socket.emit('message', message)
  }

  setLocalAndSendMessage = (description) => {
    if (!this.peerConnection) return
    this.peerConnection.setLocalDescription(description)
    this.sendMessage(description)
  }

  updateStatus = () => {
    console.log('lll')
  }
}

  

export default Meeting4;