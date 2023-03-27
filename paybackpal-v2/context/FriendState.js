import FriendContext from "./FriendContext"

const FriendState = (props) => {

    const friends = ['Ram', 'Shyam', 'Hari', 'Gita', 'Sita', 'Rita', 'Raj', 'Rohan', 'Rahul', 'Rajesh', 'Rakesh', 'Rajat', 'Rajeev', 'Rajiv', 'Rajkumar'];


    return(
        <FriendContext.Provider value={{friends}}>
            {props.children}
        </FriendContext.Provider>
    )
}

export default FriendState