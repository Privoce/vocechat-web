import { ConfigTip } from "@/components/ConfigTip";
import { useTranslation } from "react-i18next";
import HowToTip from "./HowToTip";
import Toggle from "@/components/styled/Toggle";
import Input from "@/components/styled/Input";
import Label from "@/components/styled/Label";
import SaveTip from "@/components/SaveTip";
import useConfig from "@/hooks/useConfig";
import { VocespaceConfig } from "@/types/server";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import Radio from "@/components/styled/Radio";
import { useAppSelector } from "@/app/store";
import { compareVersion } from "@/utils";
import { shallowEqual } from "react-redux";

export function ConfigVocespace() {
  const { t } = useTranslation("setting", { keyPrefix: "vocespace" });
  const currentVersion = useAppSelector((store) => store.server.version, shallowEqual);
  const showVoceSpace = useMemo(() => {
    return compareVersion(currentVersion, "0.5.8") >= 0;
  }, [currentVersion]);

  if (!showVoceSpace) {
    return (
      <div className="setting-container" style={{ paddingBottom: 172, height: "fit-content" }}>
        <Label>{t("old")}</Label>
      </div>
    );
  }

  const { changed, reset, values, setValues, toggleEnable, updateConfig, refetch } =
    useConfig("vocespace");

  const handleUpdate = async () => {
    const _values = values as VocespaceConfig;

    if (_values.url.trim() === "" && _values.enabled) {
      alert("Custom domain is required when enabling Vocespace.");
      return;
    }

    if (!_values.server_type) {
      _values.server_type = "vps";
    }

    // 后端快速返回结果，只要检测环境可以执行就立即返回成功，不然会一直pending等待，导致前端超时
    const res = await updateConfig(_values);

    if (res.error) {
      alert(`Auto Deploy Failed: ${res.error}`);
    } else {
      let { data } = res;

      if ((data as unknown as string) === "deployed") {
        return;
      } else {
        // 生成 sh文件让用户下载
        const el = document.createElement("a");
        let shell = (data as unknown as string)
          .replaceAll("{{", "{")
          .replaceAll("}}", "}")
          .replaceAll("{.Names}", "{{.Names}}");
        const file = new Blob([shell], { type: "text/plain" });
        el.href = URL.createObjectURL(file);
        el.download = "deploy_vocespace.sh";
        document.body.appendChild(el); // Required for this to work in FireFox
        el.click();
      }
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
  const { url, license, enabled = false, password, state, server_type } = values as VocespaceConfig;

  return (
    <div className="setting-container" style={{ paddingBottom: 172, height: "fit-content" }}>
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
            <li>
              VoceSpace Doc:{" "}
              <a href="https://doc.vocespace.com/" target="_blank" className="underline">
                doc.vocespace.com
              </a>
            </li>
          </ol>
        </div>

        <div className="input">
          <div className="flex flex-col text-sm">
            <Label htmlFor="url" style={{ position: "relative", width: "100%" }}>
              Server Type
            </Label>
          </div>
          <div>
            <a
              style={{ fontSize: 12 }}
              className="mb-2 block text-gray-400 underline"
              href={`https://vocespace.com/local_deploy/${
                server_type === "nas" ? "nas.mp4" : "vps.mp4"
              }`}
              target="_blank"
            >
              {`https://vocespace.com/local_deploy/${
                server_type === "nas" ? "nas.mp4" : "vps.mp4"
              }`}
            </a>
            <video
              src={`https://vocespace.com/local_deploy/${
                server_type === "nas" ? "nas.mp4" : "vps.mp4"
              }`}
              controls
              style={{ width: "100%", borderRadius: 8, backgroundColor: "#ddd" }}
            ></video>
          </div>

          <Radio
            options={["NAS", "VPS", "Other"]}
            values={["nas", "vps", "other"]}
            value={server_type || "vps"}
            onChange={(v) => {
              setValues((prev) => {
                if (!prev) return prev;
                return { ...prev, server_type: v as "nas" | "vps" | "other" };
              });
            }}
          />

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
            placeholder={`video.${window.location.hostname} (Your domain pointing to the current server IP)`}
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
            placeholder="This is optional field"
          />
        </div>
      </div>
      <div>
        {state && (
          <div style={{ fontSize: 12 }}>
            {state === "success" ? (
              <StateDot
                color="#00ff00"
                className="text-green-400"
                word="VoceSpace deployed successfully."
              />
            ) : (
              <>
                <StateDot
                  color="gray"
                  className="text-gray-400"
                  word="VoceSpace is not deployed yet or failed."
                />
                {enabled && (
                  <span className="text-red-500">
                    please run the deploy_vocespace.sh in your vps or server <br></br>{" "}
                    <pre>chmod +x deploy_vocespace.sh && sh ./deploy_vocespace.sh</pre>
                  </span>
                )}
              </>
            )}
          </div>
        )}
        <div
          className="list-disc list-inside text-sm text-gray-400 mb-4"
          style={{ fontSize: 12, margin: 0, paddingTop: 8 }}
        >
          {t("prerequisite.4")}
        </div>
      </div>
      {changed && (
        <SaveTip
          saveHandler={handleUpdate}
          resetHandler={reset}
        />
      )}
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
