import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import {
  BabyItemForm,
  CentralizedSpinner,
  FormValue,
  LoadingButton,
  PageTemplate,
  useItemForm,
} from "../components";
import { useSnackBarContext } from "../contexts";
import { useItemApi, useItemData } from "../hooks";

export function FormUpdatePage() {
  const { t } = useTranslation();

  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const navigate = useNavigate();
  const { itemId } = useParams();

  const { data, isLoading } = useItemData(itemId);
  const { title } = useItemForm(data?.type ?? "sleep");

  const { open } = useSnackBarContext();

  const api = useItemApi();

  async function onSubmit(itemId: string, value: FormValue) {
    await api.updateItem({ ...value, id: itemId });

    open({
      content: t("formUpdatePage.submit.success", "Saved successfully"),
      severity: "success",
    });

    navigate("/");
  }

  async function handleDelete(itemId: string) {
    setIsDeleteLoading(true);
    await api.deleteItem(itemId);

    open({
      content: t("formUpdatePage.submit.success", "Removed successfully"),
      severity: "success",
    });

    setIsDeleteLoading(false);
    navigate("/");
  }

  if (!itemId) {
    throw new Error("Item ID is required in this route");
  }

  return (
    <PageTemplate
      withAppBar
      title={data?.type ? title : "  "}
      action={
        <LoadingButton
          onClick={() => handleDelete(itemId)}
          loading={isDeleteLoading}
          variant="contained"
          color="error"
          size="small"
          sx={{
            fontSize: "0.75rem",
            minWidth: "0",
          }}
          title={t("formUpdatePage.action.delete", "Delete")}
        >
          <DeleteIcon sx={{ fontSize: "1.5rem" }} />
        </LoadingButton>
      }
    >
      {!data && isLoading && <CentralizedSpinner sx={{ minHeight: "14rem" }} />}
      {data && (
        <BabyItemForm
          formType={data.type}
          sx={{
            margin: "2rem auto 0",
          }}
          defaultValue={data}
          onSubmit={(value) => onSubmit(itemId, value)}
        />
      )}
    </PageTemplate>
  );
}
