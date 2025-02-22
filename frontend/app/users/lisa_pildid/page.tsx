"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

interface ImageResponse {
    data: string[];
}

const CarDetailsForm: React.FC = () => {
    const [formData, setFormData] = useState<{ images: File[] }>({
        images: [],
    });
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const carId = "12345"; // Replace with actual car ID dynamically

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get<ImageResponse>(
                    `http://localhost:8080/productImages/getCarImages/${carId}`,
                    { withCredentials: true }
                );
                if (response.status === 200) {
                    setImageUrls(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };

        fetchImages();
    }, [carId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        if (e.target.files && e.target.files.length > 0) {
            const newImages = [...formData.images];
            newImages[index] = e.target.files[0];

            setFormData({ images: newImages });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.images.length === 0) {
            alert("Please select at least one image.");
            return;
        }

        try {
            const formDataToSend = new FormData();
            formData.images.forEach((file) => {
                formDataToSend.append("files", file);
            });
            formDataToSend.append("id", carId);

            const response = await axios.post<ImageResponse>(
                "http://localhost:8080/productImages/upload",
                formDataToSend,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                alert("Images uploaded successfully");
                setImageUrls(response.data.data);
            } else {
                alert("Failed to upload images");
            }
        } catch (error) {
            console.error("Error uploading images:", error);
            alert("An error occurred while uploading images");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <div className="h-[60px] w-full text-[14px] flex justify-start items-center mt-4 mb-4">
        <span className="flex items-center ml-[50px]">
          <a href="kuuluta" className="flex items-center">
            <span className="flex items-center justify-center w-[25px] h-[25px] rounded-full bg-gray-200 text-white font-bold mr-2">
              1
            </span>
            <span>Sõiduki sisestamine</span>
          </a>
        </span>
                <span className="flex items-center ml-16">
          <span className="flex items-center justify-center w-[25px] h-[25px] rounded-full bg-lime-600 text-white font-bold mr-2">
            2
          </span>
          <span>Piltide lisamine</span>
        </span>
                <span className="flex items-center ml-16">
          <span className="flex items-center justify-center w-[25px] h-[25px] rounded-full bg-gray-200 text-white font-bold mr-2">
            3
          </span>
          <span>Teenuste tellimine</span>
        </span>
            </div>
            <p> – Foto lisamine</p>

            <div className="border border-gray-300 p-8 w-[700px]">
                <div className="grid grid-cols-5 gap-8">
                    {Array.from({ length: 30 }).map((_, index) => (
                        <div
                            key={index}
                            className="relative h-20 w-28 border border-gray-300 flex items-center justify-center"
                        >
                            <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={(e) => handleChange(e, index)}
                            />
                            <span className="text-white text-2xl flex items-center justify-center bg-orange-300 w-10 h-10 rounded-full border border-white">
                +
              </span>
                        </div>
                    ))}
                </div>
            </div>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
                Submit
            </button>

            <div className="mt-4">
                <h2>Existing Images</h2>
                <div className="grid grid-cols-5 gap-4">
                    {imageUrls.map((url, index) => (
                        <img key={index} src={url} alt={`Car Image ${index + 1}`} className="h-20 w-28 object-cover" />
                    ))}
                </div>
            </div>
        </form>
    );
};

export default CarDetailsForm;
