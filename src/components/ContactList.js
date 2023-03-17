import React from "react";
import Pnumber from "./Pnumber";

const ContactList = ({filteredNames,deleteNumber}) => {
    return (
        <ul>
                {
                    filteredNames.map(x => {
                        console.log(x.id,x.name)
                    return(
                    <Pnumber key={x.id} pnumber={x} deleteNumber={() => deleteNumber(x)}/>
                    )})
                }
            </ul>
    )
}

export default ContactList