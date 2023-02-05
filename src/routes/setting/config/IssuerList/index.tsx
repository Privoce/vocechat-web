import { ChangeEvent, FC, useState } from "react";
import { useTranslation } from "react-i18next";
import Select, { Option } from "../../../../common/component/styled/Select";
import Button from "../../../../common/component/styled/Button";
import Input from "../../../../common/component/styled/Input";
import Toggle from "../../../../common/component/styled/Toggle";
import options from "./items.json";
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
  const { t } = useTranslation();
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
    <div className="py-4 w-full flex flex-col gap-4">
      <ul className="flex flex-col gap-4">
        {issuers.map(({ enable, favicon, domain }) => {
          return (
            <li key={domain} className="flex items-center justify-between gap-10">
              <div className="flex-1 flex items-center justify-between">
                <IconMinus
                  className="cursor-pointer"
                  onClick={() => {
                    onChange(issuers.filter((issuer) => issuer.domain !== domain));
                  }}
                />
                <div className="flex items-center justify-between gap-4">
                  {Boolean(favicon) && <img src={favicon} alt="logo" className="w-8 h-8" />}
                  <Input
                    readOnly
                    value={domain}
                    prefix="https://"
                    placeholder="Issuer Domain"
                    className="w-[280px]"
                  />
                </div>
              </div>
              <div className="w-14 flex justify-end">
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

        <li className="flex items-center justify-between gap-10 cursor-pointer">
          <div className="flex-1 flex items-center justify-between">
            <Select
              options={options.map((option) => ({
                ...option,
                selected: issuers.some((issuer) => issuer.domain === option.value)
              }))}
              current={select}
              updateSelect={setSelect}
            />
            <div className="flex items-center justify-between gap-4">
              <Input
                onChange={handleNewDomain}
                readOnly={!!select?.value}
                value={select?.value || newDomain}
                prefix="https://"
                placeholder="domain.com"
                className="w-[280px]"
              />
            </div>
          </div>
          <div className="w-14 flex justify-end">
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
              {t("action.add")}
            </Button>
          </div>
        </li>
      </ul>
      {/* <IconPlus className="add" /> */}
    </div>
  );
};

export default IssuerList;
