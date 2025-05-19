import React from 'react'

export default function Modal({msg,msg2,handleClose,handleConfirm}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">{msg} </h2>
            <p className="mb-6">{msg2}</p>
            <div className="flex justify-end space-x-3">
                <button onClick={handleClose} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
                    Close
                </button>
                <button onClick={handleConfirm} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Confirm</button>
            </div>
        </div>
    </div>
  );
}
