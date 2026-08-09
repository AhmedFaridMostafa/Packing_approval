import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (
  file: File,
  path: string,
): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: path }, (error, result) => {
        if (error || !result) {
          reject(error || new Error("Failed to upload image"));
        } else {
          resolve(result.secure_url);
        }
      })
      .end(buffer);
  });
};

export const updateImage = async (
  file: File,
  public_id: string,
): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { public_id: public_id, overwrite: true },
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

export const cloneImageFromUrl = async (
  imageUrl: string,
  path: string,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(imageUrl, { folder: path }, (error, result) => {
      if (error || !result) {
        reject(error || new Error("Failed to clone image from URL"));
      } else {
        resolve(result.secure_url);
      }
    });
  });
};

export const deleteImage = async (public_id: string): Promise<void> => {
  await cloudinary.uploader.destroy(public_id);
};
