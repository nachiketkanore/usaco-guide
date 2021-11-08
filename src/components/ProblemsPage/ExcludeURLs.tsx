import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';

export default function ExcludeURLs({ refine }): JSX.Element {
  const [open, setOpen] = useState(false);
  const [excludeURLs, setExcludeURLs] = useState('');

  const updateRefinement = () => {
    const urls = excludeURLs.split('\n');
    const refinements = [];
    for (const url of urls) {
      if (url.trim() === '') continue;
      refinements.push('-' + url.trim());
    }
    refine(refinements);
  };

  return (
    <>
      <button
        onClick={() => {
          setOpen(true);
        }}
        className="btn"
      >
        Exclude URLs
      </button>

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-30 inset-0 overflow-y-auto"
          onClose={setOpen}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
                <div>
                  <div>
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Enter a list of URLs to exclude, separated by newlines
                    </Dialog.Title>
                    <div className="mt-4">
                      <textarea
                        value={excludeURLs}
                        onChange={e => setExcludeURLs(e.target.value)}
                        className="w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 block text-sm border-gray-300 rounded-md dark:bg-gray-900 dark:border-gray-700"
                        rows={20}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                    onClick={() => {
                      updateRefinement();
                      setOpen(false);
                    }}
                  >
                    Exclude
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
