// import React from "react";
import dayjs from "dayjs";
export default function FAQ() {
  console.log("build time", process.env);
  return (
    <div>
      Build Time:
      {dayjs(new Date(Number(process.env.REACT_APP_BUILD_TIME + "000"))).format(
        "YYYY-MM-DD HH:mm:ss"
      )}
    </div>
  );
}
