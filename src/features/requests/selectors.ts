import { RootState } from "../../store";

export const selectRequests=(state:RootState):Request[]=>state.requests.requests