import { useState, useEffect, useCallback } from "react";
import axios from "axios";

interface ImageData {
    url: string;
    fileKey: string;
    file?: File;
    isPreview?: boolean;
}

const useImageActions = (id: string | Array<string> | undefined) => {
    const [imageData, setImageData] = useState<(ImageData | null)[]>(Array(30).fill(null));
    const [loading, setLoading] = useState(false);

    const fetchImages = useCallback(async () => {
        if (!id) {
            console.error("id is undefined");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get<string[]>(`http://localhost:8080/productImages/getCarImages/${id}`, {
                withCredentials: true,
            });

            if (response.status === 200 && Array.isArray(response.data)) {
                const newImageData = Array(30).fill(null);
                response.data.forEach((url, index) => {
                    newImageData[index] = {
                        url,
                        fileKey: url.split('/').pop() || '',
                        isPreview: false,
                    };
                });
                setImageData(newImageData);
            }
        } catch (error) {
            console.error("Error fetching images:", error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const previewUrl = URL.createObjectURL(file);

            setImageData((prevData) => {
                const newData = [...prevData];
                newData[index] = {
                    url: previewUrl,
                    fileKey: '',
                    file: file,
                    isPreview: true,
                };
                return newData;
            });
        }
    };

    const handleSubmit = async () => {
        const previewImages = imageData.filter((img): img is ImageData => img !== null && img.isPreview === true && img.file !== undefined);

        if (previewImages.length === 0) {
            alert("No new images to upload.");
            return;
        }

        try {
            const formDataToSend = new FormData();
            previewImages.forEach((imgData) => {
                if (imgData.file) {
                    formDataToSend.append("files", imgData.file);
                }
            });
            formDataToSend.append("id", id as string);

            const response = await axios.post<string[]>(`http://localhost:8080/productImages/upload`, formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });

            if (response.status === 200 && Array.isArray(response.data)) {
                alert("Images uploaded successfully");
                setImageData((prevData) => {
                    return prevData.map((imgData) => {
                        if (imgData?.isPreview) {
                            return {
                                ...imgData,
                                fileKey: response.data[previewImages.indexOf(imgData)],
                                isPreview: false,
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
            setImageData((prevData) => {
                const newData = [...prevData];
                newData[index] = null;
                return newData;
            });
            return;
        }

        if (!id || !imageToDelete?.fileKey) {
            console.error("Missing id or file key for deletion");
            return;
        }

        try {
            const response = await axios.delete(`http://localhost:8080/productImages/delete/${id}/${imageToDelete.fileKey}`, {
                withCredentials: true,
            });

            if (response.status === 200) {
                alert("Image deleted successfully");
                setImageData((prevData) => {
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

    useEffect(() => {
        fetchImages();
    }, [fetchImages]);

    return {
        imageData,
        loading,
        handleChange,
        handleSubmit,
        handleDelete,
    };
};

export default useImageActions;