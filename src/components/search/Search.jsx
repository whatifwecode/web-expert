import React from "react";
import IInput from "../UI/input/IInput.jsx";
import '../../styles/search/search.scss'

const Search = ({ value, onChange }) => {
    return (
        <div className={'search'}>
            <IInput
            type="text"
            placeholder="search"
            value={value}
            onChange={onChange}
            />
        </div>
        )
}

export default Search;