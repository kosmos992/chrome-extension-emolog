import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCertificate } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { selectPalettes } from '../../redux/slice';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

const Username = styled.span`
  margin-right: 16px; /* nav가 오픈되었을때 여부와 상관없이 위치고정 */
  font-size: 14px;
  cursor: pointer;
  svg {
    margin-right: 8px;
    path {
      color: ${({ color }) => (color ? color : 'inherit')};
    }
  }
`;

const User = ({ onClick, children }) => {
  const [palette, setPalette] = useState(0);
  const [moodCode, setMoodCode] = useState(-1);
  const palettes = useSelector(selectPalettes);
  const displayName = '메뉴';

  useEffect(() => {
    chrome.storage.local.get(['paletteCode']).then(res => {
      if (res.paletteCode !== undefined) {
        setPalette(palettes[res.paletteCode]);
      } else {
        setPalette(palettes[0]);
      }
    });
    chrome.storage.local.get(['today']).then(res => {
      if (
        res.today !== undefined &&
        res.today.date === dayjs(new Date()).format('YYYY-MM-DD')
      ) {
        setMoodCode(res.today.moodCode);
      } else {
        setMoodCode(-1);
      }
    });
  });

  return (
    <Username
      onClick={onClick}
      color={moodCode === -1 ? 'black' : palette[moodCode]}
    >
      <FontAwesomeIcon icon={faCertificate} />
      {displayName ? displayName : children}
    </Username>
  );
};

export default User;
