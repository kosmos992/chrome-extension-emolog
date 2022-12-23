import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStore,
  faCalendarDays,
  faFilm,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/modalSlice';

const Bubble = styled.nav`
  max-width: 120px;
  z-index: 2;
  background-color: #f6f6f6;
  padding: 16px 0;
  margin-right: 8px;
  margin-top: 24px;
  border-radius: 20px;
  position: relative;
  filter: drop-shadow(3px 3px 5px rgba(0, 0, 0, 0.25));
  &:before {
    content: '';
    position: absolute;
    top: -25px;
    left: 10%;
    width: 2px;
    background-color: transparent;
    border-bottom: 30px solid #f6f6f6;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-top: 10px solid transparent;
  }
`;
const NavItem = styled.li`
  list-style: none;
  padding: 4px 8px;
  margin: 2px 0;
  cursor: pointer;
  &:hover {
    background-color: #fff;
  }
`;
const FontSize14 = styled.span`
  font-size: 14px;
`;
const DarkIcon = styled.span`
  svg {
    width: 30px;
    padding-right: 10px;
    path {
      color: #656565;
    }
  }
`;
const Nav = () => {
  const dispatch = useDispatch();

  const handleThemeModal = () => {
    dispatch(
      openModal({
        modalType: 'ThemeModal',
        isOpen: true,
      })
    );
  };
  const handleMonthlyModal = () => {
    dispatch(
      openModal({
        modalType: 'MonthlyModal',
        isOpen: true,
      })
    );
  };
  const handleLookbackModal = () => {
    dispatch(
      openModal({
        modalType: 'LookbackModal',
        isOpen: true,
      })
    );
  };

  return (
    <>
      <Bubble>
        <ul>
          <NavItem onClick={handleThemeModal}>
            <DarkIcon>
              <FontAwesomeIcon icon={faStore} size="lg" />
            </DarkIcon>
            <FontSize14>색상테마</FontSize14>
          </NavItem>

          <NavItem onClick={handleMonthlyModal}>
            <DarkIcon>
              <FontAwesomeIcon icon={faCalendarDays} size="lg" />
            </DarkIcon>
            <FontSize14>한달기록</FontSize14>
          </NavItem>
          <NavItem onClick={handleLookbackModal}>
            <DarkIcon>
              <FontAwesomeIcon icon={faFilm} size="lg" />
            </DarkIcon>
            <FontSize14>일년기록</FontSize14>
          </NavItem>
        </ul>
      </Bubble>
    </>
  );
};

export default Nav;
