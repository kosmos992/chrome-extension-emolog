import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  palettes: [
    [
      '#EE8242',
      '#9FC1EE',
      '#EE8686',
      '#E6AACB',
      '#D2CCC2',
      '#FFE27A',
      '#6868AC',
      '#A7CF99',
    ],
    [
      '#CE7E5D',
      '#CDD6DD',
      '#A2543D',
      '#D39A89',
      '#D6DCD8',
      '#D2D0AC',
      '#1D354F',
      '#557570',
    ],
    [
      '#E7AF8D',
      '#B0AEBA',
      '#CD686D',
      '#E08890',
      '#A2A987',
      '#F0DCB1',
      '#BEB5BF',
      '#A9C0C5',
    ],
    [
      '#C66157',
      '#BDB7A1',
      '#A7241C',
      '#DF5756',
      '#A38440',
      '#7D873B',
      '#5A958E',
      '#2E5542',
    ],
    [
      '#E4E4E4',
      '#666666',
      '#000000',
      '#D4D4D4',
      '#7D7D7D',
      '#9D9D9D',
      '#434343',
      '#B4B4B4',
    ],
    [
      '#F7B0BE',
      '#2178AE',
      '#ED8E83',
      '#EF3C23',
      '#F15A42',
      '#FAC92C',
      '#CFE5CC',
      '#1B4793',
    ],
  ],
};

const slice = createSlice({
  name: 'palettes',
  initialState,
});

export const selectPalettes = state => state.palettes.palettes;

export default slice.reducer;
