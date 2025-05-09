const cloudinaryApi = import.meta.env.VITE_CLOUDINARY_API

export const uploadCloudinaryFile = async (formData) => {
    try {
        const res = await fetch(cloudinaryApi, {
            method: "POST",
            body: formData,
        })
        const data = await res.json()
        return data.secure_url
    } catch (error) {
        throw new Error(`Cloudinary file upload Error ${error}`)

    }

}