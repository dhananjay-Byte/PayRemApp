import React from 'react'

function DisplayScheduledDetails({toggleButton,reminderData,otherData}) {
    const handleToggle = (e)=>{
        e.preventDefault();
        toggleButton();
    }
  return (
    <div className="min-h-screen flex  items-center justify-center">
            <div className="py-4 px-4 rounded-md bg-white shadow-md">
                <h3 className="text-2xl text-gray-900 font-semibold">Reminder Details</h3>
                <form className="mt-[10px]">

                    <input
                        type="text"
                        placeholder="Title"
                        name="title"
                        value={otherData.title}
                        required
                        className="w-full border border-gray-300 rounded-md py-2 px-3"
                    />

                    <div className="grid md:grid-cols-2 mt-4 grid-cols-1 gap-4">
                        <input
                            type="text"
                            placeholder="Receiver's Name"
                            name="receiverName"
                            value={reminderData.receiverName}
                            required
                            className="w-full border border-gray-300 rounded-md py-2 px-3"
                        />
                        <input
                            type="text"
                            placeholder="Your Organization Name"
                            name="organization_name"
                            value={reminderData.organization_name}
                            required
                            className="w-full border border-gray-300 rounded-md py-2 px-3"
                        />

                        <input
                            type="date"
                            placeholder="Due date"
                            name="dueDate"
                            value={otherData.dueDate}
                            required
                            className="w-full border cursor-pointer border-gray-300 rounded-md py-2 px-3"
                        />
                        <input
                            type="text"
                            placeholder="Amount"
                            name="amount"
                            value={otherData.amount}
                            required
                            className="w-full border border-gray-300 rounded-md py-2 px-3"
                        />

                        <div className="md:col-span-2">
                            <input
                                type="text"
                                placeholder="Mail Subject"
                                name="subject"
                            value={reminderData.subject}
                                required
                                className="w-full border border-gray-300 rounded-md py-2 px-3"
                            />
                        </div>


                        <div className="md:col-span-2">
                            <input
                                type="email"
                                placeholder="Receiver's E-mail"
                                name="receiverEmail"
                            value={reminderData.receiverEmail}
                                required
                                className="w-full border border-gray-300 rounded-md py-2 px-3"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <textarea
                                rows="5"
                                placeholder="Note"
                                name="note"
                                value={otherData.notes}
                                required
                                className="w-full border border-gray-300 rounded-md py-2 px-3"
                            ></textarea>
                        </div>
                        <div className="md:col-span-2 flex gap-4">


                            <button onClick={(e)=>handleToggle(e)} className="py-3 text-base font-medium rounded text-black bg-white border border-teal-600 w-full hover:bg-teal-500 hover:text-white transition duration-300">
                                Close
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
  )
}

export default DisplayScheduledDetails