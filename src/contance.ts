export const MONAD_CONTRACT_ADDRESSES = [
    // "",
    "0xa8275fbf5fb47f632862db1cc4a6fbb5bd725856",
    "0x7238893dd7e2fa516566c56e860007d35ae0d186",
    "0xa4a7e2a0aa345072ff19a777d76abf460b5d9a69",
    "0x781ed8d6a280806d8c432269a2f317dbf95845af",
    "0x8dd114ac2946218de619e492fbf30bf507466cb0",
    "0x5cda37bab2b001725ca4f6daab7c0fa751529b02",
    "0x2f0730f6ac7869f1d80661684f203cd7def635ce",
    "0xa042c5c46f055e7496250a85a72765d2194bd4b1"
] as const;

export type MonadContractAddress = typeof MONAD_CONTRACT_ADDRESSES[number];

// (optional convenience: “primary” address keeps old behavior where needed)
export const PRIMARY_MONAD_CONTRACT: MonadContractAddress = MONAD_CONTRACT_ADDRESSES[7];
export const HOME_FILTERS = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Completed", value: "completed" },
] as const;
export type HomeFilter = typeof HOME_FILTERS[number]["value"];
export const isValidHomeFilter = (v: string): v is HomeFilter =>
    HOME_FILTERS.some(f => f.value === v);
