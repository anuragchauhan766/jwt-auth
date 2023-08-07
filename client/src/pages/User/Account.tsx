
import useAuthHttpClient from "@src/hooks/useAuthHttpClient";
import { UserDataType } from "@src/types/User";
import { isAxiosError } from "axios";

import { useEffect, useState } from "react";

function Account() {
  const [userdata, setuserdata] = useState<UserDataType>();
  const authHttpClient = useAuthHttpClient();
  async function getuserdata() {
    try {
      const res = await authHttpClient.get("/user");
      setuserdata(res.data);
    } catch (err) {
      if (isAxiosError(err)) console.log(err);
    }
  }

  useEffect(() => {
    getuserdata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col text-white bg-light-blue rounded-md shadow-md p-10 space-y-2 mx-20">
      <h1 className="text-4xl font-extrabold">Account</h1>
      <div className="flex p-4 text-xl">
        <div className="w-40 font-bold ">Name:</div>
        <div className="capitalize">{userdata?.name}</div>
      </div>
      <div className="flex p-4 text-xl">
        <div className="w-40 font-bold ">Email:</div>
        <div className="">{userdata?.email}</div>
      </div>
      <div className="flex p-4 text-xl">
        <div className="w-40 font-bold ">Date of birth:</div>
        <div className="capitalize">{userdata?.dob}</div>
      </div>
      <div className="flex p-4 text-xl">
        <div className="w-40 font-bold ">Gender:</div>
        <div className="capitalize">{userdata?.gender}</div>
      </div>
    </div>
  );
}

export default Account;
