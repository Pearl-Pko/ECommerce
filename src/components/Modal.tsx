import React from "react";

interface Props extends React.PropsWithChildren {
    open: boolean;
}

const Modal: React.FC<Props> = ({children, open}) => {
    console.log("open", open);
    return (
        open && (
            <div className="fixed inset-0  grid place-content-center">
                <div className="inset-0 absolute bg-black opacity-20"></div>
                <div className="z-10 ">{children}</div>
            </div>
        )
    );
};
export default Modal;
