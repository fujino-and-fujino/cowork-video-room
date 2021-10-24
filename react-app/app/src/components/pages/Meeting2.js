import Button from 'react-bootstrap/Button';
import React, { useState, setState } from 'react'
import './Meeting.css'
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
//import io from 'socket.io-client'
class Meeting2 extends React.Component {
  //videoRef: React.RefObject<HTMLVideoElement>;
  //mediaStream: MediaStream;

  state = { isClicked: false, width: '320px' };


  constructor(props) {
    super(props);
    this.localVideoRef = React.createRef();
    this.remoteVideoRef = React.createRef({});
    this.localPeerConnection = new RTCPeerConnection();
    this.remotePeerConnection = new RTCPeerConnection();
    this.localStream = new MediaStream;
    this.remoteStream = new MediaStream;
  }

  async componentDidMount() {
    this.localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      //audio: true
    })
    if (this.localVideoRef.current) {
      this.localVideoRef.current.srcObject = this.localStream
    }
 
    const videoTracks = this.localStream.getVideoTracks()
    this.localPeerConnection.addEventListener(
      'icecandidate',
      (event) => {
        const iceCandidate = event.candidate
        if (iceCandidate) {
          if (!this.remotePeerConnection) return
          this.remotePeerConnection
            .addIceCandidate(iceCandidate)
            .then(() => {
              console.log('[remotePeer]: addIceCandidate success.')
            })
            .catch(error => {
              console.log(error)
            })
        }
      },
    )
    this.remotePeerConnection.addEventListener(
      'icecandidate',
      (event) => {
        const iceCandidate = event.candidate
        if (iceCandidate) {
          if (!this.localPeerConnection) return
          this.localPeerConnection
            .addIceCandidate(iceCandidate)
            .then(() => {
              console.log('[localPeer]: addIceCandidate success.')
            })
            .catch(error => {
              console.log(error)
            })
        }
      },
    )
    this.remotePeerConnection.addEventListener(
      'track',
      (event) => {
        console.log('ontrack')
        if (!this.remoteVideoRef.current) return
        if (event.streams && event.streams[0]) return
        this.remoteStream = new MediaStream()
        this.remoteStream.addTrack(event.track)
        this.remoteVideoRef.current.srcObject = this.remoteStream
      },
    )
    this.localPeerConnection.addTrack(videoTracks[0])
    const offerDescription = await this.localPeerConnection.createOffer({
      offerToReceiveVideo: true,
    })

    this.localPeerConnection
      .setLocalDescription(offerDescription)
      .then(() => {
        console.log('[localPeer]: setLocalDescription success')
      })
      .catch(error => {
        console.log(error)
      })

    this.remotePeerConnection
      .setRemoteDescription(offerDescription)
      .then(() => {
        console.log('[remotePeer]: setRemoteDescription success')
      })
      .catch(error => {
        console.log(error)
      })

    const answerDescription = await this.remotePeerConnection.createAnswer()
    this.remotePeerConnection
      .setLocalDescription(answerDescription)
      .then(() => {
        console.log('[remotePeer]: setLocalDescription success')
      })
      .catch(error => {
        console.log(error)
      })

    this.localPeerConnection
      .setRemoteDescription(answerDescription)
      .then(() => {
        console.log('[localPeer]: setRemoteDescription success')
      })
      .catch(error => {
        console.log(error)
      })


  }
/*
  componentWillUnmount() {
    if (this.mediaStream) this.mediaStream.getTracks()[0].stop()
  }*/



  render() {

    return (

      < div >
        <p> you </p>
        <div className='video'>
          <BootstrapSwitchButton
            onChange={() => {
              this.setState({ isClicked: (!this.state.isClicked), width: (this.state.isClicked ? '320px' : '0px') });
            }}
          />
          <br></br>
            <video
              style={{ width: this.state.width, maxWidth: '100%' }}
              ref={this.localVideoRef}
              autoPlay
              playsInline
            />
            <video
              style={{ width: this.state.width, maxWidth: '100%' }}
              ref={this.remoteVideoRef}
              autoPlay
              playsInline
            />

        </div>


      </div >
    )

  }
}

export default Meeting2;