import {
  useForm,
  FormProvider,
  SubmitHandler,
  UseFormProps,
  FieldValues,
} from "react-hook-form";

interface Props<TFormData extends FieldValues> {
  children: React.ReactNode;
  onSubmit?: SubmitHandler<TFormData>;
  formOptions?: UseFormProps<TFormData>;
}

export const GenericForm = <TFormData extends FieldValues>({
  children,
  onSubmit,
  formOptions,
}: Props<TFormData>) => {
  const methods = useForm<TFormData>(formOptions);

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit && methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};
