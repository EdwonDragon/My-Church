export const CheckErrors = async (newData: any) => {
    // console.log(newData)
    if (newData.errors?.length > 0) {
        const errorMessages = await newData.errors.map((e: any) => e.message).join(", ");
        throw new Error(errorMessages);
    }
};
