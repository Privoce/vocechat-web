// import { useState, useEffect, ChangeEvent } from "react";
import Profile from "../../common/component/Profile";
export default function Overview({ id = 0 }) {

  return (
    <section className="w-full h-full flex justify-center items-start">
      <Profile uid={id} />
    </section>
  );
}
