import { useState } from "react";
import Select from "../../../../common/component/styled/Select";
import Button from "../../../../common/component/styled/Button";
import Input from "../../../../common/component/styled/Input";
import Toggle from "../../../../common/component/styled/Toggle";
import options from "./items.json";
import Styled from "./styled";
// import IconPlus from "../../../../assets/icons/plus.circle.svg";
import IconMinus from "../../../../assets/icons/minus.circle.svg";

export default function IssuerList({ issuers = [] }) {
  const [select, setSelect] = useState(undefined);
  const [newDomain, setNewDomain] = useState("");
  const handleNewDomain = (evt) => {
    setNewDomain(evt.target.value);
  };
  const disableBtn = !(newDomain || !!select?.value);
  return (
    <Styled>
      <ul className="issuers">
        {issuers.map(({ enable, favicon, domain }) => {
          return (
            <li key={domain} className="issuer">
              <div className="left">
                <IconMinus className="remove" />
                <div className="data">
                  <img src={favicon} alt="logo" className="icon" />
                  <Input
                    readOnly
                    value={domain}
                    prefix="https://"
                    placeholder="Issuer Domain"
                    className="url"
                  />
                </div>
              </div>
              <div className="right">
                <Toggle data-checked={enable} />
              </div>
            </li>
          );
        })}

        <li className="issuer add">
          <div className="left">
            <Select options={options} updateSelect={setSelect} />
            <div className="data">
              <Input
                onChange={handleNewDomain}
                readOnly={!!select?.value}
                value={select?.value || newDomain}
                prefix="https://"
                placeholder="domain.com"
                className="url"
              />
            </div>
          </div>
          <div className="right">
            <Button disabled={disableBtn}>Add</Button>
          </div>
        </li>
      </ul>
      {/* <IconPlus className="add" /> */}
    </Styled>
  );
}
