/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";
import Pusher from "pusher";
import {
    createTRPCRouter,
    protectedProcedure,
} from "~/server/api/trpc";

const pusher = new Pusher({
    appId: "1584698",
    key: "5d2f917fab53dcb45cc6",
    secret: "783f77012e09d9dab867",
    cluster: "us2",
    useTLS: true
});

export const messageRouter = createTRPCRouter({

    getAllFromChannel: protectedProcedure.input(z.object({ idChannel: z.string() })).query(({ input, ctx }) => {
        return ctx.prisma.message.findMany({
            where: { channelId: input.idChannel },
            select: {
                User: {
                    select: {
                        name: true,
                        image: true,
                    }
                },
                id: true,
                content: true,
                createdAt: true
            },
            orderBy: {
                createdAt: "desc"
            }

        });
    }),
    createMessage: protectedProcedure
        .input(z.object({
            idChannel: z.string(),
            content: z.string()
        }))
        .mutation(async ({ input, ctx }) => {
            return ctx.prisma.message.create({
                data: {
                    author: ctx.session.user.id ?? "",
                    content: input.content,
                    channelId: input.idChannel,
                }
            }).then(async () => {
                await pusher.trigger(input.idChannel, "e_message", {})
            })
        }),
});