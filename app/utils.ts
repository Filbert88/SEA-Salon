const uploadFileToCloudinary = async (file: File | null) => {
    if (!file) return "";

    const { signature, timestamp } = await (
      await fetch("/api/signature")
    ).json();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("timestamp", timestamp.toString());
    formData.append("signature", signature);

    const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    if (!apiKey || !cloudName) {
      console.error("Cloudinary API key or cloud name is not defined.");
      return "";
    }

    formData.append("api_key", apiKey);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      console.log("ini data url", data.url);
      return response.ok ? data.url : "";
    } catch (error) {
      console.error("Error uploading file:", error);
      return "";
    }
};

export default uploadFileToCloudinary;


