"use client";
import updateInvitedBoards from "@/actions/aside/updateInvitedBoards";
import { updateBoardMembers } from "@/actions/board/updateBoardMembers";
import isUserRegistered from "@/actions/home/isUserRegistered";
import { useAppSelector } from "@/lib/redux-toolkit/hooks";
import { Button, Code } from "@nextui-org/react";
import { Check, CopyIcon, Link } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";

const ShareBoardForm = () => {
  const memberInputRef = useRef<HTMLInputElement>(null);
  const { userDbData, currentBoardData } = useAppSelector(
    (state) => state.board
  );

  const currentURL = window.location.href;
  const parsedUrl = new URL(currentURL);
  const origin = parsedUrl.origin;

  const [link, setLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const sendInvitationEmail = useCallback(
    (emailAddress: string, webLink: string) => {
      const subject = `Invitation to trello board`;
      const body = `You have been invited by ${userDbData?.name} to the trello board ${currentBoardData?.title}.
    click on the link: ${webLink} to gain access`;

      const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;
    },
    [currentBoardData?.title, userDbData?.name]
  );

  //update board members

  const handleBoardMembersUpdate = useCallback(() => {
    const newMemberEmail = memberInputRef?.current?.value as string;
    const existingMembers = currentBoardData?.members as string[];

    try {
      setLoading(true);
      if (newMemberEmail !== userDbData?.email) {
        const UpdateMember = async () => {
          const newMember = await isUserRegistered(newMemberEmail);

          const isAlreadyAMember =
            existingMembers.filter((member) => member === newMemberEmail)
              .length !== 0;

          if (!isAlreadyAMember) {
            if (newMember !== null) {
              const updatedMembersList = [
                ...(currentBoardData?.members as string[]),
                newMemberEmail,
              ] as string[];

              updateBoardMembers(
                currentBoardData?.id as string,
                currentBoardData?.authorId,
                updatedMembersList
              ).then(() => {
                setLink(
                  `${origin}/dashboard/${newMember.id}/${currentBoardData?.id}`
                );
                sendInvitationEmail(
                  newMemberEmail,
                  `${origin}/dashboard/${newMember?.id}/${currentBoardData?.id}`
                );
                toast(
                  newMember?.name +
                    "has been added to " +
                    currentBoardData?.title
                );
              });

              const updatedNewMemberInvites = [
                ...(newMember?.invites as string[]),
                currentBoardData?.id as string,
              ];

              const hasBoardIdInInvites =
                newMember?.invites?.filter((id) => id === currentBoardData?.id)
                  ?.length !== 0;

              if (!hasBoardIdInInvites) {
                await updateInvitedBoards(
                  newMemberEmail,
                  updatedNewMemberInvites
                );
              }
            } else {
              console.log("not a registerd user");
            }
          } else {
            setLink(
              `${origin}/dashboard/${newMember?.id}/${currentBoardData?.id}`
            );
            sendInvitationEmail(
              newMemberEmail,
              `${origin}/dashboard/${newMember?.id}/${currentBoardData?.id}`
            );
            console.log("already a board member");
          }
        };

        UpdateMember().then(() => {
          setLoading(false);
          if (memberInputRef?.current) {
            memberInputRef.current.value = "";
          }
        });
      } else {
        console.log("You are the admin");
      }
    } catch (error) {
      console.error(error);
    }
  }, [
    currentBoardData?.authorId,
    currentBoardData?.id,
    currentBoardData?.members,
    currentBoardData?.title,
    origin,
    sendInvitationEmail,
    userDbData?.email,
  ]);

  const copyText = useCallback((textToCopy: string) => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopied(true);
        toast("Text copied to clipboard: " + textToCopy);
        // Reset setCopied to false after 3 seconds
        setTimeout(() => {
          setCopied(false);
        }, 3000);
      })
      .catch((err) => {
        console.error("Error copying text: ", err);
      });
  }, []);

  return (
    <div className=" p-3  w-full">
      <h1 className="text-lg font-semibold mb-4">Invite to Workspace</h1>
      <div className="flex gap-3">
        {" "}
        <input
          ref={memberInputRef}
          className="w-full mb-4  px-3 py-2 border rounded-md focus:outline-none  focus:border-blue-500"
          type="text"
          placeholder="Email address or name"
        />
        <Button
          isLoading={loading}
          color="primary"
          onPress={handleBoardMembersUpdate}
        >
          {" "}
          Invite
        </Button>
      </div>

      <div className="flex justify-between gap-3">
        {" "}
        <div className="flex-col flex justify-between items-start mb-4">
          <span
            className="text-sm font-medium"
            data-testid="ws-share-link-label"
          >
            Invite someone to this Workspace with a link:
            {link !== null && (
              <div className="flex gap-2">
                <Code> {link}</Code>
                <button
                  onClick={() => {
                    copyText(link as string);
                  }}
                  className="text-gray-500  flex h-fit gap-1 items-center hover:text-gray-700 bg-black/10 p-2 rounded-md"
                  type="button"
                >
                  {copied ? <Check size={12} /> : <CopyIcon size={12} />}
                </button>
              </div>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ShareBoardForm;
