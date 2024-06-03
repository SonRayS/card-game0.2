import { useContext } from "react";

import { ListContext } from "./list";

export function useListContext() {
  return useContext(ListContext);
}
