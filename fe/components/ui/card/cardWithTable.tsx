'use client'

import * as React from "react"
import axios from 'axios'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../../components/ui/card/card"
import { FileUploader } from "react-drag-drop-files"
import { DragAndDropCard } from "./dragAndDropCard"
import { PerceptualHashTable } from "../table/perceptualHashTable"
import { PerceptualHashResponse } from "@/types/types"

const FILE_TYPES = ["JPEG", "PNG"]
const PROCESS_IMAGE_ENDPOINT = `https://morpheus-landing.onrender.com/process_image`
// const PROCESS_IMAGE_ENDPOINT = `http://127.0.0.1:8000/process_image`

export const CardWithTable = ({ text }: { text: string }) => {
    const [tableData, setTableData] = React.useState<PerceptualHashResponse>()
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleFileChange = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            setIsLoading(true);
            const response = await fetch(PROCESS_IMAGE_ENDPOINT, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setIsLoading(false);
            setTableData(data);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    }

    // Upload a file from the filesystem, then handle file change
    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className="font-manrope w-[400px] h-[400px] overflow-y-scroll bg-white rounded-3xl">
            <Card className="rounded-3xl h-full">
                <CardHeader className="flex flex-col justify-center items-center">
                    <CardTitle className="mb-2">Explore perceptual hashes</CardTitle>
                    <CardDescription>{text}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-row justify-center items-center">
                        {!tableData &&
                            <FileUploader classes="border-none" name="file" types={FILE_TYPES} onClick={handleClick} handleDrop={(file: File) => handleFileChange(file)}>
                                <input ref={fileInputRef} type="file" style={{ display: 'none' }} onChange={(e) => {
                                    if (e.target.files?.[0]) {
                                        handleFileChange(e.target.files[0]);
                                    }
                                }} />
                                <DragAndDropCard isLoading={isLoading} />
                            </FileUploader>}
                        {tableData && <PerceptualHashTable data={tableData} />}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
