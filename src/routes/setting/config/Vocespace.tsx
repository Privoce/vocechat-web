import { ConfigTip } from "@/components/ConfigTip";
import { useTranslation } from "react-i18next";
import HowToTip from "./HowToTip";
import Toggle from "@/components/styled/Toggle";
import Input from "@/components/styled/Input";
import Label from "@/components/styled/Label";
import SaveTip from "@/components/SaveTip";
import useConfig from "@/hooks/useConfig";
import { VocespaceConfig } from "@/types/server";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { isNull } from "lodash";

export function ConfigVocespace() {
  const { t } = useTranslation("setting", { keyPrefix: "vocespace" });
  const [fetchData, setFetchData] = useState<VocespaceConfig | null>(null);
  useEffect(() => {
    if (!isNull(fetchData?.state) && fetchData?.state !== "in_progress") {
      // 停止轮询
      if (interval.current) {
        clearInterval(interval.current);
      }
    }
  }, [fetchData]);
  const { changed, reset, values, setValues, toggleEnable, updateConfig, refetch } =
    useConfig("vocespace");
  // 定时器，用来每隔2分钟获取一次最新的配置状态，只要发现有state字段就能知道自动化部署是否成功，没有则继续轮询
  const interval = useRef<NodeJS.Timeout | null>(null);

  const handleUpdate = async () => {
    const _values = values as VocespaceConfig;
    if (_values.url.trim() === "" && _values.enabled) {
      alert("Custom domain is required when enabling Vocespace.");
      return;
    }

    // 后端快速返回结果，只要检测环境可以执行就立即返回成功，不然会一直pending等待，导致前端超时
    const { error } = await updateConfig(_values);
    if (error) {
      alert(`Auto Deploy Failed: ${error}`);
    } else {
      // 创建一个轮询定时器，每隔2分钟获取一次最新的配置状态
      if (interval.current) {
        clearInterval(interval.current);
      }
      // 先fetch一次，避免等待2分钟的空档期
      const { data } = await refetch();
      setFetchData(data as VocespaceConfig);
      interval.current = setInterval(async () => {
        console.warn("Fetching Vocespace Config for deployment status...");
        const { data } = await refetch();
        setFetchData(data as VocespaceConfig);
      }, 2 * 60 * 1000);
    }
  };

  const handleChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = evt.target.value;
    const { type = "" } = evt.target.dataset;
    setValues((prev) => {
      if (!prev) return prev;
      return { ...prev, [type]: newValue };
    });
  };
  if (!values) return null;
  const { url, license, enabled = false, password, state } = values as VocespaceConfig;

  return (
    <div className="setting-container">
      <ConfigTip title={t("desc")} desc={`${t("sub_desc")}`} />
      <div className="inputs">
        <div className="input row">
          <Label style={{ color: "#fff", display: "flex", flexWrap: "wrap" }}>
            <Label style={{ display: "inline", width: "100%" }}>Enable</Label>
            {/* <HowToTip link="https://doc.vocespace.com/zh/doc/guide/overview" text={t("how_to")} /> */}
            <div
              className="text-gray-400"
              style={{
                fontSize: 12,
              }}
            >
              {t("how_to")}
            </div>
          </Label>

          <Toggle onClick={toggleEnable} checked={enabled}></Toggle>
        </div>
        <div>
          <Label className="list-disc list-inside text-sm" style={{ fontWeight: 700 }}>
            {t("prerequisite.0")}
          </Label>
          <ol
            className="list-disc list-inside text-sm text-gray-400 mb-4"
            style={{ fontSize: 12, margin: 0 }}
          >
            <li>{t("prerequisite.1")}</li>
            <li>{t("prerequisite.2")}</li>
            <li>{t("prerequisite.3")}</li>
          </ol>
        </div>

        <div className="input">
          <div className="flex flex-col text-sm">
            <Label htmlFor="url" style={{ position: "relative", width: "100%" }}>
              {url.trim() === "" && enabled && (
                <span
                  style={{ color: "red", position: "absolute", top: -4, left: -8, fontSize: 16 }}
                >
                  *
                </span>
              )}
              Custom domain for VoceSpace
            </Label>
            <p className="text-gray-400 text-xs">{t("domain_desc")}</p>
          </div>

          <Input
            disabled={!enabled}
            data-type="url"
            onChange={handleChange}
            value={url}
            name="url"
            placeholder="Your Domain Pointing to the Current Server IP"
          />
        </div>
        <div className="input">
          <Label htmlFor="password">Redis Password (Optional)</Label>
          <Input
            disabled={!enabled}
            data-type="password"
            onChange={handleChange}
            value={password}
            name="password"
            placeholder="this is optional field"
          />
        </div>
      </div>
      <div>
        {state ? (
          <div style={{ fontSize: 12 }}>
            {state === "success" && (
              <StateDot
                color="green"
                className="text-green-400"
                word="Vocespace deployed successfully."
              />
            )}
            {state === "in_progress" && (
              <StateDot
                color="yellow"
                className="text-yellow-400"
                word="Vocespace deployment in progress..."
              />
            )}
            {state === "failed" && (
              <StateDot color="red" className="text-red-400" word="Vocespace deployment failed." />
            )}
            {state === "undeployed" && (
              <StateDot
                color="gray"
                className="text-gray-400"
                word="Vocespace is not deployed yet."
              />
            )}
          </div>
        ) : (
          <StateDot color="gray" className="text-gray-400" word="Vocespace is not deployed yet." />
        )}
        <div
          className="list-disc list-inside text-sm text-gray-400 mb-4"
          style={{ fontSize: 12, margin: 0, paddingTop: 8 }}
        >
          {t("prerequisite.4")}
        </div>
      </div>
      {changed && <SaveTip saveHandler={handleUpdate} resetHandler={reset} />}
      {/* <button onClick={handleUpdate} className="btn">update</button> */}
    </div>
  );
}

function StateDot({ color, className, word }: { color: string; className?: string; word: string }) {
  return (
    <div
      style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}
      className={className}
    >
      <div
        style={{
          display: "inline-block",
          height: 12,
          width: 12,
          backgroundColor: color,
          borderRadius: "50%",
        }}
      ></div>
      {word}
    </div>
  );
}
