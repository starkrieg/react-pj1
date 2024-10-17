'use client'

export default class ModalController {

    defaultAlertError() {
        alert('Something went wrong! Please report this!');
    }

    createModal(modalType = 'Unknown', modalClickFnc = this.defaultAlertError) {
        let title = '';
        let desc = '';
        let buttonText = '';

        switch (modalType) {
            case 'Death':
                title = 'You died!';
                desc = 'It\'s okay, you can go again.';
                buttonText = 'Go again';
                break;
            default:
                title = 'Something went wrong!';
                desc = 'Please report this';
                buttonText = 'Close';
                break;
        }

        return (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="p-8 border w-96 shadow-lg rounded-md bg-white">
                <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900">
                    {title}
                </h3>
                <div className="mt-2 px-7 py-3">
                    <p className="text-lg text-gray-500">
                        {desc}
                    </p>
                </div>
                <div className="flex justify-center mt-4">
    
                    {/* Using useRouter to dismiss modal*/}
                    <button
                    onClick={modalClickFnc}
                    className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    >
                    {buttonText}
                    </button>
    
                </div>
                </div>
            </div>
            </div>
        );
    }

}