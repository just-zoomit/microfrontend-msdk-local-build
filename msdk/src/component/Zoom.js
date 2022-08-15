import React, {useRef} from 'react';
import '../App.css';
import { ZoomMtg } from '@zoomus/websdk';

ZoomMtg.setZoomJSLib('https://source.zoom.us/2.6.0/lib', '/av');

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');

function Zoom() {
    // const [isBtn, setIsBtn] = useState(true)

    // setup your signature endpoint here: https://github.com/zoom/meetingsdk-sample-signature-node.js
    var signatureEndpoint = 'signatureEndpoint'
    // This Sample App has been updated to use SDK App type credentials https://marketplace.zoom.us/docs/guides/build/sdk-app
    var sdkKey = 'YOUR SDK KEY'
    var meetingNumber = '91562757618'
    var role = 0
    var leaveUrl = 'http://localhost:8082'
    var userName = 'React'
    var userEmail = 'donte.zoomie@gmail.com'
    var passWord = '226267'
    // pass in the registrant's token if your meeting or webinar requires registration. More info here:
    // Meetings: https://marketplace.zoom.us/docs/sdk/native-sdks/web/client-view/meetings#join-registered
    // Webinars: https://marketplace.zoom.us/docs/sdk/native-sdks/web/client-view/webinars#join-registered
    var registrantToken = ''
    


  
    function getSignature(e) {
      e.preventDefault();


  
  
      fetch(signatureEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          meetingNumber: meetingNumber,
          role: role
        })
      }).then(res => res.json())
      .then(response => {
        startMeeting(response.signature)
  
        console.log("What is this : ",startMeeting)
      }).catch(error => {
        console.error(error)
      })
    }
  
    function startMeeting(signature) {
      document.getElementById('zmmtg-root').style.display = 'block'

    

      ZoomMtg.init({
        leaveUrl: leaveUrl,
        success: (success) => {
          console.log(success)
  
          ZoomMtg.join({
            signature: signature,
            meetingNumber: meetingNumber,
            userName: userName,
            sdkKey: sdkKey,
            userEmail: userEmail,
            passWord: passWord,
            tk: registrantToken,
            success: (success) => {
              console.log(success)
            },
            error: (error) => {
              console.log(error)
            }
          })
  
        },
        error: (error) => {
          console.log(error)
        }
      })
    }
  
    return (
      <>
  
          <button onClick={getSignature}>Join Meeting</button>
         
          </>
    
    );
  }
  
  export default Zoom;