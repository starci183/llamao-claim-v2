"use client";
import { Button } from "@/components/common/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  setOpenClaimRewardsDialog,
  useAppDispatch,
  useAppSelector,
} from "@/redux";

export const DialogContainer = () => {
  const openClaimRewardsDialog = useAppSelector(
    (state) => state.nftReducer.openClaimRewardsDialog
  );
  const dispatch = useAppDispatch();
  return (
    <Dialog
      open={openClaimRewardsDialog}
      onOpenChange={(open) => dispatch(setOpenClaimRewardsDialog(open))}
    >
      <DialogContent>
        <DialogHeader title="Claim Rewards" onClose={() => dispatch(setOpenClaimRewardsDialog(false))}/>
        <div className="w-full max-w-md sm:max-w-lg lg:max-w-2xl xl:max-w-3xl overflow-hidden space-y-2 p-1.5 sm:p-2 md:p-3 lg:p-4 box-shadow-secondary">
            <div className="text-black">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut aliquam nulla ex ipsa repellendus, non mollitia in laboriosam consequatur numquam quis dolorum. Dolor placeat aliquam earum obcaecati, quae molestias. Magni?
            <div className="h-4"/>
            <div className="flex flex-row-reverse">
            <Button intent="gradient" onClick={() => dispatch(setOpenClaimRewardsDialog(false))}>
                Claim Rewards
            </Button>               
            </div>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
