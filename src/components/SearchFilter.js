import React, { useState } from 'react';

const SearchFilter = (props) => {
    //Inputs data which can be searched for. Saved in "filtered data".
    const [filter, setFilter] = useState("");
    const [data, setData] = useState(props.data);

    let handleChange = event => {
        if(event.target.value.length > -1){
            setFilter(event.target.value);
        }
        
    };

    let handleClick = event => {
        props.selectTag(event.target)
    }
    
    const lowercasedFilter = filter.toLowerCase();
    console.log(data)
    const filteredData = data.filter(item => {
        return Object.keys(item).some(key =>
            item[key].toLowerCase().includes(lowercasedFilter)
        );
    });
    return (
        <div>
            <input value={filter} onChange={handleChange}></input>
            {filteredData.map(item => (
                <div key={item.email}>
                    <div>
                        <button onClick={handleClick}>{item.id}</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SearchFilter