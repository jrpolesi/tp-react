import { BoxProps } from "@mui/material";
import { useSessionContext } from "../../contexts";
import { Item, ItemType } from "../../types";
import { useItemForm } from "./useItemForm";

export type FormValue = Omit<Item, "id" | "createdAt">;

type BabyItemFormProps = {
  formType: ItemType;
  onSubmit: (value: FormValue) => Promise<void>;
  defaultValue?: FormValue;
  sx?: BoxProps["sx"];
};

export function BabyItemForm({
  defaultValue,
  formType,
  onSubmit,
  sx,
}: BabyItemFormProps) {
  const form = useItemForm(formType);

  const { user } = useSessionContext();

  if (!user) {
    throw new Error("User is not logged in");
  }
  return (
    <form.component
      sx={sx}
      defaultValue={defaultValue as any}
      onFormSubmit={async (value) => {
       await onSubmit({
          type: formType,
          userId: user.id,
          active: true,
          ...value,
        });
      }}
    />
  );
}
