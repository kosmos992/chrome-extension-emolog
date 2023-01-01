import styled from 'styled-components';
import Nav from './Nav';
import { useEffect, useRef, useState } from 'react';
import Bookmark from './Bookmark';
import User from '../atoms/User';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 16px;
`;
const HeaderTitle = styled.h1`
  line-height: 1.2;
  letter-spacing: 2px;
  font-size: 40px;
  margin: 0;
  margin-left: 16px;
`;
const BookmarkWrapper = styled.div`
  margin-top: 4px;
  margin-left: 16px;
  height: 40px;
  display: flex;
`;
const GnbLayout = styled.div`
  position: absolute;
  right: 0;
  min-width: 120px;
`;

function Header({ dataRefresh, setHidenCard }) {
  const [isOpen, setIsOpen] = useState(false);
  const onClick = () => {
    setIsOpen(!isOpen);
  };
  const ref = useRef();
  const clickOut = e => {
    if (isOpen && ref.current && !ref.current.contains(e.target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', clickOut);
    return () => {
      document.removeEventListener('mousedown', clickOut);
    };
  }, [isOpen]);
  return (
    <>
      <HeaderWrapper>
        <div>
          <HeaderTitle>
            오늘은
            <br />
            어떤가요?
          </HeaderTitle>
          <BookmarkWrapper />
        </div>
        <BookmarkWrapper>
          <Bookmark />
        </BookmarkWrapper>
        <div style={{ width: '120px' }}>
          <GnbLayout ref={ref}>
            <User onClick={onClick}>USERNAME</User>
            {isOpen ? (
              <Nav dataRefresh={dataRefresh} setHidenCard={setHidenCard} />
            ) : null}
          </GnbLayout>
        </div>
      </HeaderWrapper>
    </>
  );
}

export default Header;
