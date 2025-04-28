import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import Stepper from "../user/Stepper";

interface LoaderModalProps {
  open: boolean;
  onClose: () => void;
  currentStep: number;
  previewImg: string | null;
  augmentationSteps: {
    animation: string;
    subtitle: string;
    description: string;
  }[];
}

const LoaderModal: React.FC<LoaderModalProps> = ({
  open,
  onClose,
  currentStep,
  previewImg,
  augmentationSteps,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="bg-light flex h-[95vh] flex-col overflow-y-auto border-none md:min-w-[48vw] md:px-10">
        <AlertDialogTitle className="sr-only flex items-center">
          dsdsdsd
        </AlertDialogTitle>

        <div className="flex h-full flex-col">
          <div
            className={`bg-primary/20 border-primary flex w-full flex-1 flex-col items-center justify-center rounded-md px-4 py-4`}
          >
            <div className="relative aspect-square max-h-[500px] w-full flex-1 overflow-hidden rounded-md">
              {previewImg && (
                <img
                  src={previewImg}
                  alt="Banana Image"
                  className={`${augmentationSteps[currentStep]?.animation} animate-steps h-full object-center`}
                />
              )}
            </div>
          </div>
          {/* Stepper */}
          <Stepper currentStep={currentStep} />
          <div className="text-center">
            <p className="text-lg font-bold">{`${augmentationSteps[currentStep]?.subtitle}...`}</p>
            <p className="text-sm">{`${augmentationSteps[currentStep]?.description}`}</p>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LoaderModal;
