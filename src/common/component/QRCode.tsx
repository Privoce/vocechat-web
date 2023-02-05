// import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { useAppSelector } from '../../app/store';

type Props = {
    link: string
}

const QRCode = ({ link }: Props) => {
    const logo = useAppSelector(store => store.server.logo);
    return (
        <QRCodeCanvas value={link}
            className="rounded border border-solid border-gray-200 dark:border-gray-100 p-1 !w-full !h-full"
            size={512}
            bgColor={"#fff"}
            fgColor={"#22ccee"}
            level={"L"}
            includeMargin={false}
            imageSettings={{
                src: logo,
                x: undefined,
                y: undefined,
                height: 80,
                width: 80,
                excavate: true,
            }} />
    );
};

export default QRCode;