import { FC, useEffect } from "react";
import toast from "react-hot-toast";
import Modal from "../../common/component/Modal";
import StyledModal from "../../common/component/styled/Modal";
import Button from "../../common/component/styled/Button";
import useLogout from "../../common/hook/useLogout";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { resetRoleChanged } from "../../app/slices/auth.data";

interface Props {
    reasonType?: "role_changed",
}

const ReLoginModal: FC<Props> = ({ reasonType = "role_changed" }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation("auth");
    const { t: ct } = useTranslation();
    const { logout, exited, exiting } = useLogout();
    const handleLogout = () => {
        logout();
    };
    const handleReset = () => {
        dispatch(resetRoleChanged());
    };
    useEffect(() => {
        if (exited) {
            toast.success(ct("tip.logout"));
        }
    }, [exited]);
    return (
        <Modal id="modal-modal">
            <StyledModal
                buttons={
                    <>
                        <Button className="cancel" onClick={handleReset}>{t("logout.later")}</Button>
                        <Button onClick={handleLogout} className="danger">
                            {exiting ? "Logging out" : ct("action.re_login")}
                        </Button>
                    </>
                }
            >
                <div className="text-sm text-gray-400 flex justify-end items-center">
                    {t(`logout.${reasonType}`)}
                </div>
            </StyledModal>
        </Modal>
    );
};

export default ReLoginModal;
