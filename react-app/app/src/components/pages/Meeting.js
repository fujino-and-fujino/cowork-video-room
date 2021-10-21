import React from 'react'

class Meeting extends React.Component{
  videoRef: React.RefObject<HTMLVideoElement>;
  mediaStream: MediaStream;

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

  componentWillUnmount() {
    if (this.mediaStream) this.mediaStream.getTracks()[0].stop()
  }
  render() {
    return(
    <div>
      <p>Meeting</p>
        <video
          style={{ width: '320px', maxWidth: '100%'}}
          ref={this.videoRef}
          autoPlay
          playsInline
        />
    
    </div>
    )
  }
}

export default Meeting;