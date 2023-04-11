import { useTranslation } from 'react-i18next';
// import React from 'react';
import IconAdd from '../../../assets/icons/add.person.svg';
import IconBlock from '../../../assets/icons/block.svg';

type Props = {}

const AddContactTip = (props: Props) => {
    const { t } = useTranslation("chat");
    const itemClass = `cursor-pointer flex flex-col items-center gap-1 rounded-lg w-32 text-primary-400 bg-gray-50 dark:bg-gray-800 text-sm pt-3.5 pb-3`;
    return (
        <div className="py-4 px-10 flex flex-col items-center gap-3 bg-slate-100 dark:bg-slate-600">
            <h3 className='text-gray-700 dark:text-gray-300 text-sm font-semibold'>{t("contact_tip")}</h3>
            <ul className='flex gap-4'>
                <li className={itemClass}>
                    <IconAdd className="fill-primary-400" />
                    <span>{t("add_contact")}</span>
                </li>
                <li className={itemClass}>
                    <IconBlock className="stroke-primary-400" />
                    <span>{t("block")}</span>
                </li>
            </ul>
        </div>
    );
};

export default AddContactTip;