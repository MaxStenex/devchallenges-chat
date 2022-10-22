import { getChannelByInvitationHash } from "api/channels";
import { GetServerSideProps } from "next";
import { ReactElement } from "react";
import { getAuthToken } from "utils/getAuthToken";
import { Channel } from "types/channel";
import { acceptInvitation } from "api/channel-invitation";
import { useToasts } from "react-toast-notifications";
import { useRouter } from "next/router";

type Props = {
  channelData: Channel;
};

const InvitePage = ({ channelData }: Props) => {
  const { addToast } = useToasts();
  const router = useRouter();

  const redirectToChannel = () => {
    router.push(`/channel/${channelData.id}`);
  };

  const onAcceptClick = async () => {
    try {
      await acceptInvitation(channelData.id);

      redirectToChannel();
    } catch (error) {
      const errorData = (error as any).response?.data;

      const message = errorData.message || "Something went wrong";

      if (errorData.statusCode === 400) {
        redirectToChannel();
      } else {
        addToast(message, {
          appearance: "error",
        });
      }
    }
  };

  return (
    <div className="min-h-screen min-w-screen bg-zinc-800 flex justify-center items-center">
      <div className="bg-black w-96 text-gray-100 px-3 py-4 rounded">
        <h3 className="font-bold text-xl text-center">
          You are invited on {`${channelData.name}`}
        </h3>
        <button onClick={onAcceptClick} className="mt-4 w-full btn-primary">
          Accept invite
        </button>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const invitationHash = String(context.query.slug);

    const authToken = getAuthToken(context.req);

    if (!authToken) throw new Error("");

    const { data } = await getChannelByInvitationHash({
      hash: invitationHash,
      config: {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    });

    return {
      props: {
        channelData: {
          id: data.id,
          name: data.name,
          description: data.description,
        },
      } as Props,
    };
  } catch (error) {
    const redirectFrom = `?from=${context.req.url}`;

    return {
      redirect: {
        permanent: false,
        destination: "/login" + redirectFrom,
      },
    };
  }
};

InvitePage.getLayout = function getLayout(page: ReactElement) {
  return page;
};

export default InvitePage;
