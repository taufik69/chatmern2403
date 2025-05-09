// handleChange funtion
export const handleChange = (event, setGroupInfo, setGroupError) => {
    const { name, value, files } = event.target;
    const newValue = name == "groupImage" ? files[0] : value;
    // groupInfo update
    setGroupInfo((prev) => (
        {
            ...prev,
            [name]: newValue
        }
    ))
    // remove the error property
    setGroupError((prevError) => {
        const updatedError = { ...prevError }
        if (newValue !== "") {
            // delete updatedError[`${name}Error`];
            updatedError[`${name}Error`] = ""
        }
        return updatedError;
    })
};
