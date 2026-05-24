import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "packing_approval" }, (error, result) => {
        if (error || !result) {
          reject(error || new Error("Failed to upload image"));
        } else {
          resolve(result.secure_url);
        }
      })
      .end(buffer);
  });
};

export const updateImage = async (url: string, file: File): Promise<string> => {
  const publicId = url
    .split("/")
    .slice(-2)
    .join("/")
    .replace(/\.[^/.]+$/, "");

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { folder: "packing_approval", public_id: publicId, overwrite: true },
        (error, result) => {
          if (error || !result) {
            reject(error || new Error("Failed to update image"));
          } else {
            resolve(result.secure_url);
          }
        },
      )
      .end(buffer);
  });
};

export const deleteImage = async (url: string): Promise<void> => {
  const publicId = url
    .split("/")
    .slice(-2)
    .join("/")
    .replace(/\.[^/.]+$/, "");
  await cloudinary.uploader.destroy(publicId);
};
