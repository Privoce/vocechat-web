import React, { FC } from "react";
import { Helmet } from "react-helmet";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import WelcomePage from "./steps/welcomePage";
import ServerName from "./steps/serverName";
import AdminAccount from "./steps/adminAccount";
import WhoCanSignUp from "./steps/whoCanSignUp";
import InviteLink from "./steps/inviteLink";
import DonePage from "./steps/donePage";
import useServerSetup, { steps } from "./useServerSetup";
import StyledOnboardingPage from "./styled";

interface Props {
  step: string;
  setStep: (step: string) => void;
}

const Navigator: FC<Props> = ({ step, setStep }) => {
  const index = steps.map((value) => value.name).indexOf(step);
  const canJumpTo = steps.find((value) => value.name === step)?.canJumpTo || [];

  return (
    <div className="navigator">
      {steps.map((stepToRender, indexToRender) => {
        const clickable = canJumpTo.includes(stepToRender.name);
        const nodeCls = `node ${indexToRender === index ? "emphasized" : ""} ${
          indexToRender > index ? "disabled" : ""
        } ${clickable ? "clickable" : ""}`;
        const arrowCls = `arrow ${indexToRender >= index ? "disabled" : ""}`;
        return (
          <React.Fragment key={indexToRender}>
            <span
              className={nodeCls}
              onClick={() => {
                if (clickable) {
                  setStep(stepToRender.name);
                }
              }}
            >
              {stepToRender.label}
            </span>
            {indexToRender !== steps.length - 1 && <span className={arrowCls}>→</span>}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default function OnboardingPage() {
  const serverSetup = useServerSetup();

  return (
    <>
      <Helmet>
        <title>VoceChat Setup</title>
      </Helmet>
      <StyledOnboardingPage>
        <Navigator {...serverSetup} />
        <Swiper
          spaceBetween={50}
          allowTouchMove={false}
          onSwiper={(swiper) => serverSetup.setSwiper(swiper)}
        >
          <SwiperSlide>
            <WelcomePage {...serverSetup} />
          </SwiperSlide>
          <SwiperSlide>
            <ServerName {...serverSetup} />
          </SwiperSlide>
          <SwiperSlide>
            <AdminAccount {...serverSetup} />
          </SwiperSlide>
          <SwiperSlide>
            <WhoCanSignUp {...serverSetup} />
          </SwiperSlide>
          <SwiperSlide>
            {/* lazy call invite link API  */}
            {({ isActive }) => {
              return isActive ? <InviteLink {...serverSetup} /> : null;
            }}
          </SwiperSlide>
          <SwiperSlide>
            <DonePage {...serverSetup} />
          </SwiperSlide>
        </Swiper>
      </StyledOnboardingPage>
    </>
  );
}
