import React, { Component } from 'react';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import '../Slider/style.scss';
import '../Slider/custom.scss';
import {
  Nav,
  NavItem,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Button,
  Popover,
  PopoverHeader,
  PopoverBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import './style.scss';

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.toggleSort = this.toggleSort.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
    this.state = {
      sortOpen: false,
      filterOpen: false,
      typeFilter: 'all'
    };
  }

  toggleSort() {
    this.setState({
      sortOpen: !this.state.sortOpen
    });
  }

  toggleFilter() {
    this.setState({
      filterOpen: !this.state.filterOpen
    });
  }

  render() {
    return (
      <div>
        <Nav pills>
          <NavItem>
            <Dropdown isOpen={this.state.sortOpen} toggle={this.toggleSort}>
              <DropdownToggle caret size="sm">
                Sort by : {this.props.sortKey}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => this.props.handleSort('name')}>By Name</DropdownItem>
                <DropdownItem onClick={() => this.props.handleSort('rarity')}>By Rarity</DropdownItem>
                <DropdownItem onClick={() => this.props.handleSort('cost')}>By Cost</DropdownItem>
                <DropdownItem onClick={() => this.props.handleSort('atk')}>By ATK</DropdownItem>
                <DropdownItem onClick={() => this.props.handleSort('hp')}>By HP</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavItem>
          <NavItem>
            <Dropdown>
              <DropdownToggle id="Popover1" onClick={this.toggleFilter} caret size="sm">
                Card Filters
              </DropdownToggle>
            </Dropdown>
          </NavItem>
          <Popover placement="bottom" isOpen={this.state.filterOpen} target="Popover1" toggle={this.toggleFilter}>
            <PopoverHeader>Card Filters</PopoverHeader>
            <PopoverBody>
              <Form>
                <FormGroup tag="fieldset">
                  <legend>Type</legend>
                  <FormGroup check inline>
                    <Label check>
                      <Input
                        type="radio"
                        name="type"
                        value="all"
                        onChange={() => this.props.handleTypeFilter('all')}
                        checked={this.props.typeFilter === 'all'}
                      />
                      All
                    </Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Label check>
                    <Input
                        type="radio"
                        name="type"
                        value="character"
                        onChange={() => this.props.handleTypeFilter('character')}
                        checked={this.props.typeFilter === 'character'}
                      />
                      Character
                    </Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Label check>
                    <Input
                        type="radio"
                        name="type"
                        value="action"
                        onChange={() => this.props.handleTypeFilter('action')}
                        checked={this.props.typeFilter === 'action'}
                      />
                      Action
                    </Label>
                  </FormGroup>
                </FormGroup>
                <FormGroup tag="fieldset">
                  <legend>Rarity</legend>
                  <ReactBootstrapSlider
                    value={this.props.rarityFilter}
                    slideStop={this.props.handleRarityFilter}
                    range="true"
                    step={1}
                    max={4}
                    min={0}
                    orientation="horizontal"
                    ticks = {[0, 1, 2, 3, 4]}
                    ticks_labels = {["Comm", "Unco", "Rare", "Epic"]}
                    ticks_snap_bounds = { 0.5 }
                    tooltip="hide"
                    // handle="custom"
                  />
                </FormGroup>
                <FormGroup tag="fieldset">
                  <legend>Cost</legend>
                  <ReactBootstrapSlider
                    value={this.props.costFilter}
                    slideStop={this.props.handleCostFilter}
                    range="true"
                    step={1}
                    max={7}
                    min={0}
                    orientation="horizontal"
                    ticks = {[0, 1, 2, 3, 4, 5, 6, 7]}
                    ticks_labels = {["0", "1", "2", "3", "4", "5", "6"]}
                    ticks_snap_bounds = { 0.5 }
                  />
                </FormGroup>
              </Form>
              <Button
                color="secondary"
                size="sm"
                onClick={() => this.props.resetFilters()}
              >Reset</Button>
            </PopoverBody>
          </Popover>
          <NavItem>
            <Input
              placeholder="Search a card name"
              value={this.props.nameFilter}
              onChange={this.props.handleNameFilter}
              bsSize="sm"
            />
          </NavItem>
        </Nav>
      </div>
    );
  }
}

export default Navbar;