import clsx from 'clsx';
import React from 'react';

type Props = {
    strength?: number
}
// 0：质量未知。
// 1：质量极好。
// 2：用户主观感觉和极好差不多，但码率可能略低于极好。
// 3：用户主观感受有瑕疵但不影响沟通。
// 4：勉强能沟通但不顺畅。
// 5：网络质量非常差，基本不能沟通。
// 6: 网络连接断开，完全无法沟通。

const Signal = ({ strength = 0 }: Props) => {
    const finalStrength = 6 - strength;
    const color = finalStrength <= 2 ? `bg-red-700` : (finalStrength == 3 ? `bg-yellow-700` : `bg-green-700`);
    let bgColor = ` bg-gray-500`;
    return (
        <div className='w-6 h-6 flex-center'>
            <div className="w-[18px] h-[15px] flex items-end gap-[2px]">
                <span className={clsx('h-1/5 w-[2px]', finalStrength == 0 ? bgColor : color)}></span>
                <span className={clsx('h-2/5 w-[2px]', finalStrength <= 1 ? bgColor : color)}></span>
                <span className={clsx('h-3/5 w-[2px]', finalStrength <= 2 ? bgColor : color)}></span>
                <span className={clsx('h-4/5 w-[2px]', finalStrength <= 3 ? bgColor : color)}></span>
                <span className={clsx('h-full w-[2px]', finalStrength <= 4 ? bgColor : color)}></span>
            </div>
        </div>
    );
};

export default Signal;