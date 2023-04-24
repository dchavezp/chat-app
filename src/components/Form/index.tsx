/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Formik, Form as FormF, type FormikHelpers } from "formik";
interface FormProps {
  children?: React.ReactNode;
  initialValues: any;
  validationSchema?: any;
  onSubmit: (values: any, formikHelpers: FormikHelpers<any>) => void;
}

export const Form = ({
  children,
  initialValues,
  validationSchema,
  onSubmit,
}: FormProps) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <FormF className="flex flex-col gap-2">{children}</FormF>
    </Formik>
  );
};
