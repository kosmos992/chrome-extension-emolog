import styled from 'styled-components';
import { LookBackModal } from './Modal';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import Pie from './Charts';
import ActivityCalendar from './ActivityCalendar';
import { useSelector } from 'react-redux';
import { selectPalettes } from '../../redux/slice';

const LookBack = ({ lookbackRefresh, setHidenCard }) => {
  const palettes = useSelector(selectPalettes);
  const moodList = [
    '기쁨',
    '슬픔',
    '분노',
    '설렘',
    '걱정',
    '평온',
    '예민',
    '희망',
  ];
  const [palette, setPalette] = useState([]);

  useEffect(() => {
    chrome.storage.local.get(['paletteCode']).then(res => {
      if (res.paletteCode !== undefined) {
        setPalette(palettes[res.paletteCode]);
      } else {
        setPalette(palettes[0]);
      }
    });
    chrome.storage.local.get(['allMood']).then(res => {
      // console.log(res.allMood);
      setData(
        res.allMood.map(each => {
          each.date = dayjs(each.date).format('YYYY-MM-DD');
          each.count = (each.moodCode + 1) * 50 - 25;
          return each;
        })
      );
      handleSetPieData(res.allMood, Number(year), palette);
    });
  }, [lookbackRefresh]);

  const today = new Date();
  const [data, setData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [selected, setSelected] = useState(dayjs(today).format('YYYY-MM-DD'));
  const [viewDetails, setViewDetails] = useState(false);
  const [year, setYear] = useState(today.getFullYear());

  const withoutDup = data.filter(e => e.date === selected);
  const selectedData = withoutDup.pop();
  // console.log(selectedData);

  const extent = [];
  for (const each of data) {
    const year = Number(dayjs(each.date).format('YYYY'));
    extent.includes(year) ? null : extent.push(year);
  }

  extent.sort((a, b) => a - b);

  const handleSetYear = num => {
    const max = extent[extent.length - 1];
    const min = extent[0];
    const output = year + num;

    if (output < min || output > max) {
      return;
    }

    handleSetPieData(data, output);
    return setYear(output);
  };

  const handleSetPieData = (data, year) => {
    const moods = {
      기쁨: 0,
      슬픔: 0,
      분노: 0,
      설렘: 0,
      걱정: 0,
      평온: 0,
      예민: 0,
      희망: 0,
    };
    const filtered = data.filter(
      ea => Number(dayjs(ea.date).format('YYYY')) === year
    );
    // console.log(filtered);
    for (const each of filtered) {
      if (each.moodCode !== null) {
        moods[moodList[each.moodCode]] += 1;
      }
    }
    // console.log(moods);

    const moodsKeys = Object.keys(moods);
    const moodsValues = Object.values(moods);
    const result = [];
    for (let i = 0; i < 8; i++) {
      if (moodsValues[i] !== 0) {
        result.push({
          id: moodsKeys[i],
          label: moodsKeys[i],
          value: moodsValues[i],
          code: moodsKeys.indexOf(moodsKeys[i]),
        });
      }
    }
    setPieData(result);
  };

  const handleViewDetails = () => {
    const selection = window.getSelection();
    if (selection.type != 'Range') {
      setViewDetails(!viewDetails);
    }
  };

  return (
    <LookBackModal setHidenCard={setHidenCard}>
      <Wrapper>
        {data.length === 0 ? (
          <Announcement>기록이 존재하지 않습니다</Announcement>
        ) : (
          <>
            <CalendarContainer>
              <LeftRightContainer>
                <LeftRight>
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    onClick={() => {
                      handleSetYear(-1);
                    }}
                  />
                  <Spacer />
                </LeftRight>
              </LeftRightContainer>
              <ActivityCalendar
                palette={palette}
                year={year}
                data={data.filter(
                  each => dayjs(each.date).format('YYYY') === `${year}`
                )}
                setSelected={setSelected}
                showWeekdayLabels={true}
                blockMargin={5}
                blockSize={11}
              />

              <LeftRightContainer>
                <LeftRight>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    onClick={() => handleSetYear(1)}
                  />
                  <Spacer />
                </LeftRight>
              </LeftRightContainer>
            </CalendarContainer>
            <StatisticsContainer>
              <PieCard>
                <div style={{ fontSize: '15px' }}>{year}년 회고</div>
                <Pie pieData={pieData} year={year} palette={palette} />
              </PieCard>
              <MoodCard>
                <Title>하루 돌아보기</Title>
                <CardContainer viewDetails={viewDetails}>
                  <Mood
                    viewDetails={viewDetails}
                    color={
                      selectedData === undefined
                        ? '#eeeeee'
                        : palette[selectedData.moodCode]
                    }
                  />
                  <Info>
                    <Type>
                      {selectedData === undefined
                        ? ''
                        : moodList[selectedData.moodCode]}
                    </Type>
                    <Hexcode>{selected}</Hexcode>
                    <Contents
                      onClick={() => handleViewDetails()}
                      viewDetails={viewDetails}
                    >
                      {viewDetails ? (
                        <Details data={selectedData} />
                      ) : (
                        '자세히 보기'
                      )}
                    </Contents>
                  </Info>
                </CardContainer>
              </MoodCard>
            </StatisticsContainer>
          </>
        )}
      </Wrapper>
    </LookBackModal>
  );
};

const Details = ({ data }) => {
  return (
    <article>
      <br />
      <h3>이날 있었던 일</h3>
      <article>{data.body === '' ? '-' : data.body}</article>
      <br />
    </article>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const CalendarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 90%;
  height: 200px;
`;

const Announcement = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  font-size: 30px;
`;

const PieCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 45%;
`;

const MoodCard = styled(PieCard)`
  width: 40%;
`;

const StatisticsContainer = styled(CalendarContainer)`
  height: 50%;
  justify-content: center;
`;

const LeftRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;
const LeftRight = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: transparent;
  border: none;
  margin: 40px 0;
  font-size: 30px;
  path {
    color: #333435;
  }
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  width: ${({ viewDetails }) => (viewDetails ? '340px' : '190px')};
  height: 260px;
  background-color: white;
  box-shadow: 2px 2px 5px rgba(22, 27, 29, 0.25), -2px -2px 5px #faf8ff;
  transition: width 0.2s;
  animation-timing-function: ease-in-out;
`;

const Title = styled.div`
  margin-bottom: 10px;
  font-size: 15px;
`;

const Spacer = styled.div`
  height: 13px;
`;

const Mood = styled.div`
  width: ${({ viewDetails }) => (viewDetails ? '330px' : '180px')};
  height: 195px;
  margin: 5px 5px 0 5px;
  background-color: ${({ color }) => color};
  transition-property: width, background-color;
  transition-duration: 0.2s;
  animation-timing-function: ease-in-out;
`;

const Info = styled.div`
  width: 100%;
  margin: 5px auto auto auto;
  padding: 5px;
  text-align: left;
`;

const Type = styled.div`
  height: 20px;
  line-height: 20px;
  font-size: 20px;
  font-weight: 800;
`;

const Hexcode = styled.div`
  height: 18px;
  font-size: 12px;
  font-weight: 300;
  margin-bottom: 5px;
`;
const Contents = styled.div`
  height: ${({ viewDetails }) =>
    viewDetails ? '197px' : '22px'}; //460 - 94 - 10

  font-size: 12px;
  font-weight: 300;
  white-space: pre-line;
  overflow-y: scroll;
  transition: height 0.2s;
  animation-timing-function: ease-in-out;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export default LookBack;
