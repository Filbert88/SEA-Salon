import Link from "next/link";
import type { Metadata } from "next";

import { NextPage } from "next";
import Head from "next/head";

const NotFoundPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
      </Head>
      <div className="flex items-center justify-center min-h-screen bg-black px-10">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-red">ERROR 404</h1>
          <p className="text-xl font-light text-white">
            Sorry, the page you're looking for cannot be found!
          </p>
          <div className="mt-6 text-xl">
            <a href="/" className="text-white hover:underline text-xl">
              Go back
              <span className="font-bold text-red text-xl"> home</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
