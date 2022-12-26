import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleHalfStroke,
  faPaperPlane,
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

const SelectorCard = ({
  darkmode,
  idx,
  toLeft,
  toRight,
  setDarkmode,
  setFade,
  fade,
  reason,
  setReason,
  moods,
  submitHandler,
  lookbackRefresher,
  dataRefresher,
}) => {
  const dateString = dayjs(new Date()).format('M월 D일');
  const [allmoods, setAllmoods] = useState([]);

  useEffect(() => {
    chrome.storage.local.get(['allMood']).then(res => {
      if (Object.keys(res).length === 0) {
        return;
      }
      console.log(res.allMood);
      setAllmoods(res.allMood);
    });
  }, []);

  const submit = () => {
    const today = dayjs(new Date()).format('YYYY-MM-DD');
    const moodCode = idx;
    const body = reason;
    const newAllMoods = allmoods.filter(each => each.date !== today);
    newAllMoods.push({ date: today, moodCode, body });
    console.log(newAllMoods);
    chrome.storage.local
      .set({
        today: { date: today, moodCode, body },
        allMood: newAllMoods,
      })
      .then(() => {
        chrome.storage.local.get(['allMood']).then(res => console.log(res));
        chrome.storage.local.get(null).then(res => console.log(res));
        setFade(true);
        lookbackRefresher();
        submitHandler();
        setAllmoods(newAllMoods);
        dataRefresher();
      });
  };

  return (
    <Wrapper fade={fade}>
      <Selector>
        <LeftRightContainer>
          <LeftRight darkmode={darkmode} fade={fade}>
            <FontAwesomeIcon icon={faChevronLeft} onClick={() => toLeft()} />
          </LeftRight>
        </LeftRightContainer>
        <Mood darkmode={darkmode} fade={fade}>
          <Type darkmode={darkmode} fade={fade}>
            {moods[idx]}
          </Type>
        </Mood>
        <LeftRightContainer>
          <LeftRight darkmode={darkmode} fade={fade}>
            <FontAwesomeIcon icon={faChevronRight} onClick={() => toRight()} />
          </LeftRight>
        </LeftRightContainer>
      </Selector>
      <Today darkmode={darkmode} fade={fade}>
        {dateString}
      </Today>
      <InfoContainer>
        <Info
          placeholder="무슨 일이 있었나요? 생략해도 돼요."
          darkmode={darkmode}
          fade={fade}
          value={reason}
          onChange={e => setReason(e.target.value)}
        ></Info>
        <ButtonContainer>
          <Button
            darkmode={darkmode}
            fade={fade}
            onClick={() => setDarkmode(!darkmode)}
          >
            <FontAwesomeIcon icon={faCircleHalfStroke} />
          </Button>
          <Button darkmode={darkmode} fade={fade} onClick={() => submit()}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </Button>
        </ButtonContainer>
      </InfoContainer>
    </Wrapper>
  );
};

export default SelectorCard;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 460px;
  opacity: ${({ fade }) => (fade ? 0 : 1)};
  transition: opacity 0.3s;
`;

const Selector = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

const LeftRight = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: transparent;
  border: none;
  margin: 40px 0 20px 0;
  font-size: 50px;
  path {
    color: ${({ darkmode }) => {
      if (darkmode) {
        return '#333435';
      }
      return '#f6f6f6';
    }};
    transition: color 0.3s;
  }
`;

const Mood = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  width: 220px;
  height: 220px;
  -webkit-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 5px solid
    ${({ darkmode }) => {
      if (darkmode) {
        return '#333435';
      }
      return '#f6f6f6';
    }};
  transition: border 0.3s;
  margin: 40px 20px 15px 20px;
`;

const Type = styled.div`
  height: 40px;
  line-height: 40px;
  font-size: 40px;
  font-weight: 800;
  margin: 10px;
  color: ${({ darkmode }) => {
    if (darkmode) {
      return '#333435';
    }
    return '#f6f6f6';
  }};
  transition: color 0.3s;
`;

const Today = styled.div`
  font-size: 18px;
  -webkit-user-select: none;
  user-select: none;
  color: ${({ darkmode }) => {
    if (darkmode) {
      return '#333435';
    }
    return '#f6f6f6';
  }};
  transition: color 0.3s;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 336px;
  height: 85px;
  margin: 15px 40px 40px 40px;
`;

const Info = styled.textarea`
  width: 85%;
  padding: 10px;
  font-size: 13px;
  border-radius: 15px;
  text-align: left;
  border: none;
  resize: none;
  background-color: ${({ fade }) =>
    fade ? '#f6f6f6' : 'rgba(255, 255, 255, 0.05)'};
  box-shadow: ${({ fade }) =>
    fade ? 'none' : '2px 2px 5px rgba(22, 27, 29, 0.25)'};
  :focus {
    outline: none;
  }
  ::placeholder {
    color: ${({ darkmode }) => {
      if (darkmode) {
        return '#333435';
      }
      return '#f6f6f6';
    }};
    transition: color 0.3s;
  }
  ::-webkit-scrollbar {
    display: none;
  }
  color: ${({ darkmode }) => {
    if (darkmode) {
      return '#333435';
    }
    return '#f6f6f6';
  }};
  transition: color 0.3s;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 40px;
`;

const LeftRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;
const Button = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 15px;
  background-color: ${({ fade }) =>
    fade ? '#f6f6f6' : 'rgba(255, 255, 255, 0.05)'};
  box-shadow: ${({ fade }) =>
    fade ? 'none' : '2px 2px 5px rgba(22, 27, 29, 0.25)'};
  border: none;
  margin-right: 10px;
  font-weight: 700;

  path {
    color: ${({ darkmode }) => {
      if (darkmode) {
        return '#333435';
      }
      return '#f6f6f6';
    }};
    transition: color 0.3s;
  }

  &:hover,
  &:active {
    box-shadow: inset 2px 2px 5px rgba(22, 27, 29, 0.25),
      inset -2px -2px 5px rgba(255, 255, 255, 0.15);
  }
`;
