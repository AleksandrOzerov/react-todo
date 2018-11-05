import React, {Component} from "react";
import "./searchPanel.css";

export default class SearchPanel extends Component {
state={
  term: ""
};

seacrhItem = (e)=>{
  const term = e.target.value;
  this.setState({term});
  this.props.seacrhItem(term)

}

  render(){
  const searchText = "Type to search";
  const searchStyle = {
    fontSize: "25px"
  };
  return (
    <input
      className="form-control search-input"
      onChange={this.seacrhItem}
      value={this.state.term}
      style={searchStyle}
      placeholder={searchText}
    />
  );
  };
}

