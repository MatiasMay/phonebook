import React from "react";
import Pnumber from "./Pnumber";

const ContactList = ({filteredNames}) => {
    return (
        <ul>
                {
                    filteredNames.map(x => {
                        console.log(x.id,x.name)
                    return(
                    <Pnumber key={x.id} pnumber={x}/>
                    )})
                }
            </ul>
    )
}

export default ContactList