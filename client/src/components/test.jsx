import React, { useState } from "react";


function Test() {

    const [heading, setHeading] = useState("hello");

    function clickHandle(){
      setHeading("Why are you clicking the button");
    }

  return (
    <>
      <h1>{heading}</h1>
      <button 
        onClick={clickHandle} >Dont Click Me</button>
    </>
  );
}

export default Test;