import { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import toast from "react-hot-toast";
import { useUpdateLogoMutation, useUpdateServerMutation } from '../../../app/services/server';
import LogoUploader from "../../../common/component/AvatarUploader";
import Input from "../../../common/component/styled/Input";
import Label from "../../../common/component/styled/Label";
import Textarea from "../../../common/component/styled/Textarea";
import SaveTip from '../../../common/component/SaveTip';
import { useAppSelector } from '../../../app/store';


const Index = () => {
    const { t } = useTranslation("setting");
    const { loginUser, server } = useAppSelector((store) => {
        return { loginUser: store.authData.user, server: store.server };
    });

    const [uploadLogo, { isSuccess: uploadSuccess }] = useUpdateLogoMutation();
    const [updateServer] = useUpdateServerMutation();
    const [changed, setChanged] = useState(false);
    const [serverValues, setServerValues] = useState<typeof server>(server);
    const handleChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newValue = evt.target.value;
        const { type = "" } = evt.target.dataset;
        setServerValues((prev) => {
            return { ...prev, [type]: newValue };
        });
    };
    const handleUpdateServer = () => {
        const { name, description } = serverValues;
        updateServer({ name, description });
    };

    const handleReset = () => {
        setServerValues(server);
    };
    useEffect(() => {
        if (server) {
            setServerValues(server);
        }
    }, [server]);
    useEffect(() => {
        if (uploadSuccess) {
            toast.success("Update logo successfully!");
        }
    }, [uploadSuccess]);
    useEffect(() => {
        if (server && serverValues) {
            const { name, description } = serverValues;
            const { name: oName, description: oDescription } = server;
            if (oName !== name || oDescription !== description) {
                setChanged(true);
            } else {
                setChanged(false);
            }
        }
    }, [server, serverValues]);
    const { name, description, logo } = serverValues;
    const isAdmin = loginUser?.is_admin;
    if (!loginUser || !serverValues) return null;
    return (
        <>
            <div className="logo">
                <div className="preview">
                    <LogoUploader
                        disabled={!isAdmin}
                        url={uploadSuccess ? `${logo}?t=${+new Date()}` : logo}
                        name={name}
                        uploadImage={uploadLogo}
                    />
                </div>
                {isAdmin && (
                    <div className="upload">
                        <div className="tip">
                            {t("overview.upload_desc")}
                        </div>
                    </div>
                )}
            </div>
            <div className="inputs">
                <div className="input">
                    <Label htmlFor="name">{t("overview.name")}</Label>
                    <Input
                        disabled={!isAdmin}
                        data-type="name"
                        onChange={handleChange}
                        value={name}
                        name="name"
                        id="name"
                        placeholder="Server Name"
                    />
                </div>
                <div className="input">
                    <Label htmlFor="desc">{t("overview.desc")}</Label>
                    <Textarea
                        disabled={!isAdmin}
                        data-type="description"
                        onChange={handleChange}
                        value={description ?? ""}
                        rows={4}
                        name="name"
                        id="name"
                        placeholder="Tell the world a bit about this server"
                    />
                </div>
            </div>
            {changed && <SaveTip saveHandler={handleUpdateServer} resetHandler={handleReset} />}

        </>
    );
};

export default Index;