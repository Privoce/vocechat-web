import { useState } from "react";
import { useAppSelector } from "../../../app/store";



const useVoice = (uid: number) => {
    const [engine, setEngine] = useState(window.VoiceEngine);
    const { voicing } = useAppSelector(store => {

        return {
            voicing: store.users.byId[uid].voice ?? false
        };
    });


    return {
        voicing,

    };

};

export default useVoice;