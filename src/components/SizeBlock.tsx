import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

type pieceType = { size: number; quantity: number };
type SizeBlockProps = {
  piece: pieceType;
  selectPiece: (piece: pieceType) => void;
  isSelected: boolean;
  disabled: boolean;
};
export default function SizeBlock({
  piece,
  selectPiece,
  isSelected,
}: SizeBlockProps) {
  return (
    <Button
      className={cn(
        "text-md flex size-[3.2rem] items-center justify-center rounded-sm border bg-white text-primary shadow-none md:size-14 md:text-xl hover:bg-gray-100",
        isSelected && "border-0 bg-primary text-white",
      )}
      onClick={() => selectPiece(piece)}
    >
      {piece.size}
    </Button>
  );
}
