import React from "react"

import "./dragAndDropCard.css"

interface DragAndDropCardProps {
    isLoading: boolean
    onClick?: () => void
    isDragging?: boolean
}

export const DragAndDropCard = ({ isLoading, onClick, isDragging }: DragAndDropCardProps) => {
    return (
        <div 
            className={`w-64 h-64 bg-gray-100 rounded-xl border border-1 border-dashed ${isDragging ? 'border-blue-500' : ''}`}
            onClick={onClick}
        >
            <div className="flex flex-row items-center justify-center w-full h-full">
                <div className="text-black text-s font-light">
                    {!isLoading && <div>.jpeg/.png supported!</div>}
                    {isLoading && <div className="loader"></div>}
                </div>
            </div>
        </div>
    )
}