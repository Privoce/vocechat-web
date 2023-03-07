import { useRef, useState } from 'react';
import { ViewportList } from 'react-viewport-list';
import { useTranslation } from 'react-i18next';
import User from "../../../common/component/User";
import IconAdd from "../../../assets/icons/add.svg";
import InviteModal from "../../../common/component/InviteModal";


type Props = {
    membersVisible: boolean,
    uids: number[],
    addVisible: boolean,
    cid: number,
    ownerId: number
}

const Members = ({ uids, addVisible, ownerId, cid, membersVisible }: Props) => {
    const { t } = useTranslation("chat");
    const ref = useRef<HTMLDivElement | null>(null);
    const [addMemberModalVisible, setAddMemberModalVisible] = useState(false);
    const toggleAddVisible = () => {
        setAddMemberModalVisible((prev) => !prev);
    };
    return (
        <>
            {addMemberModalVisible && <InviteModal cid={cid} closeModal={toggleAddVisible} />}
            <div ref={ref} className={`h-full flex-col gap-1 w-[226px] overflow-y-scroll p-2 shadow-[inset_1px_0px_0px_rgba(0,_0,_0,_0.1)] ${membersVisible ? "flex" : "hidden"}`}>
                {addVisible && (
                    <div className="cursor-pointer flex items-center justify-start gap-1 select-none rounded-lg p-2.5 md:hover:bg-gray-500/10" onClick={toggleAddVisible}>
                        <IconAdd className="w-6 h-6 dark:fill-slate-300" />
                        <div className="font-semibold text-sm text-gray-600 dark:text-gray-50">{t("add_channel_members")}</div>
                    </div>
                )}
                <ViewportList
                    initialPrerender={15}
                    viewportRef={ref}
                    items={uids}
                >
                    {(uid: number) => {
                        return (
                            <User
                                enableContextMenu={true}
                                cid={cid}
                                owner={ownerId == uid}
                                key={uid}
                                uid={uid}
                                dm
                                popover
                            />
                        );
                    }}
                </ViewportList>
            </div>
        </>
    );
};

export default Members;