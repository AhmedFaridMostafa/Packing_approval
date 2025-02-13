import Link from "next/link";
import React from "react";

export interface PackingMethodsTranslations {
  isAuth: boolean;
  packingMethods: {
    noMethodsAuth: {
      title: string;
      message: string;
      button: string;
    };
    noMethodsNotAuth: {
      title: string;
      message: string;
    };
  };
}

const PackingMessage: React.FC<PackingMethodsTranslations> = ({
  isAuth,
  packingMethods,
}) => {
  return (
    <div className="mx-auto max-w-md rounded-2xl bg-white p-6 text-center shadow-lg">
      {isAuth ? (
        <>
          <h2 className="text-xl font-semibold text-red-500">
            {packingMethods.noMethodsAuth.title}
          </h2>
          <p className="mt-4 text-gray-600">
            {packingMethods.noMethodsAuth.message}
          </p>
          <Link
            href="/packing-way/add"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow transition hover:bg-blue-700"
          >
            {packingMethods.noMethodsAuth.button}
          </Link>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold text-red-500">
            {packingMethods.noMethodsNotAuth.title}
          </h2>
          <p className="mt-4 text-gray-600">
            {packingMethods.noMethodsNotAuth.message}
          </p>
        </>
      )}
    </div>
  );
};

export default PackingMessage;
