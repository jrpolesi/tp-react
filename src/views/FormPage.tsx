import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  BabyItemForm,
  FormValue,
  PageTemplate,
  useItemForm,
} from "../components";
import { useSnackBarContext } from "../contexts";
import { useItemApi } from "../hooks";
import { ItemType } from "../types";

export function FormPage() {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { open } = useSnackBarContext();

  const api = useItemApi();

  const formType = (searchParams.get("type") ?? "sleep") as ItemType;

  const itemId = searchParams.get("id");

  const { title } = useItemForm(formType);

  async function onSubmit(value: FormValue) {
    if (itemId) {
      await api.updateItem({...value, id: itemId});
    } else {
      await api.createItem(value);
    }

    open({
      content: t("formPage.submit.success", "Saved successfully"),
      severity: "success",
    });

    navigate("/");
  }

  return (
    <PageTemplate withAppBar title={title}>
      <BabyItemForm
        formType={formType}
        sx={{
          margin: "2rem auto 0",
        }}
        onSubmit={onSubmit}
      />
    </PageTemplate>
  );
}
