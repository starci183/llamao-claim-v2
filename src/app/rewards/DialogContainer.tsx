"use client";
import { Button } from "@/components/common/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import {
  setOpenClaimRewardsDialog,
  useAppDispatch,
  useAppSelector,
} from "@/redux";
import { useAuth } from "@/providers/auth-provider";

export const DialogContainer = () => {
  const openClaimRewardsDialog = useAppSelector(
    (state) => state.nftReducer.openClaimRewardsDialog
  );
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  const renderContent = () => {
    if (user?.winner.winLlamaoGTD) {
      return (
        <div>
          <div>Congrats! You&apos;ve won the following rewards:</div>
          <div className="h-4" />
          <div>
            <span className="font-bold text-red-700">
              1. Llamao GTD whitelist:
            </span>{" "}
            Your wallet will be automatically added to the relevant round on
            Llamao mainnet. You don&apos;t need to open a ticket or contact
            support for this.
          </div>
          <div>
            <span className="font-bold text-blue-700">2. Karma point:</span>{" "}
            Open Haha Wallet using this address and join the Llamao exclusive
            quest there to claim your Karma Points.
          </div>
          <div>
            <span className="font-bold text-green-700">
              3. Beallad Role from Bean Exchange:
            </span>{" "}
            Connect your wallet to Bean DLMM & click on &apos;Connect with
            Discord&apos; in Portfolio tab to claim your role.{" "}
            <span className="font-bold text-pink-700">
              In addition, your wallet will earn a 1% Bean Point Boost for every
              LP, swaps, and trades on Bean.
            </span>
          </div>
          <div className="h-4" />
          <div>All the rewards above will be distributed by 3 Nov.</div>
        </div>
      );
    }
    if (user?.winner.winMonadverseFCFS) {
      return (
        <div>
          <div>Congrats! You&apos;ve won the following rewards:</div>
          <div className="h-4" />
          <div>
            <span className="font-bold text-red-700">
              1. Llamao FCFS whitelist and Monadverse FCFS whitelist:
            </span>{" "}
            Your wallet will be automatically added to the relevant mint round
            on mainnet. You don&apos;t need to open a ticket or contact support
            for this.
          </div>
          <div>
            <span className="font-bold text-blue-700">2. Karma point:</span>{" "}
            Open Haha Wallet using this address and join the Llamao exclusive
            quest there to claim your Karma Points.
          </div>
          <div>
            <span className="font-bold text-green-700">
              3. Beallad Role from Bean Exchange:
            </span>{" "}
            Connect your wallet to Bean DLMM &amp; click on &apos;Connect with
            Discord&apos; in Portfolio tab to claim your role.{" "}
            <span className="font-bold text-pink-700">
              In addition, your wallet will earn a 1% Bean Point Boost for every
              LP, swaps, and trades on Bean.
            </span>
          </div>
          <div className="h-4" />
          <div>All the rewards above will be distributed by 3 Nov.</div>
        </div>
      );
    }
    if (user?.winner.winMonadverseGTD) {
      return (
        <div>
          <div>Congrats! You&apos;ve won the following rewards:</div>
          <div className="h-4" />
          <div>
            <span className="font-bold text-red-700">
              1. Llamao FCFS whitelist and Monadverse GTD whitelist:
            </span>{" "}
            Your wallet will be automatically added to the relevant mint round
            on mainnet. You don&apos;t need to open a ticket or contact support
            for this.
          </div>
          <div>
            <span className="font-bold text-blue-700">2. Karma point:</span>{" "}
            Open Haha Wallet using this address and join the Llamao exclusive
            quest there to claim your Karma Points.
          </div>
          <div>
            <span className="font-bold text-green-700">
              3. Beallad Role from Bean Exchange:
            </span>{" "}
            Connect your wallet to Bean DLMM &amp; click on &apos;Connect with
            Discord&apos; in Portfolio tab to claim your role.{" "}
            <span className="font-bold text-pink-700">
              In addition, your wallet will earn a 1% Bean Point Boost for every
              LP, swaps, and trades on Bean.
            </span>
          </div>
          <div className="h-4" />
          <div>All the rewards above will be distributed by 3 Nov.</div>
        </div>
      );
    }
    if (user?.winner.winNadNameServiceGTD) {
      return (
        <div>
          <div>Congrats! You&apos;ve won the following rewards:</div>
          <div className="h-4" />
          <div>
            <span className="font-bold text-red-700">
              1. Llamao FCFS whitelist and Nad Name Service GTD whitelist:
            </span>{" "}
            Your wallet will be automatically added to the relevant mint round
            on mainnet. You don&apos;t need to open a ticket or contact support
            for this.
          </div>
          <div>
            <span className="font-bold text-blue-700">2. Karma point:</span>{" "}
            Open Haha Wallet using this address and join the Llamao exclusive
            quest there to claim your Karma Points.
          </div>
          <div>
            <span className="font-bold text-green-700">
              3. Beallad Role from Bean Exchange:
            </span>{" "}
            Connect your wallet to Bean DLMM &amp; click on &apos;Connect with
            Discord&apos; in Portfolio tab to claim your role.{" "}
            <span className="font-bold text-pink-700">
              In addition, your wallet will earn a 1% Bean Point Boost for every
              LP, swaps, and trades on Bean.
            </span>
          </div>
          <div className="h-4" />
          <div>All the rewards above will be distributed by 3 Nov.</div>
        </div>
      );
    }
    if (user?.winner.winOvernadsGTD) {
      return (
        <div>
          <div>Congrats! You&apos;ve won the following rewards:</div>
          <div className="h-4" />
          <div>
            <span className="font-bold text-red-700">
              1. Llamao FCFS whitelist and Overnads GTD whitelist:
            </span>{" "}
            Your wallet will be automatically added to the relevant mint round
            on mainnet. You don&apos;t need to open a ticket or contact support
            for this.
          </div>
          <div>
            <span className="font-bold text-blue-700">2. Karma point:</span>{" "}
            Open Haha Wallet using this address and join the Llamao exclusive
            quest there to claim your Karma Points.
          </div>
          <div>
            <span className="font-bold text-green-700">
              3. Beallad Role from Bean Exchange:
            </span>{" "}
            Connect your wallet to Bean DLMM &amp; click on &apos;Connect with
            Discord&apos; in Portfolio tab to claim your role.{" "}
            <span className="font-bold text-pink-700">
              In addition, your wallet will earn a 1% Bean Point Boost for every
              LP, swaps, and trades on Bean.
            </span>
          </div>
          <div className="h-4" />
          <div>All the rewards above will be distributed by 3 Nov.</div>
        </div>
      );
    }
    if (user?.winner.win$CHOGtoken) {
      return (
        <div>
          <div>Congrats! You&apos;ve won the following rewards:</div>
          <div className="h-4" />

          <div>
            <span className="font-bold text-red-700">
              1. Llamao FCFS whitelist:
            </span>{" "}
            Your wallet will be automatically added to the relevant mint round
            on mainnet. You don&apos;t need to open a ticket or contact support
            for this.
          </div>

          <div>
            <span className="font-bold text-blue-700">2. Karma point:</span>{" "}
            Open Haha Wallet using this address and join the Llamao exclusive
            quest there to claim your Karma Points.
          </div>

          <div>
            <span className="font-bold text-green-700">
              3. Beallad Role from Bean Exchange:
            </span>{" "}
            Connect your wallet to Bean DLMM &amp; click on &apos;Connect with
            Discord&apos; in the Portfolio tab to claim your role.{" "}
            <span className="font-bold text-pink-700">
              In addition, your wallet will earn a 1% Bean Point Boost for every
              LP, swap, and trade on Bean.
            </span>
          </div>

          <div>
            <span className="font-bold text-purple-700">4. 7,000 $CHOG:</span>{" "}
            Join the Llamao Discord, open a ticket, and send this proof to claim
            your rewards.{" "}
            <span className="italic text-muted-foreground">
              (Note: Do not share this proof with anyone publicly, as someone
              could impersonate you to claim the rewards.)
            </span>
          </div>

          <div className="h-4" />
          <div>All the rewards above will be distributed by 3 Nov.</div>
        </div>
      );
    }
    if (user?.winner.winOvernadsFCFS) {
      return (
        <div>
          <div>Congrats! You&apos;ve won the following rewards:</div>
          <div className="h-4" />

          <div>
            <span className="font-bold text-red-700">
              1. Llamao FCFS whitelist and Overnads FCFS whitelist:
            </span>{" "}
            Your wallet will be automatically added to the relevant mint round
            on mainnet. You don&apos;t need to open a ticket or contact support
            for this.
          </div>

          <div>
            <span className="font-bold text-blue-700">2. Karma point:</span>{" "}
            Open Haha Wallet using this address and join the Llamao exclusive
            quest there to claim your Karma Points.
          </div>

          <div>
            <span className="font-bold text-green-700">
              3. Beallad Role from Bean Exchange:
            </span>{" "}
            Connect your wallet to Bean DLMM &amp; click on &apos;Connect with
            Discord&apos; in the Portfolio tab to claim your role.{" "}
            <span className="font-bold text-pink-700">
              In addition, your wallet will earn a 1% Bean Point Boost for every
              LP, swaps, and trades on Bean.
            </span>
          </div>

          <div className="h-4" />
          <div>All the rewards above will be distributed by 3 Nov.</div>
        </div>
      );
    }
    if (user?.winner.winChewyFCFS) {
      return (
        <div>
          <div>Congrats! You&apos;ve won the following rewards:</div>
          <div className="h-4" />
          <div>
            <span className="font-bold text-red-700">
              1. Llamao FCFS whitelist and Chewy FCFS whitelist:
            </span>{" "}
            Your wallet will be automatically added to the relevant mint round
            on mainnet. You don&apos;t need to open a ticket or contact support
            for this.
          </div>
          <div>
            <span className="font-bold text-blue-700">2. Karma point:</span>{" "}
            Open Haha Wallet using this address and join the Llamao exclusive
            quest there to claim your Karma Points.
          </div>
          <div>
            <span className="font-bold text-green-700">
              3. Beallad Role from Bean Exchange:
            </span>{" "}
            Connect your wallet to Bean DLMM &amp; click on &apos;Connect with
            Discord&apos; in Portfolio tab to claim your role.{" "}
            <span className="font-bold text-pink-700">
              In addition, your wallet will earn a 1% Bean Point Boost for every
              LP, swaps, and trades on Bean.
            </span>
          </div>
          <div className="h-4" />
          <div>All the rewards above will be distributed by 3 Nov.</div>
        </div>
      );
    }
    if (user?.winner.winChewyGTD) {
      return (
        <div>
          <div>Congrats! You&apos;ve won the following rewards:</div>
          <div className="h-4" />
          <div>
            <span className="font-bold text-red-700">
              1. Llamao FCFS whitelist and Chewy GTD whitelist:
            </span>{" "}
            Your wallet will be automatically added to the relevant mint round
            on mainnet. You don&apos;t need to open a ticket or contact support
            for this.
          </div>
          <div>
            <span className="font-bold text-blue-700">2. Karma point:</span>{" "}
            Open Haha Wallet using this address and join the Llamao exclusive
            quest there to claim your Karma Points.
          </div>
          <div>
            <span className="font-bold text-green-700">
              3. Beallad Role from Bean Exchange:
            </span>{" "}
            Connect your wallet to Bean DLMM &amp; click on &apos;Connect with
            Discord&apos; in the Portfolio tab to claim your role.{" "}
            <span className="font-bold text-pink-700">
              In addition, your wallet will earn a 1% Bean Point Boost for every
              LP, swaps, and trades on Bean.
            </span>
          </div>
          <div className="h-4" />
          <div>All the rewards above will be distributed by 3 Nov.</div>
        </div>
      );
    }
    if (user?.winner.winSLMNDFCFS) {
      return (
        <div>
          <div>Congrats! You&apos;ve won the following rewards:</div>
          <div className="h-4" />
          <div>
            <span className="font-bold text-red-700">
              1. Llamao FCFS whitelist and SLMND FCFS whitelist:
            </span>{" "}
            Your wallet will be automatically added to the relevant mint round
            on mainnet. You don&apos;t need to open a ticket or contact support
            for this.
          </div>
          <div>
            <span className="font-bold text-blue-700">2. Karma point:</span>{" "}
            Open Haha Wallet using this address and join the Llamao exclusive
            quest there to claim your Karma Points.
          </div>
          <div>
            <span className="font-bold text-green-700">
              3. Beallad Role from Bean Exchange:
            </span>{" "}
            Connect your wallet to Bean DLMM &amp; click on &apos;Connect with
            Discord&apos; in the Portfolio tab to claim your role.{" "}
            <span className="font-bold text-pink-700">
              In addition, your wallet will earn a 1% Bean Point Boost for every
              LP, swaps, and trades on Bean.
            </span>
          </div>
          <div className="h-4" />
          <div>All the rewards above will be distributed by 3 Nov.</div>
        </div>
      );
    }
    if (user?.winner.winLaMouchGTD) {
      return (
        <div>
          <div>Congrats! You&apos;ve won the following rewards:</div>
          <div className="h-4" />
          <div>
            <span className="font-bold text-red-700">
              1. Llamao FCFS whitelist and La Mouch GTD whitelist:
            </span>{" "}
            Your wallet will be automatically added to the relevant mint round
            on mainnet. You don&apos;t need to open a ticket or contact support
            for this.
          </div>
          <div>
            <span className="font-bold text-blue-700">2. Karma point:</span>{" "}
            Open Haha Wallet using this address and join the Llamao exclusive
            quest there to claim your Karma Points.
          </div>
          <div>
            <span className="font-bold text-green-700">
              3. Beallad Role from Bean Exchange:
            </span>{" "}
            Connect your wallet to Bean DLMM &amp; click on &apos;Connect with
            Discord&apos; in the Portfolio tab to claim your role.{" "}
            <span className="font-bold text-pink-700">
              In addition, your wallet will earn a 1% Bean Point Boost for every
              LP, swaps, and trades on Bean.
            </span>
          </div>
          <div className="h-4" />
          <div>All the rewards above will be distributed by 3 Nov.</div>
        </div>
      );
    }
    if (user?.winner.winLlamaoAwakening) {
      return (
        <div>
          <div>Congrats! You&apos;ve won the following rewards:</div>
          <div className="h-4" />

          <div>
            <span className="font-bold text-red-700">
              1. Llamao FCFS whitelist:
            </span>{" "}
            Your wallet will be automatically added to the relevant mint round
            on mainnet. You don&apos;t need to open a ticket or contact support
            for this.
          </div>

          <div>
            <span className="font-bold text-blue-700">2. Karma point:</span>{" "}
            Open Haha Wallet using this address and join the Llamao exclusive
            quest there to claim your Karma Points.
          </div>

          <div>
            <span className="font-bold text-green-700">
              3. Beallad Role from Bean Exchange:
            </span>{" "}
            Connect your wallet to Bean DLMM &amp; click on &apos;Connect with
            Discord&apos; in the Portfolio tab to claim your role.{" "}
            <span className="font-bold text-pink-700">
              In addition, your wallet will earn a 1% Bean Point Boost for every
              LP, swaps, and trades on Bean.
            </span>
          </div>

          <div className="h-4" />
          <div>All the rewards above will be distributed by 3 Nov.</div>
        </div>
      );
    }
    return null;
  };

  return (
    <Dialog
      open={openClaimRewardsDialog}
      onOpenChange={(open) => dispatch(setOpenClaimRewardsDialog(open))}
    >
      <DialogContent>
        <DialogHeader
          title="Claim Rewards"
          onClose={() => dispatch(setOpenClaimRewardsDialog(false))}
        />
        <div className="w-full max-w-md sm:max-w-lg text-black lg:max-w-2xl xl:max-w-3xl overflow-hidden space-y-2 p-1.5 sm:p-2 md:p-3 lg:p-4 box-shadow-secondary">
          {renderContent()}
          <div className="h-4" />
          <div className="flex flex-row-reverse">
            <Button
              intent="gradient"
              className="px-4"
              onClick={() => dispatch(setOpenClaimRewardsDialog(false))}
            >
              Got It!
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
