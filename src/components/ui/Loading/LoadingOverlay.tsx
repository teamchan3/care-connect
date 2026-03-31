import clsx from "clsx";

type LoadingOverlayProps = {
  isVisible: boolean;
  message?: string;
};

export function LoadingOverlay({ isVisible, message }: LoadingOverlayProps) {
  return (
    <div
      className={clsx(
        "fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex items-center justify-center",
        !isVisible && "hidden"
      )}
    >
      <div className="flex flex-col items-center gap-4">
        <span className="loading loading-spinner loading-lg text-white"></span>
        {message && <p className="text-sm text-white">{message}</p>}
      </div>
    </div>
  );
}
