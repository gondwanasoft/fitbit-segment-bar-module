import document from 'document'
import * as fs from 'fs'

export default ({id, direction, value, maxValue, imagePrefix, spacing, color, visibility, mask}) => { // TODO 3 verify that all args are used

  // The constants and variables declared below are not returned, so they're not directly accessible outside of the widget.

  // Note on _name convention: when closures aren't used to implement private members, underscores are sometimes prepended to variable and function names
  // to indicate members that should be considered private. Since we're using a closure, private members aren't publicly accessible so this convention isn't
  // necessary. However, it can still be useful as it helps us to see which members are private and which ones aren't. It also lets us use straightforward
  // names for getters and setters; eg, this widget has a getter for 'value' which returns _value. If _value didn't have an underscore, we'd want that getter
  // to return a variable named value (ie, the same name as the getter property). That would be dangerous at best, and would prompt us to rename either the
  // variable or the property.

  const _root        = typeof id === 'string' ? document.getElementById(id) : id
  const _seg         = _root.getElementsByClassName('seg')
  const _numsegs     = _seg.length
  const _direction   = direction || 'right'
  const _imagePrefix = `segment-bar/segments/${imagePrefix}/`
  let _value         = value || 0
  const _maxValue    = maxValue || 100
  const _segval      = _maxValue / _numsegs
  const _spacing     = spacing || 0
  const _color       = color || 'white'
  const _dimensions  = getImageDimensions(_imagePrefix + "/0.png.txi")
  const _visibility  = visibility || 'visible'

  // The functions below are 'nested' within the widget default function. Because they're not returned, they're not directly accessible outside of the widget.

  const _initialise = () => {
    // If memory is tight, this could be converted to an IIFE. After execution, this function's memory would then be released.

    // Declare loop variables before loop for better performance:
    let i=0
    let max=_numsegs
    let currSeg

    // Loop through all the segments
    for (i=0;i<max;i++){

      // Grab the current segment handle
      currSeg = _seg[i]

      // Set image width and height
      currSeg.width = _dimensions.width
      currSeg.height = _dimensions.height

      // Set the segment position
      if (_direction === 'right') {
        currSeg.x = i * (_dimensions.width + _spacing)
      } else if (_direction === 'left') {
        currSeg.x = (max -1 -i) * (_dimensions.width + _spacing)
      } else if (_direction === 'up') {
        currSeg.y = (max -1 -i) * (_dimensions.height + _spacing)
      } else {
        currSeg.y = i * (_dimensions.height + _spacing)
      }

      // Set the color
      currSeg.style.fill = _color

      // Set the visibility
      currSeg.style.visibility = _visibility

    }

    //console.log(`${_root.getElementById('barMaskRect').width}`)
    const barMaskRect = _root.getElementById('barMaskRect')
    if (mask) {
      const barMaskImage = _root.getElementById('barMaskImage')
      barMaskImage.href = `segment-bar/masks/${mask}.png`
      barMaskImage.style.display = 'inline'
      barMaskRect.style.display = 'none'
    } else {    // no mask
      barMaskRect.width = _direction === 'left' || _direction === 'right' ? _dimensions.width * 10 + _spacing * 9 : _dimensions.width
      barMaskRect.height = _direction === 'left' || _direction === 'right' ? _dimensions.height : _dimensions.height * 10 + _spacing * 9
    }

    _redraw()

  }

  const _redraw = () => {

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

  // The code below is run when the widget is created.

  _initialise()

  // The code below adds widget-specific members to the root element. Because the root element is returned, these members will be publicly accessible.
  // They therefore comprise the widget's interface or API (in conjunction with the interfaces implemented by Fitbit on the root element).

  Object.defineProperty(_root, 'value', {  // It may be dangerous to use the property name 'value' because it's already defined on GraphicsElement.
    get: function() {
      return _value
    },
    set: function(newValue) {
      if(_value === newValue)
        return
      _value = Math.floor(newValue)
      _redraw()
    }
  })

  _root.setFills = fills => {
    // fills: array of fill strings (one per segment).
    // This should probably be implemented as a setter, but we'll use a function just to demonstrate how to do so.
    fills.forEach((fill, index) => {
      _seg[index].style.fill = fill   // this could do with some range-checking
    })
  }

  return _root

}

// This helper function need not be included in the export default function because it doesn't need access to any of that function's members:

function getImageDimensions(path) {

  let file = fs.openSync(`/mnt/assets/resources/${path}`, "r");
  let buffer = new ArrayBuffer(8);
  fs.readSync(file, buffer, 0, 8, 6*4);
  let values = new Uint32Array(buffer);
  fs.closeSync(file);

  return {width: values[0], height: values[1]};

}