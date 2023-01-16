import { connect } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = (props) => {

    const handleChange = (event) => {
      // input-field value is in variable event.target.value
      const value = event.target.value;
      props.setFilter(value)      
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }

const mapStateToProps = (state) => {
  return {
    filter : state.filter
  }
}

const mapDispatchToProps = {
  setFilter
}

const connectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter)

export default connectedFilter