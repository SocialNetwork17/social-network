export const getIconIdByInputType = (type: string, inputType: string) => {
    if (type === "password") {
        return inputType === "password" ? "eyeClosed" : "eyeOpen"
    }
    if (type === "date") {
        return "calendar"
    }
    return null;
};