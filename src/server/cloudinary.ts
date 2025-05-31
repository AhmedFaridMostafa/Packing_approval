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

export async function moveImageToNewFolder(
  oldPublicId: string,
  newFolder: string,
  newFileName: string,
): Promise<UploadApiResponse> {
  try {
    console.log("Moving image:", { oldPublicId, newFolder, newFileName });

    // First, check if the source image exists
    try {
      await cloudinary.api.resource(oldPublicId);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error(`Source image not found: ${oldPublicId}`);
      }
    }

    // Use the upload method with the existing image URL to create a copy
    const imageUrl = cloudinary.url(oldPublicId, {
      secure: true,
      resource_type: "image",
    });

    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader.upload(
        imageUrl,
        {
          folder: newFolder,
          public_id: newFileName,
          resource_type: "image",
          overwrite: true,
        },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }
          if (result) {
            resolve(result);
          } else {
            reject(new Error("Image move result is undefined"));
          }
        },
      );
    });

    // Only delete the old image after successful copy
    if (result && result.public_id) {
      try {
        await deleteImage(oldPublicId);
      } catch (deleteError) {
        console.warn("Failed to delete old image after move:", deleteError);
        // Don't throw here as the main operation succeeded
      }
    }

    return result;
  } catch (error) {
    console.error("Cloudinary move error:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to move image to new folder in Cloudinary",
    );
  }
}
