'use client'

import { ModalContent } from "../data/modal/ModalContent";
import { ErrorController } from "../data/utils/ErrorController";
import Button from "./Button";

function defaultAlertError() {
    ErrorController.throwSomethingWrongError();
}

export default function ModalScreen(modalContent: ModalContent | undefined, modalClickFnc = defaultAlertError) {
    
    if (!modalContent) {
        defaultAlertError();
        return;
    }

    const modalWidth = '35rem';

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="p-8 border shadow-lg rounded-md bg-white"
                style={{ width: modalWidth }}>
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900">
                        {modalContent.title}
                    </h3>
                    <div className="mt-2 px-7 py-3">
                        <p className="text-lg text-gray-500">
                            {modalContent.desc}
                        </p>
                    </div>
                    <div className="flex justify-center mt-4">
                        { Button(modalContent.buttonText, 
                            "px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300",
                            {},
                            modalClickFnc
                        ) }
                    </div>
                </div>
            </div>
        </div>
    );

}