// import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { useAppSelector } from '../../app/store';

type Props = {
    link: string,
    size?: number
}

const QRCode = ({ link, size = 512 }: Props) => {
    const logo = useAppSelector(store => store.server.logo);
    return (
        <QRCodeCanvas value={link}
            className="rounded border border-solid border-gray-200 dark:border-gray-500 p-1 !w-full !h-full"
            size={size}
            bgColor={"#fff"}
            fgColor={"#22ccee"}
            level={"L"}
            includeMargin={false}
            imageSettings={{
                src: logo,
                x: undefined,
                y: undefined,
                height: size / 6,
                width: size / 6,
                excavate: true,
            }} />
    );
};

export default QRCode;