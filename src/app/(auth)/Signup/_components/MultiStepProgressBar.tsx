import { SIGNUP_STEPS } from "~/app/lib/constants";

interface MultiStepProgressBarProps {
  step: number;
}

export const MultiStepProgressBar = ({ step }: MultiStepProgressBarProps) => {
  return (
    <nav aria-label="Progress" className="mb-8">
      <ol className="flex items-center justify-center space-x-8">
        {SIGNUP_STEPS.map((stepItem, index) => (
          <li key={stepItem.name} className="flex flex-col items-center">
            {step > index ? (
              <div className="bg-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded-full">
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            ) : step === index ? (
              <div className="border-primary text-primary flex h-10 w-10 items-center justify-center rounded-full border-2">
                {index + 1}
              </div>
            ) : (
              <div className="text-muted-foreground flex h-10 w-10 items-center justify-center rounded-full border-2">
                {index + 1}
              </div>
            )}
            <span
              className={`mt-2 text-center text-xs font-medium ${
                index <= step ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {stepItem.name}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  );
};
