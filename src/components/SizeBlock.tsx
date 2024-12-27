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
  disabled,
}: SizeBlockProps) {
  return (
    <Button
      disabled={disabled}
      className={cn(
        "text-md flex size-[3.2rem] items-center justify-center rounded-sm border bg-white text-primary shadow-none hover:bg-gray-100 md:size-14 md:text-xl",
        isSelected && "border-0 bg-primary text-white",
      )}
      onClick={() => selectPiece(piece)}
    >
      {piece.size}
    </Button>
  );
}
