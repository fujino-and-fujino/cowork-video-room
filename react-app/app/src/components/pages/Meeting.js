import Button from 'react-bootstrap/Button';
import React, { useState, setState } from 'react'
import './Meeting.css'
import BootstrapSwitchButton from 'bootstrap-switch-button-react';


class Meeting extends React.Component {
  //videoRef: React.RefObject<HTMLVideoElement>;
  //mediaStream: MediaStream;

  state = { isClicked: false, width: '320px' };


  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  async componentDidMount() {
    this.mediaStream = await navigator.mediaDevices.getUserMedia({
      video: true,
    })
    if (this.videoRef.current) {
      this.videoRef.current.srcObject = this.mediaStream
    }
  }
  /*
    componentWillUnmount() {
      if (this.mediaStream) this.mediaStream.getTracks()[0].stop()
    }*/



  render() {

    return (

      <div>
        <p>you</p>
        <div className='video'>
          <BootstrapSwitchButton
            onChange={() => {
              this.setState({ isClicked: (!this.state.isClicked), width: (this.state.isClicked ? '320px' : '0px') });
            }}
          />
          <br></br>
          <video
            style={{ width: this.state.width, maxWidth: '100%' }}
            ref={this.videoRef}
            autoPlay
            playsInline
          />
        </div>
      </div >
    )


   let video = document.querySelector('.video');
  }
}

export default Meeting;
