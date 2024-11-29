"use client";

import SelectSearch from "@/components/Custom/SelectSearch2";
import FeedBackModal from "@/components/User/MyPackage/Start/FeedBackModal";
import { useGetTypePackageFilter } from "@/services/api";
import React, { useEffect, useState } from "react";

const Page: React.FC = () => {
    const [selectedValue, setSelectedValue] = useState<string>("");

    // Handle the selection change
    const handleSelectionChange = (value: string) => {
        setSelectedValue(value);
    };

    // INTEGRASI
    const { data } = useGetTypePackageFilter();

    // Transform data from API to match the expected structure
    const transformedItems = data?.data.map((item) => ({
        id: item.id.toString(), // Ensure id is a string if needed
        value: item.name, // Map 'name' to 'nama'
    })) || [];

    const firstId = 3;    
    useEffect(() => {
        setSelectedValue(firstId.toString());
    },[]);

    const handleFeedbackSubmit = async () => {
        // Simulasi API request atau tindakan setelah feedback dikirim
        console.log("Feedback dikirim!");
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-semibold mb-4">Pilih Instansi</h1>
            <SelectSearch
                items={transformedItems}
                label="Instansi"
                placeholder="Pilih Instansi"
                value={selectedValue}
                onChange={handleSelectionChange}
            />
            <div className="mt-4">
                <p>Selected ID: {selectedValue}</p>
            </div>
            <FeedBackModal onFeedback={handleFeedbackSubmit} className="custom-class" />
        </div>
    );
};

export default Page;
