import { simulateAsyncReq } from "@/plugins/getDataFunc";
import { payload } from "@/mocData/index.js";

export const request = async () => {
  const response = await simulateAsyncReq(payload);
  return response;
};
