import document from 'document'
import { charger, battery } from "power";
import {segmentBar} from './segmentBar.js' 

//let segBarLeft = new segmentBar({id:'segBarLeft', direction:'left', imagePrefix:'diagLeft', spacing:-7, color:'yellow'});

let segSteps   = new segmentBar({id:'segSteps',  direction:'right', imagePrefix:'arrowRight', spacing:-5, color:'red'});
let segPower   = new segmentBar({id:'segPower',  direction:'right', imagePrefix:'stripey', spacing:0, color:'cyan'});
let segActive  = new segmentBar({id:'segActive', direction:'right', imagePrefix:'hearts', spacing:2, color:'red'});
let segDist    = new segmentBar({id:'segDist',   direction:'up', imagePrefix:'roundRectUp', spacing:2, color:'yellow'});

// Detect battery level change and update immediately
battery.addEventListener("change", (charger, evt) => {

  let val = battery.chargeLevel;
  
  /*
  if (val < 20){
    segPower.color = 'red'
  } else if (val < 40) {
    segPower.color = 'orange'
  } else {
    segPower.color = 'green'
  }
  */
  
  
  segSteps.value  = val;
  segPower.value  = val;
  segActive.value = val;
  segDist.value   = val;
  
  //segBarLeft.value  = battery.chargeLevel;
  
});

  /*
  segSteps.setSegColor(0, '#f9df05')
  segSteps.setSegColor(1, '#ffcf02')
  segSteps.setSegColor(2, '#f5bd0e')
  segSteps.setSegColor(3, '#fca802')
  segSteps.setSegColor(4, '#f49510')
  segSteps.setSegColor(5, '#f18610')
  segSteps.setSegColor(6, '#e86c04')
  segSteps.setSegColor(7, '#f64e0a')
  segSteps.setSegColor(8, '#e8300c')
  segSteps.setSegColor(9, '#e80313')
  */

/*
segSteps.setSegColor(0 , '#FF0000');
segSteps.setSegColor(1 , '#FF3800');
segSteps.setSegColor(2 , '#FF7100');
segSteps.setSegColor(3 , '#FFAA00');
segSteps.setSegColor(4 , '#FFE200');
segSteps.setSegColor(5 , '#E2FF00');
segSteps.setSegColor(6 , '#A9FF00');
segSteps.setSegColor(7 , '#71FF00');
segSteps.setSegColor(8 , '#38FF00');
segSteps.setSegColor(9 , '#00FF00');
*/

segSteps.seg[0].style.fill = '#FF0000';
segSteps.seg[1].style.fill = '#FF3800';
segSteps.seg[2].style.fill = '#FF7100';
segSteps.seg[3].style.fill = '#FFAA00';
segSteps.seg[4].style.fill = '#FFE200';
segSteps.seg[5].style.fill = '#E2FF00';
segSteps.seg[6].style.fill = '#A9FF00';
segSteps.seg[7].style.fill = '#71FF00';
segSteps.seg[8].style.fill = '#38FF00';
segSteps.seg[9].style.fill = '#00FF00';


segDist.seg[0].style.fill = '#FF0000';
segDist.seg[1].style.fill = '#FF3800';
segDist.seg[2].style.fill = '#FF7100';
segDist.seg[3].style.fill = '#FFAA00';
segDist.seg[4].style.fill = '#FFE200';
segDist.seg[5].style.fill = '#E2FF00';
segDist.seg[6].style.fill = '#A9FF00';
segDist.seg[7].style.fill = '#71FF00';
segDist.seg[8].style.fill = '#38FF00';
segDist.seg[9].style.fill = '#00FF00';

segActive.seg[0].style.fill = '#FF0000';
segActive.seg[1].style.fill = '#FF1010';
segActive.seg[2].style.fill = '#FF2121';
segActive.seg[3].style.fill = '#FF3232';
segActive.seg[4].style.fill = '#FF4444';
segActive.seg[5].style.fill = '#FF5555';
segActive.seg[6].style.fill = '#FF6666';
segActive.seg[7].style.fill = '#FF7777';
segActive.seg[8].style.fill = '#FF8888';
segActive.seg[9].style.fill = '#FF9999';
