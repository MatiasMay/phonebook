import React from "react";


const Filterer = ({nameFilter,handleFilter}) =>{
    return(
        <div>Search by name: <input value={nameFilter} onChange={handleFilter}/></div>
        )}

export default Filterer