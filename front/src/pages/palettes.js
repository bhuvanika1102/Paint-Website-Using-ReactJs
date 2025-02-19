
import React from 'react';

const rgbValueArrays = [
  // Corresponds to palette 'primary' or 0
  [
    [255, 255, 255], [72, 72, 72],
    [255, 42, 42], [252, 187, 66],
    [255, 255, 76], [78, 137, 53],
    [31, 31, 255], [231, 153, 251],
    [170, 235, 255], [254, 213, 255]
  ],
  // Corresponds to palette 'bluey' or 1
  [
    [255, 255, 255], [25, 25, 25],
    [48, 89, 138], [115, 177, 232],
    [98, 200, 110], [241, 240, 233],
    [226, 122, 55], [242, 210, 135],
    [227, 108, 108], [44, 44, 87]
  ],
  []
];

// Pass in rgbValueArrays[puzzleIndex.paletteId] - then return an array of 0 or 1 (black/white) values
export const determineFontColor = arr => {
  let tmpArr = [];
  for (let i = 0; i < 10; i++) {
    if ((arr[i][0] * 0.299 + arr[i][1] * 0.587 +
      arr[i][2] * 0.114) > 150) tmpArr.push(0); // black font
    else tmpArr.push(1); // white font
  }
  return tmpArr;
};

const Palettes = ({ puzzleIndex }) => {
  const selectedPalette = rgbValueArrays[puzzleIndex.paletteId];
  const fontColorArray = determineFontColor(selectedPalette);

  return (
    <div>
      <h1>Color Palette</h1>
      <div>
        <p>Selected Palette: {puzzleIndex.paletteId}</p>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          {selectedPalette.map((color, index) => (
            <div
              key={index}
              style={{
                backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
                color: fontColorArray[index] === 0 ? 'black' : 'white',
                padding: '10px',
                margin: '5px',
              }}
            >
              Color {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default {
    rgbValueArrays,
    determineFontColor
  };