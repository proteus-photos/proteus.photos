'use client'

import * as React from "react"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../../components/ui/card/card"
import { DragAndDropCard } from "./dragAndDropCard"
import { PerceptualHashTable } from "../table/perceptualHashTable"
import { PerceptualHashResponse } from "@/types/types"

const FILE_TYPES = ["JPEG", "PNG"]
const PROCESS_IMAGE_ENDPOINT = (process.env.NEXT_PUBLIC_API_ENDPOINT || `https://proteus-photos.onrender.com`) + '/process_image'
// const PROCESS_IMAGE_ENDPOINT = `http://127.0.0.1:8000/process_image`

// Define the new props for CardWithTable
interface CardWithTableProps {
  text: string;
  // Callback to notify the parent component when an image is processed or cleared
  onImageProcessed: (data: PerceptualHashResponse | null) => void;
  // Hash data of the *other* image, for comparison
  comparisonData?: PerceptualHashResponse | null;
  // Optional: The current image data can also be passed as a prop if parent fully controls it
  // currentImageData?: PerceptualHashResponse | null;
}

export const CardWithTable: React.FC<CardWithTableProps> = ({ text, onImageProcessed, comparisonData }) => {
    // This state will hold the hashes for the image uploaded to THIS card instance
    const [cardImageData, setCardImageData] = React.useState<PerceptualHashResponse | null>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [dragActive, setDragActive] = React.useState<boolean>(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        const files = e.dataTransfer.files
        if (files?.[0] && FILE_TYPES.includes(files[0].type.split("/")[1].toUpperCase())) {
            await handleFile(files[0])
        }
    }

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (e.target.files?.[0]) {
            await handleFile(e.target.files[0])
        }
    }

    const handleFile = async (file: File) => {
        const formData = new FormData()
        formData.append('file', file)
        
        try {
            setIsLoading(true)
            const response = await fetch(PROCESS_IMAGE_ENDPOINT, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                }
            })
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            
            const data = await response.json() as PerceptualHashResponse
            console.log("data returned from endpoint", data)
            setCardImageData(data)
            onImageProcessed(data)
        } catch (error) {
            console.error("Error processing image:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const onButtonClick = () => {
        console.log("Image endpoint:", PROCESS_IMAGE_ENDPOINT, " env val ", process.env.NEXT_PUBLIC_API_ENDPOINT)
        inputRef.current?.click()
    }

    const handleReset = () => {
        setCardImageData(null)
        onImageProcessed(null)
    }

    return (
        <div className="font-manrope w-[400px] h-[400px] overflow-y-scroll bg-white rounded-3xl">
            <Card className="rounded-3xl h-full">
                <CardHeader className="flex flex-col justify-center items-center">
                    <CardTitle className="mb-2">Explore perceptual hashes</CardTitle>
                    <CardDescription>{text}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col justify-center items-center">
                        {!cardImageData && (
                            <div 
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                            >
                                <input
                                    ref={inputRef}
                                    type="file"
                                    className="hidden"
                                    accept=".jpeg,.png"
                                    onChange={handleChange}
                                />
                                <DragAndDropCard 
                                    isLoading={isLoading}
                                    onClick={onButtonClick}
                                    isDragging={dragActive}
                                />
                            </div>
                        )}
                        {cardImageData && (
                            <>
                                <PerceptualHashTable 
                                    data={cardImageData}
                                    comparisonData={comparisonData}
                                />
                                <button 
                                    onClick={handleReset}
                                    className="mt-4 px-4 py-2 bg-slate-200 rounded-md text-sm"
                                >
                                    Clear Image
                                </button>
                            </>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
