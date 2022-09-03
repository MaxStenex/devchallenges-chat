import { zodResolver } from "@hookform/resolvers/zod";
import { createChannel } from "api/channels";
import { TextField } from "components/ui";
import { useRouter } from "next/router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { PopupWrapper } from ".";

const validationSchema = z.object({
  name: z.string().min(1, "Name is required.").max(255, "Max name length is 255."),
  description: z
    .string()
    .min(1, "Description is required.")
    .max(255, "Max description length is 255."),
});

export type CreateChannelInputs = z.infer<typeof validationSchema>;

type Props = {
  onClose: () => void;
};

export const CreateChannelPopup: React.FC<Props> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateChannelInputs>({
    resolver: zodResolver(validationSchema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<CreateChannelInputs> = async ({ description, name }) => {
    try {
      const { data } = await createChannel({ description, name });

      if (!data) return;

      const channelId = data?.id;

      router.push(`/channel/${channelId}`);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PopupWrapper onClose={onClose}>
      <div
        className="my-0 mx-auto text-white z-20 absolute bg-black
        top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
        rounded-lg py-8 px-7 w-1/4"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6 ">
          <h3 className="text-lg font-bold uppercase">New channel</h3>
          <TextField
            error={errors.name?.message}
            {...register("name")}
            placeholder="Name"
          />
          <TextField
            error={errors.description?.message}
            {...register("description")}
            placeholder="Description"
          />
          <button className="btn-primary flex ml-auto">Save</button>
        </form>
      </div>
    </PopupWrapper>
  );
};
