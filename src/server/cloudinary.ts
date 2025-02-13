import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function uploadImage(
  avatarFile: File,
  path: string,
  fileName: string,
): Promise<UploadApiResponse> {
  const arrayBuffer = await avatarFile.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  return await new Promise((resolve, reject) =>
    cloudinary.uploader
      .upload_stream(
        {
          folder: `/${path}`,
          public_id: fileName,
          filename_override: fileName,
          resource_type: "image",
          chunk_size: 5000000,
        },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          } else {
            if (result) {
              resolve(result);
            } else {
              reject(new Error("Upload result is undefined"));
            }
          }
        },
      )
      .end(buffer),
  );
}

export async function deleteImage(publicId: string): Promise<void> {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    if (result.result !== "ok") {
      console.log(result);
      throw new Error("Failed to delete image from Cloudinary");
    }
  } catch (error) {
    console.error("Cloudinary deletion error:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to delete image from Cloudinary",
    );
  }
}

export async function updateImage(
  newImageFile: File,
  path: string,
  fileName: string,
  oldPublicId?: string,
): Promise<UploadApiResponse> {
  try {
    if (oldPublicId) await deleteImage(oldPublicId);
    const result = await uploadImage(newImageFile, path, fileName);
    return result;
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to update image in Cloudinary",
    );
  }
}

export async function renameImage(
  oldPublicId: string,
  newPublicId: string,
): Promise<UploadApiResponse> {
  try {
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader.rename(
        oldPublicId,
        newPublicId,
        { overwrite: true },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }
          if (result) {
            resolve(result);
          } else {
            reject(new Error("Rename result is undefined"));
          }
        },
      );
    });

    if (!result) {
      throw new Error("Failed to rename image in Cloudinary");
    }

    return result;
  } catch (error) {
    console.error("Cloudinary rename error:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to rename image in Cloudinary",
    );
  }
}
