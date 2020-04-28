import document from 'document'
import * as fs from "fs";

export function segmentBar({ id, direction, value, maxvalue, imagePrefix, spacing, color, visibility}) {
  
  this.root         = typeof id === 'string' ? document.getElementById(id) : id
  this.style        = this.root.style
  this.seg          = this.root.getElementsByClassName('seg')
  this._numsegs     = this.seg.length
  this._direction   = direction || 'right'
  this._imagePrefix = `segments/${imagePrefix}/`
  this._value       = value || 0
  this._maxvalue    = maxvalue || 100
  this._segval      = this._maxvalue / this._numsegs
  this._spacing     = spacing || 0
  this._color       = color || 'white'
  this._dimensions  = getImageDimensions(this._imagePrefix + "/0.png.txi");
  this._visibility  = visibility || 'visible';

  this.reposition = () =>{
  
    // Declare loop variables before loop for better performance
    let i=0;
    let max=this._numsegs;
    let currSeg;
        
    // Loop through all the segments
    for (i=0;i<max;i++){
      
      // Grab the current segment handle
      currSeg = this.seg[i];

      // Set image width and height
      currSeg.width = this._dimensions.width;
      currSeg.height = this._dimensions.height;
      
      // Set the segment position
      if (this._direction === 'right'){
        currSeg.x = i * (this._dimensions.width + this._spacing);
      } else if (this._direction === 'left'){
        currSeg.x = (max -1 -i) * (this._dimensions.width + this._spacing); 
      } else if (this._direction === 'up'){
        currSeg.y = (max -1 -i) * (this._dimensions.height + this._spacing);
      } else {
        currSeg.y = i * (this._dimensions.height + this._spacing);
      }
      
      // Set the color
      currSeg.style.fill = this._color;

      // Set the visibility
      currSeg.style.visibility = this._visibility;
         
    }

    this.redraw();
    
  }
  
  this.redraw = () => {
        
    // Declare loop variables before loop for better performance
    let i=0;
    let max=this._numsegs;
    let currSeg;
      
    //let val = Math.floor(this._value/max);
    let val = Math.floor(this._value/this._segval)
    
    //console.log("VAL: " + val)
    
    // Loop through all the segments
    for (i=0;i<max;i++){
      
      // Grab the current segment handle
      currSeg = this.seg[i];

            
      // Set the individual segment images based on value
      if (i < val){
        // This segment needs to be filled
        currSeg.href = `${this._imagePrefix}${this._segval}.png`;
      } else if (i === val){
        // This is the currently filling segment - choose correct image using remainder
        currSeg.href = `${this._imagePrefix}${this._value%this._segval}.png`;
      } else {
        // This segment needs to be empty
        currSeg.href = `${this._imagePrefix}0.png`;
      }
    
    }
    
  }

  // Getter & Setter for VALUE
  Object.defineProperty(this, 'value', {
    get : () => {
      return this._value
    },
    set : (val) => {
      //console.log("Setting VALUE to " + val);
      if(this._value === val) 
        return
      this._value = Math.floor(val)
      this.redraw()
    }
  })
      
  
 
  this.reposition();
  
}


function getImageDimensions(path){
  
  let file = fs.openSync(`/mnt/assets/resources/${path}`, "r");
  let buffer = new ArrayBuffer(8);
  fs.readSync(file, buffer, 0, 8, 6*4);
  let values = new Uint32Array(buffer);
  fs.closeSync(file);

  return {width: values[0], height: values[1]};
  
}