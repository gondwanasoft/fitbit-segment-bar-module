import document from 'document'
import * as fs from 'fs'

export default ({id, direction, value, maxvalue, imagePrefix, spacing, color, visibility}) => {

  const root         = typeof id === 'string' ? document.getElementById(id) : id
  const style        = root.style
  const _seg          = root.getElementsByClassName('seg')
  const _numsegs     = _seg.length
  const _direction   = direction || 'right'
  const _imagePrefix = `segment-bar/segments/${imagePrefix}/`
  let _value         = value || 0
  const _maxvalue    = maxvalue || 100
  const _segval      = _maxvalue / _numsegs
  const _spacing     = spacing || 0
  const _color       = color || 'white'
  const _dimensions  = getImageDimensions(_imagePrefix + "/0.png.txi")
  const _visibility  = visibility || 'visible'

  const reposition = () => {

    // Declare loop variables before loop for better performance
    let i=0;
    let max=_numsegs;
    let currSeg;

    // Loop through all the segments
    for (i=0;i<max;i++){

      // Grab the current segment handle
      currSeg = _seg[i];

      // Set image width and height
      currSeg.width = _dimensions.width;
      currSeg.height = _dimensions.height;

      // Set the segment position
      if (_direction === 'right'){
        currSeg.x = i * (_dimensions.width + _spacing);
      } else if (_direction === 'left'){
        currSeg.x = (max -1 -i) * (_dimensions.width + _spacing);
      } else if (_direction === 'up'){
        currSeg.y = (max -1 -i) * (_dimensions.height + _spacing);
      } else {
        currSeg.y = i * (_dimensions.height + _spacing);
      }

      // Set the color
      currSeg.style.fill = _color;

      // Set the visibility
      currSeg.style.visibility = _visibility;

    }

    redraw();

  }

  const redraw = () => {

    // Declare loop variables before loop for better performance
    let i=0;
    let max=_numsegs;
    let currSeg;

    //let val = Math.floor(_value/max);
    let val = Math.floor(_value/_segval)

    //console.log("VAL: " + val)

    // Loop through all the segments
    for (i=0;i<max;i++){

      // Grab the current segment handle
      currSeg = _seg[i];


      // Set the individual segment images based on value
      if (i < val){
        // This segment needs to be filled
        currSeg.href = `${_imagePrefix}${_segval}.png`;
      } else if (i === val){
        // This is the currently filling segment - choose correct image using remainder
        currSeg.href = `${_imagePrefix}${_value%_segval}.png`;
      } else {
        // This segment needs to be empty
        currSeg.href = `${_imagePrefix}0.png`;
      }

    }

  }

  Object.defineProperty(root, 'value', {  // It may be dangerous to use the property name 'value' because it's already defined on GraphicsElement.
    get: function() {
      return _value
    },
    set: function(newValue) {
      if(_value === newValue)
        return
      _value = Math.floor(newValue)
      redraw()
    }
  })

  root.setFills = fills => {
    // fills: array of fill strings (one per segment).
    // This should probably be implemented as a setter, but we'll use a function just to demonstrate how to do so.
    fills.forEach((fill, index) => {
      _seg[index].style.fill = fill   // this could do with some range-checking
    })
  }

  reposition()

  return root
}


function getImageDimensions(path) {

  let file = fs.openSync(`/mnt/assets/resources/${path}`, "r");
  let buffer = new ArrayBuffer(8);
  fs.readSync(file, buffer, 0, 8, 6*4);
  let values = new Uint32Array(buffer);
  fs.closeSync(file);

  return {width: values[0], height: values[1]};

}