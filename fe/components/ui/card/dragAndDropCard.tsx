import React from "react"

import "./dragAndDropCard.css"

interface DragAndDropCardProps {
    isLoading: boolean
}

export const DragAndDropCard = ({ isLoading }: DragAndDropCardProps) => {
    return (
        <div className="w-64 h-64 bg-gray-100 rounded-xl border border-1 border-dashed">
            <div className="flex flex-row items-center justify-center w-full h-full">
                <div className="text-black text-s font-light">
                    {!isLoading && <div>.jpeg/.png supported!</div>}
                    {isLoading && <div class="loader"></div>}
                </div>
            </div>
        </div>
    )
}