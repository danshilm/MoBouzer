import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>MoBouzer</title>
      </Head>
      <video
        playsInline
        autoPlay
        loop
        muted
        className="fixed z-0 hidden w-auto h-auto min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 max-w-none top-1/2 left-1/2 sm:block"
      >
        <source src="/videos/bg.mp4" type="video/mp4" />
      </video>
      <div className="flex flex-col flex-1 min-h-screen">
        <div className="z-10 flex flex-1 bg-teal-800/30">
          <div className="flex items-center justify-center overflow-hidden text-white origin-top-right sm:-skew-x-6 sm:w-9/12 bg-black/90">
            <div className="skew-x-6 max-w-[40rem] pr-36 pl-16">
              <p className="mb-6 text-5xl italic font-semibold">Our Website is Coming Soon</p>
              <p className="text-xl">
                We&apos;re working hard to finish the development of this site.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end justify-center flex-1 gap-6 mr-16">
            <a href="https://github.com/danshilm/mobouzer" target="_blank" rel="noreferrer">
              <div className="flex items-center justify-center w-12 h-12 shadow-md bg-black/90 rounded-xl">
                <svg
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-white"
                >
                  <title>GitHub Project Link</title>
                  <path d="M16 1.375c-8.282 0-14.996 6.714-14.996 14.996 0 6.585 4.245 12.18 10.148 14.195l0.106 0.031c0.75 0.141 1.025-0.322 1.025-0.721 0-0.356-0.012-1.3-0.019-2.549-4.171 0.905-5.051-2.012-5.051-2.012-0.288-0.925-0.878-1.685-1.653-2.184l-0.016-0.009c-1.358-0.93 0.105-0.911 0.105-0.911 0.987 0.139 1.814 0.718 2.289 1.53l0.008 0.015c0.554 0.995 1.6 1.657 2.801 1.657 0.576 0 1.116-0.152 1.582-0.419l-0.016 0.008c0.072-0.791 0.421-1.489 0.949-2.005l0.001-0.001c-3.33-0.375-6.831-1.665-6.831-7.41-0-0.027-0.001-0.058-0.001-0.089 0-1.521 0.587-2.905 1.547-3.938l-0.003 0.004c-0.203-0.542-0.321-1.168-0.321-1.821 0-0.777 0.166-1.516 0.465-2.182l-0.014 0.034s1.256-0.402 4.124 1.537c1.124-0.321 2.415-0.506 3.749-0.506s2.625 0.185 3.849 0.53l-0.1-0.024c2.849-1.939 4.105-1.537 4.105-1.537 0.285 0.642 0.451 1.39 0.451 2.177 0 0.642-0.11 1.258-0.313 1.83l0.012-0.038c0.953 1.032 1.538 2.416 1.538 3.937 0 0.031-0 0.061-0.001 0.091l0-0.005c0 5.761-3.505 7.029-6.842 7.398 0.632 0.647 1.022 1.532 1.022 2.509 0 0.093-0.004 0.186-0.011 0.278l0.001-0.012c0 2.007-0.019 3.619-0.019 4.106 0 0.394 0.262 0.862 1.031 0.712 6.028-2.029 10.292-7.629 10.292-14.226 0-8.272-6.706-14.977-14.977-14.977-0.006 0-0.013 0-0.019 0h0.001z"></path>
                </svg>
              </div>
            </a>
            {/* eslint-disable-next-line react/jsx-no-target-blank */}
            <a href="https://danshilm.com" target="_blank" rel="author">
              <div className="flex items-center justify-center w-12 h-12 shadow-md bg-black/90 rounded-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <title>Author&apos;s Website</title>
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
