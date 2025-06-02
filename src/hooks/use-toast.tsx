"use client";

import type {
  TToastActionElement,
  TToastProps,
} from "@/components/ui/toast/toast";
import {
  ErrorToast,
  InformationToast,
  SuccessToast,
  WarningToast,
} from "@/components/ui/toast/custom-toast";
// Inspired by react-hot-toast library
import * as React from "react";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;
const TOAST_DURATION_TIME = 1000;

type TToastType = "success" | "error" | "info" | "warn";

type TToasterToast = TToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: TToastActionElement;
  position?: TToastPosition;
  type?: TToastType;
  style?: React.CSSProperties;
  message: string;
  variant?: string;
};

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

type TActionType = {
  ADD_TOAST: "ADD_TOAST";
  UPDATE_TOAST: "UPDATE_TOAST";
  DISMISS_TOAST: "DISMISS_TOAST";
  REMOVE_TOAST: "REMOVE_TOAST";
};

type TAction =
  | {
      type: TActionType["ADD_TOAST"];
      toast: TToasterToast;
    }
  | {
      type: TActionType["UPDATE_TOAST"];
      toast: Partial<TToasterToast>;
    }
  | {
      type: TActionType["DISMISS_TOAST"];
      toastId?: TToasterToast["id"];
    }
  | {
      type: TActionType["REMOVE_TOAST"];
      toastId?: TToasterToast["id"];
    };

interface IState {
  toasts: TToasterToast[];
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

export const reducer = (state: IState, action: TAction): IState => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case "DISMISS_TOAST": {
      const { toastId } = action;

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
};

const listeners: Array<(state: IState) => void> = [];

let memoryState: IState = { toasts: [] };

function dispatch(action: TAction) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

export type TToastPosition =
  | "left-top"
  | "right-bottom"
  | "middle"
  | "left-bottom"
  | "right-top";

type TToast = Omit<TToasterToast, "id">;

function toast({
  position,
  duration = TOAST_DURATION_TIME,
  style = { boxShadow: "8px 8px 40px 0px rgba(82, 82, 91, 0.08)" },
  message,
  variant,
  ...props
}: TToast) {
  const id = genId();

  let description: React.ReactNode;
  switch (variant) {
    case "success":
      description = <SuccessToast message={message} />;
      break;
    case "error":
      description = <ErrorToast message={message} />;
      break;
    case "comingSoon":
      description = <InformationToast message={message} />;
      break;
    default:
      description = <WarningToast message={message} />;
  }

  const update = (props: TToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: {
        ...props,
        id,
        position,
        style,
        duration,
        message,
        variant,
        description,
      },
    });

  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      position,
      message,
      variant,
      style,
      description,
      duration,
      open: true,
      onOpenChange: (open) => {
        if (!open) {
          dismiss();
        }
      },
    },
  });

  return {
    id: id,
    dismiss,
    update,
  };
}

function useToast() {
  const [state, setState] = React.useState<IState>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  };
}

export { toast, useToast };
