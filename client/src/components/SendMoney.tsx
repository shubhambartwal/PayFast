const SendMoney = () => {
    return (
        <div className="flex h-[100vh] items-center justify-center">
            <div className="border rounded-xl p-2 text-center w-[35%]">
                <div className="p-3 m-3">Send Money</div>
                <hr />
                <div className="p-3 m-3"><h1>Friend's Name</h1>
                    <p>Amount(INR)</p>
                    <input className="border m-1" placeholder='Enter the Amount...'></input>
                </div>
                <hr/>
                <div className="p-3 m-3"><button className="bg-blue-600  rounded-xl p-2">Initiate Transfer</button></div>
            </div>
        </div>
    )
}

export default SendMoney