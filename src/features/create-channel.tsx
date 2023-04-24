/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import Alert from "~/components/Alert";
import Button from "~/components/Button";
import TextInput from "~/components/TextInput";
import useEscapeKey from "~/hooks/useEscapeKey";
import useModal from "~/hooks/useModal";
import { api } from "~/utils/api";
import { type FormikHelpers } from "formik";
import { Form } from "~/components/Form";
import * as Yup from "yup";

interface CreateChannelSchema {
  channelName: string;
}

const ValidationChannelSchema = Yup.object().shape({
  channelName: Yup.string().required("You need to asign a name to the channel"),
});

const useCreateChannel = (cb?: () => void) => {
  const initialValues: CreateChannelSchema = { channelName: "" };
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<"error" | "success" | "info">("info");
  const { refetch } = api.channel.getAllChannelsFromUser.useQuery({
    query: "",
  });
  const createChannel = api.channel.createChannel.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  const handleSubmit = (
    values: CreateChannelSchema,
    actions: FormikHelpers<CreateChannelSchema>
  ) => {
    setLoading(true);
    try {
      createChannel.mutate({ name: values.channelName });
      setLoading(false);
      setStatus("success");
      setMessage("Channel Created!");
      setTimeout(() => {
        setMessage("");
        cb?.();
      }, 700);
      actions.resetForm();
    } catch (error) {
      setLoading(false);
      setStatus("error");
      setMessage("Something went wrong try again");
    }
  };
  return { initialValues, message, loading, status, handleSubmit };
};

function CreateChannel() {
  const { activeModal } = useModal();
  const { message, status, loading, initialValues, handleSubmit } =
    useCreateChannel(() => {
      activeModal(false);
    });
  useEscapeKey(() => {
    activeModal(false);
  });
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl">Create New Channel</h1>
      <Form
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={ValidationChannelSchema}
      >
        <TextInput placeholder="Write the Channel Name" name="channelName" />
        <AnimatePresence>
          {message !== "" ? <Alert type={status} message={message} /> : null}
        </AnimatePresence>
        <div className="flex flex-row justify-end gap-2">
          <Button
            type="reset"
            action={() => {
              activeModal(false);
            }}
            variant="ghost"
            className="bg-slate-100 text-gray-700 hover:bg-slate-200"
          >
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            Create New Channel
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateChannel;
