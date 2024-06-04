import { useContext } from "react";
import { NameContext } from "./name";
import { ListContext } from "./list";

export function useListContext() {
  return useContext(ListContext);
}

export function useNameContext() {
  return useContext(NameContext);
}
