'use client'

import * as React from "react"
import axios from 'axios'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card/card"
import { FileUploader } from "react-drag-drop-files"
import { DragAndDropCard } from "./dragAndDropCard"
import { PerceptualHashTable } from "../table/perceptualHashTable"
import { PerceptualHashResponse } from "@/types/types"

const FILE_TYPES = ["JPEG", "PNG"]
const PROCESS_IMAGE_ENDPOINT = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/process_image/`

export const CardWithTable = () => {
    const [tableData, setTableData] = React.useState<PerceptualHashResponse>()

    const handleFileChange = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(PROCESS_IMAGE_ENDPOINT, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setTableData(response.data);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    }

    return (
        <div className="font-manrope w-[400px] h-[400px] overflow-y-scroll bg-white rounded-3xl">
            <Card className="rounded-3xl h-full">
                <CardHeader className="flex flex-col justify-center items-center">
                    <CardTitle className="mb-2">Explore perceptual hashes</CardTitle>
                    <CardDescription>Drag and drop an image below!</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-row justify-center items-center">
                        {!tableData &&
                            <FileUploader classes="border-none" disabled={true} name="file" types={FILE_TYPES} handleChange={(file: File) => handleFileChange(file)}>
                                <DragAndDropCard />
                            </FileUploader>}
                        {tableData && <PerceptualHashTable data={tableData} />}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
