import document from 'document'
import { charger, battery } from 'power'
import segmentBar from '../resources/segment-bar'

let segSteps   = segmentBar({id:'segSteps',  direction:'right', imagePrefix:'arrowRight',  spacing:-5, color:'red'})
let segPower   = segmentBar({id:'segPower',  direction:'right', imagePrefix:'stripey',     spacing:0,  color:'cyan'})
let segActive  = segmentBar({id:'segActive', direction:'right', imagePrefix:'hearts',      spacing:2,  color:'red'})
let segDist    = segmentBar({id:'segDist',   direction:'up',    imagePrefix:'roundRectUp', spacing:2,  color:'yellow'})

segSteps.setFills(['#FF0000', '#FF3800', '#FF7100', '#FFAA00', '#FFE200', '#E2FF00', '#A9FF00', '#71FF00', '#38FF00', '#00FF00'])
segDist.setFills(['#FF0000', '#FF3800', '#FF7100', '#FFAA00', '#FFE200', '#E2FF00', '#A9FF00', '#71FF00', '#38FF00', '#00FF00'])
segActive.setFills(['#FF0000', '#FF1010', '#FF2121', '#FF3232', '#FF4444', '#FF5555', '#FF6666', '#FF7777', '#FF8888', '#FF9999'])

// Detect battery level change and update immediately
battery.addEventListener('change', (charger, evt) => {

  let val = battery.chargeLevel

  // The following (and other) property assignments work because the widget is a SVG element, and thus inherits members from that element even though they're not included in the widget definition:
  segSteps.y = 150
  segActive.style.display = 'inline'

  segSteps.value  = val
  segPower.value = val
  segActive.value = val
  segDist.value   = val

})


// TODO 3 convert to SDK 4.2