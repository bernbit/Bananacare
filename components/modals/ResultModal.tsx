import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Progress } from "@/components/ui/progress";
import { MdClose } from "react-icons/md";
import { BananaDiseaseType } from "@/lib/constant";

interface ResultModalProps {
  open: boolean;
  onClose: () => void;
  rankedResults: BananaDiseaseType[];
  resetForm: () => void;
  previewImg: string | null;
}

const ResultModal: React.FC<ResultModalProps> = ({
  open,
  onClose,
  rankedResults,
  resetForm,
  previewImg,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="bg-light flex h-[95vh] flex-col overflow-y-auto border-none md:min-w-[48vw] md:px-10">
        <AlertDialogHeader className="h-fit text-left">
          <AlertDialogTitle className="flex items-center">
            <p className="text-dark font-clash-grotesk flex-1 text-xl font-semibold">
              Result and Recommendation
            </p>
            <AlertDialogCancel
              className="border-none text-right shadow-none hover:cursor-pointer hover:opacity-70"
              onClick={resetForm}
            >
              <MdClose className="size-6" />
            </AlertDialogCancel>
          </AlertDialogTitle>
        </AlertDialogHeader>

        {/* Body */}
        <div className="border-primary bg-primary/20 flex-1 rounded-md p-4">
          {/* Banana Image */}
          <div className="bg-primary/20 relative flex aspect-square max-h-[400px] w-full flex-col overflow-hidden rounded-t-md px-4 py-4">
            {previewImg && (
              <img
                src={previewImg}
                alt="Banana Image"
                className="h-full object-center"
              />
            )}

            <div className="bg-dark/70 absolute inset-0 flex h-full w-full items-center justify-center">
              <div className="bg-primary rounded-md p-2 hover:opacity-70">
                <p className="text-light font-bold">{rankedResults[0]?.name}</p>
              </div>
            </div>
          </div>

          {/* Result and Recommendation */}
          <div className="border-primary bg-light flex flex-col gap-2 rounded-b-md px-2 py-4">
            {/* Result */}
            <div className="flex flex-col gap-1 rounded-md">
              <p className="text-dark rounded-md text-sm font-bold">Result</p>
              {rankedResults
                .filter((item) => item.name.toLowerCase() !== "not banana")
                .map((result, index) => (
                  <div
                    className="text-light flex items-center justify-center gap-2 rounded-md px-2 py-2"
                    style={{
                      backgroundColor: result?.color,
                      color: result?.textColor,
                    }}
                    key={index}
                  >
                    <p className="bg-dark/40 text-light border-light/20 basis-2/12 rounded-sm border px-2 py-1.5 text-center text-sm">
                      {`${result?.percentage}%`}
                    </p>
                    <div className="flex flex-1 flex-col justify-center gap-0.5">
                      <Progress value={result?.percentage} />
                      <p className="text-sm">{result?.name}</p>
                    </div>
                  </div>
                ))}
            </div>

            {/* Recommendation */}
            <div className="flex flex-col gap-1 rounded-md">
              <p className="text-dark rounded-md text-sm font-bold">
                Recommendation
              </p>
              <div className="flex flex-col gap-1">
                {rankedResults[0]?.recommendations?.map((recommend, index) => (
                  <div
                    className="bg-primary flex items-center gap-1 rounded-md px-2 py-2"
                    key={index}
                  >
                    <p className="text-light rounded-md text-sm">{recommend}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ResultModal;
