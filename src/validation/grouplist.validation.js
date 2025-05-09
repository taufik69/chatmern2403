// validationGroup
export const validationGroup = (groupInfo, setGroupError) => {
    if (!groupInfo || !setGroupError) {
        throw new Error(`Missing  groupInfo & setGroupError`)
    }
    let error = {};
    for (let field in groupInfo) {
        if (groupInfo[field] == "") {
            error[`${field}Error`] = `${field} Missing `
        }
    }
    setGroupError(error);
    return Object.keys(error).length === 0
};