import { useTranslation } from 'react-i18next';
// import React from 'react';
import IconAdd from '../../../assets/icons/add.person.svg';
import IconBlock from '../../../assets/icons/block.svg';
import { useAppSelector } from '../../../app/store';
import { useUpdateContactStatusMutation } from '../../../app/services/user';
import { ContactAction } from '../../../types/user';
// import toast from 'react-hot-toast';

type Props = {
    uid: number
}

const AddContactTip = (props: Props) => {
    const { t } = useTranslation("chat");
    const [updateContactStatus] = useUpdateContactStatusMutation();
    const targetUser = useAppSelector(store => store.users.byId[props.uid]);
    const handleContactStatus = (action: ContactAction) => {
        updateContactStatus({ target_uid: props.uid, action });
    };
    // useEffect(() => {
    //   if(isSuccess){
    //     toast.success(t("tip"))
    //   }
    // }, [isSuccess])

    const itemClass = `cursor-pointer flex flex-col items-center gap-1 rounded-lg w-32 text-primary-400 bg-gray-50 dark:bg-gray-800 text-sm pt-3.5 pb-3`;
    if (!targetUser) return null;
    if (targetUser.status == "added") return null;
    const blocked = targetUser.status == "blocked";
    return (
        <div className="py-4 px-10 flex flex-col items-center gap-3 bg-slate-100 dark:bg-slate-600">
            <h3 className='text-gray-700 dark:text-gray-300 text-sm font-semibold'>{blocked ? t("contact_block_tip") : t("contact_tip")}</h3>
            <ul className='flex gap-4'>
                {!blocked && <li className={itemClass} onClick={handleContactStatus.bind(null, "add")}>
                    <IconAdd className="fill-primary-400" />
                    <span>{t("add_contact")}</span>
                </li>}
                <li className={itemClass} onClick={blocked ? handleContactStatus.bind(null, "unblock") : handleContactStatus.bind(null, "block")}>
                    <IconBlock className="stroke-primary-400" />
                    <span>{blocked ? t("unblock") : t("block")}</span>
                </li>
            </ul>
        </div>
    );
};

export default AddContactTip;