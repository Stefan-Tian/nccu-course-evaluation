import styled from 'styled-components';

export const List = styled.div`
  font-size: 1.4rem;
  line-height: 3rem;
  font-weight: 500;
  margin-bottom: ${({ mb }) => mb};
`;

export const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FixedListItem = styled.div`
  display: flex;
  align-items: center;
`;

export const LeftList = styled.div`
  width: 28rem;
  margin-right: 2rem;
`;

export const RightList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 7rem;
`;
