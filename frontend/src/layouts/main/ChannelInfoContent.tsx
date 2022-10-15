import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { getChannelById } from "api/channels";
import { Channel } from "types/channel";
import { getChannelInvitation } from "api/channel-invitation";
import { useUser } from "state/user";
import { useToasts } from "react-toast-notifications";
import { useSocket } from "state/socket";

type Props = {
  onGoHomeClick: () => void;
};

type ChannelRole = "ADMIN" | "USER";

type ChannelMember = { id: number; username: string; role: ChannelRole };

type ChannelInfo = Channel & {
  members: ChannelMember[];
};

export const ChannelInfoContent: React.FC<Props> = ({ onGoHomeClick }) => {
  const { user } = useUser();
  const { addToast } = useToasts();
  const { socket } = useSocket();

  const [channelInfo, setChannelInfo] = useState<ChannelInfo | null>(null);
  const channelAdmin = channelInfo?.members.find((m) => m.role === "ADMIN");

  const userIsAdmin = channelAdmin?.id === user.id;

  const [invitationLink, setInvitationLink] = useState("");

  const router = useRouter();
  const channelId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : null;

  useEffect(() => {
    if (channelId) {
      getChannelById(channelId).then(({ data }) =>
        setChannelInfo({
          id: data.id,
          description: data.description,
          name: data.name,
          members: data.members.map((m: any) => ({
            id: m.user.id,
            username: m.user.username,
            role: m.role,
          })),
        })
      );

      socket.on("new-channel-user", ({ data }) => {
        const newUser: ChannelMember = data;

        setChannelInfo((prev) => {
          if (!prev) return prev;

          return { ...prev, members: [...prev.members, newUser] };
        });
      });
    }

    return () => {
      socket.removeAllListeners("new-channel-user");
    };
  }, [channelId, socket]);

  useEffect(() => {
    if (channelId && userIsAdmin) {
      getChannelInvitation(channelId).then(({ data }) => setInvitationLink(data));
    }
  }, [channelId, userIsAdmin]);

  const onInviteClick = async () => {
    try {
      const fullLink = `${window.location.host}/invite/${invitationLink}`;
      await navigator.clipboard.writeText(fullLink);
      addToast("Invitation link copied successfully", {
        appearance: "success",
      });
    } catch (error) {
      addToast("Something went wrong, please try again later", {
        appearance: "error",
      });
    }
  };

  return (
    <div className="flex-1">
      <div className="flex justify-between items-center py-3 mb-6">
        <button
          onClick={onGoHomeClick}
          className="text-gray-100 text-lg flex items-center"
        >
          <div className="flex mr-5 rotate-90">
            <Image width={15} height={15} src="/icons/dropdown.svg" alt="" />
          </div>
          All channels
        </button>
      </div>
      {channelInfo && (
        <div className="text-gray-100">
          <div className="mb-10 space-y-4">
            <h3 className="font-bold text-lg uppercase">{channelInfo.name}</h3>
            <div className="text-lg leading-4">{channelInfo.description}</div>
            {invitationLink && (
              <button
                onClick={onInviteClick}
                className="font-bold underline hover:no-underline"
              >
                Invite new member
              </button>
            )}
          </div>
          <div className="mb-6">
            <h4 className="font-bold text-lg uppercase mb-6">Members</h4>
            <div className="space-y-3">
              {channelInfo.members.map((m) => (
                <div key={m.id} className="font-bold text-gray-300">
                  {m.username}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
