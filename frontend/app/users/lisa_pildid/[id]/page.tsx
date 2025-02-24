"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation'; // Import useRouter
import Link from "next/link";

interface ImageData {
    url: string;
    fileKey: string;
    file?: File;
    isPreview?: boolean;
}

const AddPictureForm: React.FC = () => {
    const [imageData, setImageData] = useState<(ImageData | null)[]>(Array(30).fill(null));
    const { id } = useParams();
    const router = useRouter();

    const fetchImages = async () => {
        if (!id) {
            console.error("id is undefined");
            return;
        }

        try {
            const response = await axios.get<string[]>(
                `http://localhost:8080/productImages/getCarImages/${id}`,
                { withCredentials: true }
            );

            if (response.status === 200 && Array.isArray(response.data)) {
                const newImageData = Array(30).fill(null);
                response.data.forEach((url, index) => {
                    newImageData[index] = {
                        url,
                        fileKey: url.split('/').pop() || '',
                        isPreview: false
                    };
                });
                setImageData(newImageData);
            }
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    };

    useEffect(() => {
        fetchImages();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const previewUrl = URL.createObjectURL(file);

            setImageData(prevData => {
                const newData = [...prevData];
                newData[index] = {
                    url: previewUrl,
                    fileKey: '',
                    file: file,
                    isPreview: true
                };
                return newData;
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const previewImages = imageData.filter((img): img is ImageData => {
            return img !== null && img.isPreview === true && img.file !== undefined;
        });


        if (previewImages.length === 0) {
            alert("No new images to upload.");
            return;
        }

        try {
            const formDataToSend = new FormData();
            previewImages.forEach(imgData => {
                if (imgData.file) {
                    formDataToSend.append("files", imgData.file);
                }
            });
            formDataToSend.append("id", id as string);


            const response = await axios.post<string[]>(
                "http://localhost:8080/productImages/upload",
                formDataToSend,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true,
                }
            );

            if (response.status === 200 && Array.isArray(response.data)) {
                alert("Images uploaded successfully");

                setImageData(prevData => {
                    return prevData.map(imgData => {
                        if (imgData?.isPreview) {
                            return {
                                ...imgData,
                                fileKey: response.data[previewImages.indexOf(imgData)],
                                isPreview: false
                            };
                        }
                        return imgData;
                    });
                });
            } else {
                alert("Failed to upload images");
            }
        } catch (error) {
            console.error("Error uploading images:", error);
            alert("An error occurred while uploading images");
        }
    };

    const handleDelete = async (index: number) => {
        const imageToDelete = imageData[index];

        if (!imageToDelete) return;

        if (imageToDelete.isPreview) {
            setImageData(prevData => {
                const newData = [...prevData];
                newData[index] = null;
                return newData;
            });
            return;
        }

        if (!id || !imageToDelete?.fileKey) {
            console.error("Missing slug or file key for deletion");
            return;
        }

        try {
            const response = await axios.delete(
                `http://localhost:8080/productImages/delete/${id}/${imageToDelete.fileKey}`,
                { withCredentials: true }
            );

            if (response.status === 200) {
                alert("Image deleted successfully");
                setImageData(prevData => {
                    const newData = [...prevData];
                    newData[index] = null;
                    return newData;
                });
            } else {
                alert("Failed to delete image");
            }
        } catch (error) {
            console.error("Error deleting image:", error);
            alert("An error occurred while deleting the image");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <div className="h-[60px] w-full text-[14px] flex justify-start items-center mt-4 mb-4">
                <span className="flex items-center ml-[50px]">
                    <Link href={`/users/edit/${id}`} className="flex items-center">
                        <span
                            className="flex items-center justify-center w-[25px] h-[25px] rounded-full bg-gray-200 text-white font-bold mr-2">
                            1
                        </span>
                        <span>Sõiduki sisestamine</span>
                    </Link>
                </span>
                <span className="flex items-center ml-16">
                    <span
                        className="flex items-center justify-center w-[25px] h-[25px] rounded-full bg-lime-600 text-white font-bold mr-2">
                        2
                    </span>
                    <span>Piltide lisamine</span>
                </span>
                <span className="flex items-center ml-16">
                      <Link href={`/users/confirm_listing/${id}`} className="flex items-center">
                    <span
                        className="flex items-center justify-center w-[25px] h-[25px] rounded-full bg-gray-200 text-white font-bold mr-2">
                        3
                    </span>
                    <span>Kuulutuse kinnitamine</span>
                          </Link>
                </span>
            </div>

            <p> – Foto lisamine</p>

            <div className="border border-gray-300 p-8 w-[700px]">
                <div className="grid grid-cols-5 gap-8">
                    {imageData.map((image, index) => (
                        <div
                            key={index}
                            className="relative h-20 w-28 border border-gray-300 flex items-center justify-center"
                        >
                            {image ? (
                                <>
                                    <img
                                        src={image.url}
                                        alt={`Image ${index + 1}`}
                                        className="h-full w-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(index)}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                                    >
                                        X
                                    </button>
                                </>
                            ) : (
                                <>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={(e) => handleChange(e, index)}
                                    />
                                    <span
                                        className="text-white text-2xl flex items-center justify-center bg-orange-300 w-10 h-10 rounded-full border border-white">
                                        +
                                    </span>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                disabled={!imageData.some(img => img?.isPreview)}
            >
                Lisa pilte
            </button>
        </form>
    );
};

export default AddPictureForm;
