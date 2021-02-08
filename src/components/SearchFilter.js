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
            
            <div className="flex-container" style={{width: "100%", flexWrap: "wrap", "paddingTop": "10px"}}>
                {filteredData.map(item => (
                    <div>
                        <div>
                            <button onClick={handleClick} style={{marginRight: "5px"}}>{item.id}</button>
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
    )
}

export default SearchFilter