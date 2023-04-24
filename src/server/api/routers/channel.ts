import type { ChannelUser } from "@prisma/client";
import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
} from "~/server/api/trpc";

export const channelRouter = createTRPCRouter({
    getAllChannelsFromUser: protectedProcedure
        .input(z.object({ query: z.string() }))
        .query(({ input, ctx }) => {
            return ctx.prisma.channelUser.findMany({
                where: {
                    OR: {
                        userId: ctx.session.user.id,
                        Channel: {
                            OR: {
                                name: { contains: input.query },
                            }
                        },
                    }
                },
                select: {
                    Channel: { select: { name: true, createdAt: true } },
                    channelId: true,
                    id: true
                },
                orderBy: {
                    Channel: {
                        createdAt: "desc"
                    }
                }
            })
        }),
    createChannel: protectedProcedure
        .input(z.object({ name: z.string() }))
        .mutation(({ ctx, input }) => {
            return ctx.prisma.channelUser.create({
                data: {
                    User: {
                        connect: { id: ctx.session.user.id }
                    },
                    Channel: {
                        create: { name: input.name }
                    }
                },
            })
        }),
    getChannelById: protectedProcedure
        .input(z.object({ channelId: z.string() }))
        .query(({ input, ctx }) => {
            return ctx.prisma.channel.findFirst({
                where: {
                    id: input.channelId
                }
            })
        }),
    cancelSuscriptionToChannel: protectedProcedure
        .input(z.object({ channelId: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const channelUsers: ChannelUser[] | null = await ctx.prisma.channelUser.findMany({ where: { channelId: input.channelId } })
            if (channelUsers.length === 1) {
                return ctx.prisma.channelUser.delete({
                    where: {
                        id: channelUsers[0]?.id,
                    }
                }).then(async () => {
                    await ctx.prisma.message.deleteMany({ where: { channelId: input.channelId } })
                    await ctx.prisma.channel.delete({ where: { id: input.channelId } })
                })
            } else {
                const channelToLeave = await ctx.prisma.channelUser.findFirst({ where: { userId: ctx.session.user.id } })
                return ctx.prisma.channelUser.delete({ where: { id: channelToLeave?.id } })
            }
        }),
    getUsersFromChannel: protectedProcedure
        .input(z.object({ channelId: z.string() })).query(({ input, ctx }) => {
            return ctx.prisma.channelUser.findMany({
                where: { channelId: input.channelId },
                select: {
                    User: {
                        select: {
                            name: true,
                            image: true
                        }
                    },
                    id: true
                },
                take: 5
            })
        }),
    joinToChannel: protectedProcedure
        .input(z.object({ idChannel: z.string() }))
        .mutation(({ ctx, input }) => {
            return ctx.prisma.channelUser.create({
                data: {
                    userId: ctx.session.user.id,
                    channelId: input.idChannel
                }
            })
        }),
});