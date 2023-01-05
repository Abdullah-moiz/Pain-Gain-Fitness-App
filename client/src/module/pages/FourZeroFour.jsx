import React from 'react'

export default function FourZeroFour() {
  return (
    <div className='w-full h-screen flex items-center justify-center '>
      <div class="flex items-center justify-center w-screen h-screen">
        <div class="px-4 lg:py-12">
          <div class="lg:gap-4 lg:flex">
            <div
              class="flex flex-col items-center justify-center md:py-24 lg:py-32"
            >
              <h1 class="font-bold text-orange-600 text-9xl">404</h1>
              <p
                class="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl"
              >
                <span class="text-orange-500">Oops!</span> Page not found
              </p>
              <p class="mb-8 text-center text-gray-500 md:text-lg">
                The page you’re looking for doesn’t exist.
              </p>
              <a
                href="/"
                class="px-6 py-2 text-sm font-semibold text-white bg-orange-600"
              >Go home</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
