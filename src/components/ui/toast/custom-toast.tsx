"use client";

import { Button } from "@/components/common/button";
import { Header } from "@/components/common/header";
import { cn } from "@/lib/utils";
import { Block, Folder, Smile, Tick, Watch } from "@/svg";
import { type FC } from "react";

type TToastProps = {
  message: string;
  action?: () => void;
};

type TDefaultToast = TToastProps & {
  icon: React.ReactNode;
  textClassName?: string;
};
const DefaultToast: FC<TDefaultToast> = ({
  message,
  action,
  icon,
  textClassName,
}) => {
  return (
    <Header icon={<Folder />} text="Notification">
      <div className="flex w-fit items-center gap-2 rounded-md">
        {icon}
        <span className={cn("text-16 font-semibold", textClassName)}>
          {message}
        </span>
        {action && (
          <Button
            intent="ghost"
            onClick={action}
            className="text-blue-600 hover:underline"
          >
            Action
          </Button>
        )}
      </div>
    </Header>
  );
};

export const ErrorToast: FC<TToastProps> = ({ message }) => {
  return (
    <DefaultToast
      message={message}
      icon={<Block />}
      textClassName="text-red-600"
    />
  );
};

export const InformationToast: FC<TToastProps> = ({ message }) => {
  return (
    <DefaultToast
      message={message}
      icon={<Watch />}
      textClassName="text-neutral-800"
    />
  );
};

export const SuccessToast: FC<TToastProps> = ({ message }) => {
  return (
    <DefaultToast
      message={message}
      icon={<Tick />}
      textClassName="text-green-600"
    />
  );
};

export const WarningToast: FC<TToastProps> = ({ message }) => {
  return (
    <DefaultToast
      message={message}
      icon={<Smile />}
      textClassName="text-yellow-600"
    />
  );
};
