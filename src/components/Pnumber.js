import React from "react";

const Pnumber = ({pnumber, deleteNumber}) => <li> {pnumber.name} {pnumber.number} <button type="button" onClick={deleteNumber}>Delete</button></li>

export default Pnumber