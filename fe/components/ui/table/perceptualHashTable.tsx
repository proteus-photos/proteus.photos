import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table/table"
import { PerceptualHash, PerceptualHashResponse } from "@/types/types";

type PerceptualHashTableProps = {
    data: PerceptualHashResponse;
};

const HASH_TYPES: Array<PerceptualHash> = ["blockhash", "colourhash", "neuralhash"]

export const PerceptualHashTable: React.FC<PerceptualHashTableProps> = ({ data }) => {
    return (
        <Table>
            <TableCaption>Perceptual Hash Results</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead key={"Perceptual hash type"}>Type</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {HASH_TYPES.map((hashType) => (
                    <TableRow key={hashType}>
                        <TableCell key={hashType}>{hashType}</TableCell>
                        <TableCell key={hashType}>{data[hashType]}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}