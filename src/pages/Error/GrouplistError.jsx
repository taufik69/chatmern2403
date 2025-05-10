const GrouplistError = ({ children }) => {
  return (
    <div>
      {" "}
      <div class="relative z-10 bg-red-500 ">
        <div class="container mx-auto">
          <div class="-mx-4 flex">
            <div class="w-full px-4">
              <div class="mx-auto max-w-[400px] text-center">
                <h2 class="mb-2 text-[50px] font-bold leading-none text-white sm:text-[80px] md:text-[100px]">
                  404
                </h2>
                <h4 class="mb-3 text-[22px] font-semibold leading-tight text-white">
                  GroupList Error
                </h4>
                <p class="mb-8 text-lg text-white">
                  The page you are looking for it maybe deleted
                </p>
                <a class="inline-block rounded-lg border border-white px-8 py-3 text-center text-base font-semibold text-white transition hover:bg-white hover:text-primary">
                  Go To BASa
                </a>
                {children}
              </div>
            </div>
          </div>
        </div>

        <div class="absolute left-0 top-0 -z-10 flex h-full w-full items-center justify-between space-x-5 md:space-x-8 lg:space-x-14">
          <div class="h-full w-1/3 bg-linear-to-t from-[#FFFFFF14] to-[#C4C4C400]"></div>
          <div class="flex h-full w-1/3">
            <div class="h-full w-1/2 bg-linear-to-b from-[#FFFFFF14] to-[#C4C4C400]"></div>
            <div class="h-full w-1/2 bg-linear-to-t from-[#FFFFFF14] to-[#C4C4C400]"></div>
          </div>
          <div class="h-full w-1/3 bg-linear-to-b from-[#FFFFFF14] to-[#C4C4C400]"></div>
        </div>
      </div>
    </div>
  );
};

export default GrouplistError;
