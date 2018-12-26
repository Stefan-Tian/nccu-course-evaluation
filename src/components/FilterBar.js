import React, { Component } from 'react';
import styled from 'styled-components';
import Icons from '../img/symbols.svg';
import { SvgSmall } from './Icon';
import Text from './Text';

const Filter = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: 60%;
  border-radius: 9rem;
  /* background-color: var(--color-gray-light); */
  background-color: #fff;
  box-shadow: var(--shadow-darker);
  padding: 1.6rem 2.8rem;
  z-index: 10;
  transform: translateY(-7.5rem);
`;

const SearchInput = styled.input`
  border: 0;
  font-size: 2.5rem;
  line-height: 3rem;
  width: 85%;
  margin-right: auto;

  &:focus {
    outline: 0;
  }
`;

const DropDown = styled.div`
  border-radius: 8px;
  position: absolute;
  width: 20rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  box-shadow: var(--shadow);
  background-color: #fff;
  bottom: 6rem;
  right: 0;
`;

const Clickable = styled(Text)`
  cursor: pointer;

  &:hover {
    color: var(--color-teal);
  }
`;

class FilterBar extends Component {
  state = {
    isOpen: false
  };

  onToggle = () => this.setState(prev => ({ isOpen: !prev.isOpen }));

  onSort = item => {
    this.props.switchSortBy(item);
    this.onToggle();
  };

  render() {
    return (
      <Filter>
        <SvgSmall w="2.2rem" h="2.2rem">
          <use xlinkHref={`${Icons}#icon-search`} />
        </SvgSmall>
        <SearchInput
          type="text"
          value={this.props.keyword}
          onChange={this.props.changeKeyword}
          placeholder="搜尋課程或老師..."
        />
        <SvgSmall
          w="2.2rem"
          h="2.2rem"
          onClick={this.onToggle}
          style={{ cursor: 'pointer' }}
        >
          <use xlinkHref={`${Icons}#icon-params`} />
        </SvgSmall>
        {this.state.isOpen ? (
          <DropDown>
            <Clickable md mb="1.2rem" onClick={() => this.onSort('homework')}>
              作業少於三次
            </Clickable>
            <Clickable md mb="1.2rem" onClick={() => this.onSort('test')}>
              考試少於三次
            </Clickable>
            <Clickable
              md
              mb="1.2rem"
              onClick={() => this.onSort('groupReport')}
            >
              無團體報告
            </Clickable>
            <Clickable md mb="1.2rem" onClick={() => this.onSort('rollCall')}>
              點名少於三次
            </Clickable>
            <Clickable md mb="1.2rem" onClick={() => this.onSort('')}>
              清除篩選
            </Clickable>
          </DropDown>
        ) : null}
      </Filter>
    );
  }
}

export default FilterBar;
