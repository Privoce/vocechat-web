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
import Button from "@/components/styled/Button";
import { useHealthCheckVocespaceMutation } from "@/app/services/server";
import toast from "react-hot-toast";
import { m } from "framer-motion";

export function ConfigVocespace() {
  const { t } = useTranslation("setting", { keyPrefix: "vocespace" });
  const [domains, setDomains] = useState<Map<string, boolean>>(new Map());
  const currentVersion = useAppSelector((store) => store.server.version, shallowEqual);
  const showVoceSpace = useMemo(() => {
    return compareVersion(currentVersion, "0.5.8") >= 0;
  }, [currentVersion]);
  const [healthCheckVocespace] = useHealthCheckVocespaceMutation();

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

    // 将 Map 转换为普通对象以便 JSON 序列化
    const submitValues = {
      ..._values,
      additional_domains:
        _values.additional_domains instanceof Map
          ? Object.fromEntries(_values.additional_domains)
          : _values.additional_domains,
    };

    // 后端快速返回结果，只要检测环境可以执行就立即返回成功,不然会一直pending等待，导致前端超时
    const res = await updateConfig(submitValues as any);

    if (res.error) {
      toast.error(`Auto Deploy Failed: ${res.error}`);
    } else {
      let { data } = res;

      if ((data as unknown as string) === "deployed") {
        return;
      } else {
        // 生成 sh文件让用户下载
        const el = document.createElement("a");
        let shell = data as unknown as string;
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

  const handleChangeDomains = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const newValue = evt.target.value;
    setDomains((prev) => {
      const newDomains = prev instanceof Map ? new Map(prev) : new Map();
      let i = 0;
      for (let key of newDomains.keys()) {
        if (i === index) {
          newDomains.delete(key);
          newDomains.set(newValue, false);
          break;
        }
        i++;
      }
      // also update to values，
      setValues((v) => {
        if (!v) return v;
        return { ...v, additional_domains: newDomains };
      });
      return newDomains;
    });
  };

  const healthCheck = async (domain: string) => {
    const res = await healthCheckVocespace({ url: domain });
    const check = (res.data as unknown as any)?.check || false;
    if (check) {
      // 如果domain是url就更新状态为成功
      if (domain === (values as VocespaceConfig).url) {
        setValues((prev) => {
          if (!prev) return prev;
          return { ...prev, state: "success" };
        });
      } else {
        // 更新additional_domains状态，将map的value设置为true
        setDomains((prev) => {
          const newDomains = new Map(prev);
          if (newDomains.has(domain)) {
            newDomains.set(domain, true);
          }
          // also update to values，
          setValues((v) => {
            if (!v) return v;
            return { ...v, additional_domains: newDomains };
          });
          return newDomains;
        });
      }
    } else {
      toast.error(`${domain} ${t("failed")}`);
    }
  };

  // add new input field for vocespace domains
  const addInput = () => {
    setDomains((prev) => {
      const newDomains = prev instanceof Map ? new Map(prev) : new Map();
      newDomains.set("", false);
      // also update to values，
      setValues((v) => {
        if (!v) return v;
        return { ...v, additional_domains: newDomains };
      });
      return newDomains;
    });
  };

  useEffect(() => {
    if (!values) return;

    const { additional_domains } = values as VocespaceConfig;
    console.warn("vocespace additional_domains:", additional_domains);
    if (additional_domains) {
      // 将普通对象转换为 Map
      const domainsMap =
        additional_domains instanceof Map
          ? additional_domains
          : new Map(Object.entries(additional_domains));
      setDomains(domainsMap as Map<string, boolean>);
    }
  }, [values]);

  if (!values) return null;
  const {
    url,
    license,
    enabled = false,
    password,
    state,
    server_type,
    additional_domains,
  } = values as VocespaceConfig;

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
            disabled={!enabled}
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

          <div className="flex gap-2" style={{ width: "100%" }}>
            <Input
              className="flex-1"
              disabled={!enabled}
              data-type="url"
              onChange={handleChange}
              value={url}
              name="url"
              placeholder={`video.${window.location.hostname} (Your domain pointing to the current server IP)`}
            />

            <Button
              style={{ height: 38, backgroundColor: state === "success" ? "#00ff00dd" : undefined }}
              onClick={async () => await healthCheck(url)}
              disabled={!enabled}
            >
              {state === "success" ? t("checked") : t("check")}
            </Button>
            <Button style={{ height: 38 }} onClick={addInput} disabled={!enabled}>
              {t("add")}
            </Button>
          </div>
          {domains &&
            domains.size > 0 &&
            domains.entries().map(([domain, checked], index) => (
              <div key={index} className="flex gap-2 mt-2" style={{ width: "100%" }}>
                <Input
                  className="flex-1"
                  disabled={!enabled}
                  data-type="url"
                  onChange={(evt) => handleChangeDomains(evt, index)}
                  value={domain}
                  // name="url"
                  placeholder={`video.${window.location.hostname} (Your domain pointing to the current server IP)`}
                />
                <Button
                  style={{ height: 38, backgroundColor: checked ? "#00ff00dd" : undefined }}
                  onClick={async () => await healthCheck(domain)}
                  disabled={!enabled}
                >
                  {checked ? t("checked") : t("check")}
                </Button>
              </div>
            ))}
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
