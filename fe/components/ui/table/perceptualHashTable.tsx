import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../components/ui/table/table"
import { PerceptualHash, PerceptualHashResponse } from "../../../types/types";
import { useState, useEffect } from "react";

type PerceptualHashTableProps = {
    data: PerceptualHashResponse;
    comparisonData?: PerceptualHashResponse | null;
};

const HASH_TYPES: Array<PerceptualHash> = ["blockhash", "colourhash", "neuralhash", "dinohash96", "dinohash512"];

export const PerceptualHashTable: React.FC<PerceptualHashTableProps> = ({ data, comparisonData }) => {
    const [prevData, setPrevData] = useState<PerceptualHashResponse | null>(null);
    
    useEffect(() => {
        console.log("data", data, "prevData", prevData, "comparisonData", comparisonData)
        if (JSON.stringify(data) !== JSON.stringify(comparisonData)) {
            setPrevData(comparisonData || null);
        }
    }, [data, comparisonData]);
    
    const renderComparedHash = (currentHash: string | undefined, comparisonHash: string | undefined) => {
        console.log("currentHash", currentHash, "comparisonHash", comparisonHash)
        if (!currentHash || !comparisonHash) {
            return <div className="font-mono">Upload a second image to compare!</div>;
        }
        return (
            <div className="font-mono">
                {currentHash.split('').map((char, index) => {
                    const isMatching = index < comparisonHash.length && char === comparisonHash[index];
                    return (
                        <span 
                            key={index} 
                            style={{ 
                                color: prevData ? (isMatching ? 'green' : 'red') : 'black',
                                fontWeight: isMatching ? 'normal' : 'bold'
                            }}
                        >
                            {char}
                        </span>
                    );
                })}
            </div>
        );
    };
    
    return (
        <Table>
            <TableCaption>Perceptual Hash Results</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Type</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {HASH_TYPES.map((hashType) => (
                    <TableRow key={hashType}>
                        <TableCell>{hashType}</TableCell>
                        <TableCell>
                            {renderComparedHash(data[hashType], prevData?.[hashType] || '')}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};