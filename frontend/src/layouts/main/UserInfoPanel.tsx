import { logout } from "api/auth";
import { useOnOutsideClick } from "hooks";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useUser } from "state/user";

const dropdownItemClassname = "text-medium text-sm flex";

const MAXIMUM_USERNAME_SYMBOLS = 15;

export const UserInfoPanel = () => {
  const dropdownTogglerRef = useRef<HTMLButtonElement>(null);
  const [dropdownIsOpened, setDropdownIsOpened] = useState(false);
  const dropdownWrapperRef = useOnOutsideClick<HTMLDivElement>(
    () => {
      if (dropdownIsOpened) {
        setDropdownIsOpened(false);
      }
    },
    {
      excludeRefs: [dropdownTogglerRef],
    }
  );

  const { logoutUser, user } = useUser();

  const router = useRouter();

  const onLogoutClick = async () => {
    try {
      await logout();
      logoutUser();

      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-black py-3 pr-5 pl-8 text-gray-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="rounded overflow-hidden w-11 h-11 relative mr-7">
            <Image
              src="/images/avatar-placeholder.png"
              layout="fill"
              alt=""
              objectFit="cover"
            />
          </div>
          <span className="font-bold text-lg text-gray-500">
            {user.username.length > MAXIMUM_USERNAME_SYMBOLS
              ? user.username.slice(0, MAXIMUM_USERNAME_SYMBOLS) + "..."
              : user.username}
          </span>
        </div>
        <div className="relative">
          {dropdownIsOpened && (
            <div
              className="absolute right-full bottom-full bg-slate-500 rounded-md
              py-4 px-3 border-gray-600 border-2 w-24"
              ref={dropdownWrapperRef}
            >
              <div className="pb-2 border-b-2 border-b-gray-300">
                <button className={`${dropdownItemClassname} text-gray-100`}>
                  My Profile
                </button>
              </div>
              <div className="pt-1">
                <button
                  onClick={onLogoutClick}
                  className={`${dropdownItemClassname} text-red-400`}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
          <button
            ref={dropdownTogglerRef}
            className="flex"
            onClick={() => setDropdownIsOpened((prev) => !prev)}
          >
            <Image width={15} height={15} src="/icons/dropdown.svg" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};
