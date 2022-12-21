import clsx from 'clsx';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { Orbit } from "@uiball/loaders";
import { useGetUserByAdminQuery, useUpdateUserMutation } from '../../../app/services/user';
import IconEdit from '../../../assets/icons/edit.svg';
import IconSave from '../../../assets/icons/save.svg';
import IconCancel from '../../../assets/icons/close.circle.svg';
type Props = {
    uid: number
}

const WebhookEdit = ({ uid }: Props) => {
    const formRef = useRef<HTMLFormElement>(null);
    const [editable, setEditable] = useState(false);
    const [url, setUrl] = useState("");
    const { data, isSuccess, refetch } = useGetUserByAdminQuery(uid);
    const [updateUser, { isSuccess: updateSuccess, isLoading: isUpdating }] = useUpdateUserMutation();
    useEffect(() => {
        if (isSuccess && data) {
            setUrl(data.webhook_url || "");
        }
    }, [data, isSuccess]);
    useEffect(() => {
        if (updateSuccess) {
            refetch();
        }
    }, [updateSuccess]);

    const handleEdit = async () => {
        if (editable && formRef) {
            const form = formRef.current;
            // 检查格式
            if (!form?.checkValidity()) {
                form?.reportValidity();
                return;
            }
            // 保存编辑
            const webhook_url = new FormData(form).get("webhook") as string;
            const resp = await updateUser({ id: uid, webhook_url });
            console.log("ressssss", resp);
            if ("error" in resp) {
                switch (resp.error.status) {
                    case 406:
                        toast.error("Not Valid URL!");
                        break;

                    default:
                        break;
                }
                return;
            }
        }
        setEditable(prev => !prev);
    };
    const handleEditable = () => {
        setEditable(true);
    };
    const handleCancelEdit = () => {
        setEditable(false);
        const form = formRef.current;
        if (form) {
            const input = form.querySelector("input");
            input!.value = data?.webhook_url || "";
        }
    };
    return (
        <div>
            {(url || editable || updateSuccess) ?
                <div className="flex gap-2">
                    <form action="/" ref={formRef} onSubmit={(evt) => {
                        evt.preventDefault();
                        handleEdit();
                    }}>
                        <input readOnly={!editable} required autoFocus type="url" name='webhook' defaultValue={url} className={clsx("text-sm text-gray-500 px-2 py-1", editable ? "border border-solid border-gray-200 bg-gray-50" : "bg-transparent")} />
                    </form>
                    <button type='button' disabled={isUpdating} onClick={handleEdit}>
                        {isUpdating ? <Orbit size={16} /> : editable ?
                            <IconSave className="stroke-gray-500 !w-5 !h-5" />

                            : <IconEdit className="fill-gray-500 !w-5 !h-5" />}
                    </button>
                    {editable && !isUpdating && <button type='button' disabled={isUpdating} onClick={handleCancelEdit}>
                        <IconCancel className="!w-5 !h-5 fill-gray-500" />
                    </button>}
                </div>
                :
                <button type='button' className="rounded-full bg-primary-50 text-green-600 text-xs py-0.5 px-2" onClick={handleEditable}>
                    Set Webhook
                </button>}
        </div>
    );
};

export default WebhookEdit;