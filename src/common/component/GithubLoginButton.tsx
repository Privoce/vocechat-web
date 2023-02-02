import { FC, useEffect } from "react";
import IconGithub from "../../assets/icons/github.svg";
import Button from "./styled/Button";
import { useTranslation } from "react-i18next";


type Props = {
  source?: "widget" | "webapp",
  client_id?: string;
  type?: "login" | "register";
};

const GithubLoginButton: FC<Props> = ({ type = "login", source = "webapp", client_id }) => {
  const { t } = useTranslation("auth");
  useEffect(() => {
    const handleGithubLoginStatusChange = (evt: StorageEvent) => {
      const { key, newValue } = evt;
      if (key == 'widget' && !!newValue) {
        console.log("github logged in");
        localStorage.removeItem("widget");
        const parentWindow = window.parent;
        if (parentWindow) {
          parentWindow.postMessage("RELOAD_WITH_OPEN", '*');
        }
      }
    };
    if (source == "widget") {
      window.addEventListener("storage", handleGithubLoginStatusChange);
    }

    return () => {
      if (source == "widget") {
        window.removeEventListener("storage", handleGithubLoginStatusChange);
      }
    };
  }, [source]);

  const handleGithubLogin = () => {
    const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${location.origin}/github/cb/${source}.html`;
    if (source == "webapp") {
      location.href = redirectUrl;
    } else {
      window.open(redirectUrl);
    }
  };

  return (
    <Button className="flex-center gap-3 ghost !text-gray-600 !border-[#d0d5dd]" onClick={handleGithubLogin}>
      <IconGithub className="w-6 h-6" />
      {` ${type === "login" ? t("login.github") : t("reg.github")}`}
    </Button>
  );
};
export default GithubLoginButton;
