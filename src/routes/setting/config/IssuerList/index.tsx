import { ChangeEvent, FC, useState } from "react";
import Select, { Option } from "../../../../common/component/styled/Select";
import Button from "../../../../common/component/styled/Button";
import Input from "../../../../common/component/styled/Input";
import Toggle from "../../../../common/component/styled/Toggle";
import options from "./items.json";
import Styled from "./styled";
import IconMinus from "../../../../assets/icons/minus.circle.svg";

interface Issuer {
  domain: string;
  enable: boolean;
  favicon: string;
}

interface Props {
  issuers: Issuer[];
  onChange: (issuers: Issuer[]) => void;
}

const IssuerList: FC<Props> = ({ issuers = [], onChange }) => {
  const [select, setSelect] = useState<Partial<Option> | null>(null);
  const [newDomain, setNewDomain] = useState("");

  const handleNewDomain = (evt: ChangeEvent<HTMLInputElement>) => {
    setNewDomain(evt.target.value);
  };

  const disableBtn =
    (!newDomain && !select?.value) ||
    !select?.title ||
    issuers.some((issuer) => issuer.domain === newDomain);

  return (
    <Styled>
      <ul className="issuers">
        {issuers.map(({ enable, favicon, domain }) => {
          return (
            <li key={domain} className="issuer">
              <div className="left">
                <IconMinus
                  className="remove"
                  onClick={() => {
                    onChange(issuers.filter((issuer) => issuer.domain !== domain));
                  }}
                />
                <div className="data">
                  {Boolean(favicon) && <img src={favicon} alt="logo" className="icon" />}
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
                <Toggle
                  data-checked={enable}
                  onClick={() => {
                    onChange(
                      issuers.map((issuer) => ({
                        ...issuer,
                        enable: issuer.domain === domain ? !enable : issuer.enable
                      }))
                    );
                  }}
                />
              </div>
            </li>
          );
        })}

        <li className="issuer add">
          <div className="left">
            <Select
              options={options.map((option) => ({
                ...option,
                selected: issuers.some((issuer) => issuer.domain === option.value)
              }))}
              current={select}
              updateSelect={setSelect}
            />
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
            <Button
              disabled={disableBtn}
              onClick={() => {
                const found = options.find((option) => option.value === select?.value);
                if (!found) return;
                const { icon, value } = found;
                onChange(
                  issuers.concat({
                    enable: true,
                    favicon: icon || "",
                    domain: value || newDomain
                  })
                );
                setSelect(null);
                setNewDomain("");
              }}
            >
              Add
            </Button>
          </div>
        </li>
      </ul>
      {/* <IconPlus className="add" /> */}
    </Styled>
  );
};

export default IssuerList;
