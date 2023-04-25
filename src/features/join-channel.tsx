import React, { useState } from "react";
import Alert from "~/components/Alert";
import Button from "~/components/Button";
import TextInput from "~/components/TextInput";
import useEscapeKey from "~/hooks/useEscapeKey";
import useModal from "~/hooks/useModal";
import { api } from "~/utils/api";
import * as Yup from "yup";
import { type FormikHelpers } from "formik";
import { Form } from "~/components/Form";
import { AnimatePresence } from "framer-motion";

interface CreateChannelSchema {
  channelId: string;
}

const ValidationChannelSchema = Yup.object().shape({
  channelId: Yup.string().required("You must give an id"),
});

const useJoinChannel = (cb?: () => void) => {
  const initialValues: CreateChannelSchema = { channelId: "" };
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<"error" | "success" | "info">("info");
  const { refetch } = api.channel.getAllChannelsFromUser.useQuery({
    query: "",
  });
  const joinChannel = api.channel.joinToChannel.useMutation({
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
      joinChannel.mutate({ idChannel: values.channelId });
      setLoading(false);
      setStatus("success");
      setMessage("You are now in the channel!");
      actions.resetForm();
      setTimeout(() => {
        setMessage("");
        cb?.();
      }, 700);
      actions.resetForm();
    } catch (error) {
      setLoading(false);
      setStatus("error");
      setMessage("You must provied a valid id");
    }
  };
  return { initialValues, message, loading, status, handleSubmit };
};

function JoinChannel() {
  const { activeModal } = useModal();
  const { message, status, loading, initialValues, handleSubmit } =
    useJoinChannel(() => {
      activeModal(false);
    });
  useEscapeKey(() => {
    activeModal(false);
  });
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl">Join to Channel</h1>
      <Form
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={ValidationChannelSchema}
      >
        <TextInput name="channelId" placeholder="Write the Channel Id" />

        <AnimatePresence>
          {message !== "" ? <Alert type={status} message={message} /> : null}
        </AnimatePresence>
        <div className="flex flex-row justify-end gap-2">
          <Button
            variant="ghost"
            type="reset"
            action={() => {
              activeModal(false);
            }}
            className="bg-slate-100 text-gray-700 hover:bg-slate-200"
          >
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            Join to Channel
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default JoinChannel;
