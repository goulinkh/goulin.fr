const ErrorLogo: React.FC = () => (
  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-500 dark:bg-opacity-30 sm:mx-0 sm:h-10 sm:w-10">
    <svg
      className="h-6 w-6 text-red-600"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  </div>
);
const SuccessLogo: React.FC = () => (
  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full dark:bg-green-500 dark:bg-opacity-30 bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
    <svg
      className="h-6 w-6 text-green-600"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
  </div>
);
const InfoLogo: React.FC = () => (
  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full dark:bg-blue-500 dark:bg-opacity-30 bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
    <svg
      className="h-6 w-6 text-blue-600"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  </div>
);
const WarningLogo: React.FC = () => (
  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
    <svg
      className="h-6 w-6 text-yellow-600"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  </div>
);
type LogoType = 'info' | 'success' | 'warning' | 'error';
const logos: { [logo in LogoType]: React.FC } = {
  error: ErrorLogo,
  success: SuccessLogo,
  info: InfoLogo,
  warning: WarningLogo,
};

export type ModalProps = {
  type: LogoType | null;
  title: string | null;
  message?: string;
  footer: React.FC | null;
};

export function Modal({
  type, title, message, footer,
}: ModalProps) {
  const Logo = logos[type || 'info'];
  const Footer = footer;
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-900 opacity-75" />
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        <div
          className="inline-block align-bottom bg-white dark:bg-gray-700 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white dark:bg-gray-700 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <Logo />
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium" id="modal-headline">
                  {title}
                </h3>
                {message && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{message}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            {Footer && <Footer />}
          </div>
        </div>
      </div>
    </div>
  );
}
