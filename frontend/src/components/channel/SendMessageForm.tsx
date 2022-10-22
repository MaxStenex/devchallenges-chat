import React from "react";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSocket } from "state/socket";
import { useUser } from "state/user";
import { useRouter } from "next/router";

const validationSchema = z.object({
  text: z.string().min(1, "The text is required.").max(255, "Max text length is 255."),
});

type FormInputs = z.infer<typeof validationSchema>;

export const SendMessageForm = () => {
  const { register, handleSubmit, reset } = useForm<FormInputs>({
    resolver: zodResolver(validationSchema),
  });

  const { socket } = useSocket();
  const { user } = useUser();
  const router = useRouter();
  const channelId = String(router.query.id);

  const onSubmit: SubmitHandler<FormInputs> = async ({ text }) => {
    try {
      const message = {
        text,
        senderId: user.id,
        channelId: parseInt(channelId),
      };

      socket.emit("new-user-message", message);
      reset();
    } catch (error) {}
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-11 mb-5">
      <div className="input-primary flex justify-between items-center pl-0 py-2">
        <input
          type="text"
          placeholder="Type a message here"
          className="flex-1 mr-3 pl-2 bg-transparent h-9"
          {...register("text")}
        />
        <button className="w-8 h-8 px-2 py-2 rounded bg-blue-600">
          <Image src="/icons/send-message.svg" alt="" width="100%" height="100%" />
        </button>
      </div>
    </form>
  );
};
