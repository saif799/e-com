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
      variant={"outline"}
      className={cn(
        "flex h-16 w-16 items-center justify-center rounded-md text-lg md:h-20 md:w-20 md:text-xl",
        isSelected && "border-0 bg-black text-white",
      )}
      onClick={() => selectPiece(piece)}
    >
      {piece.size}
    </Button>
  );
}
