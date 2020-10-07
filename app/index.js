import { battery } from 'power'
import segmentBar from '../resources/segment-bar'

let segSteps   = segmentBar({id:'segSteps',  direction:'right', imagePrefix:'arrowRight',  spacing:-5})
let segPower   = segmentBar({id:'segPower',  direction:'right', imagePrefix:'stripey',     spacing:0, color:'cyan'})
let segActive  = segmentBar({id:'segActive', direction:'right', imagePrefix:'hearts',      spacing:2})
let segDist    = segmentBar({id:'segDist',   direction:'up',    imagePrefix:'roundRectUp', spacing:2})
let segHeart   = segmentBar({id:'segHeart',  direction:'up',    imagePrefix:'mask',        spacing:0, mask:'heart'})

segSteps.setFills(['#FF0000', '#FF3800', '#FF7100', '#FFAA00', '#FFE200', '#E2FF00', '#A9FF00', '#71FF00', '#38FF00', '#00FF00'])   // red-yellow-green
segDist.setFills(['#FF0000', '#FF3800', '#FF7100', '#FFAA00', '#FFE200', '#E2FF00', '#A9FF00', '#71FF00', '#38FF00', '#00FF00'])    // red-yellow-green
segActive.setFills(['#FF0000', '#FF1010', '#FF2121', '#FF3232', '#FF4444', '#FF5555', '#FF6666', '#FF7777', '#FF8888', '#FF9999'])  // red-pink
segHeart.setFills(['#CD7F32', '#CA8D52', '#C79C71', '#C4AA91', '#C1B9B0', '#C7C1AB', '#D5C480', '#E3C755', '#F1C92B', '#FFCC00'])   // bronze-silver-gold

// Detect battery level change and update immediately
battery.addEventListener('change', () => {

  let val = battery.chargeLevel

  // The following (and other) property assignments work because the widget is a SVG element, and thus inherits members from that element even though they're not included in the widget definition:
  //segSteps.y = 150
  //segActive.style.display = 'none'

  segSteps.value =
    segPower.value =
    segActive.value =
    segDist.value =
    segHeart.value = val
})

// TODO 4 convert to SDK 5 and test on hardware