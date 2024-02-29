import React, { useEffect, useState } from "react";

const SpinnerLoader = () => {
  const [text, setText] = useState();
  const [showImg, setShowImg] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setText("..............................");
    }, 1000);
  }, []);
  return <div>{showImg ? <img src="" alt="" /> : text}</div>;
};

export default SpinnerLoader;
