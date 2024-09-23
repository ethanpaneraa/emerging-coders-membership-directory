import { z } from "zod";

import { createTRPCRouter, authenticatedProcedure } from "~/server/api/trpc";
import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { env } from "~/env";
import { TRPCError } from "@trpc/server";
import { v4 as uuidv4 } from "uuid";
import { profile, users } from "~/server/db/schema";
import { eq } from "drizzle-orm";

const MAX_FILE_UPLOAD_SIZE = 10000000; // 10MB

const s3 = new S3Client({
  region: env.AWS_REGION,
  endpoint: env.AWS_ENDPOINT,
  forcePathStyle: true,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

export const userProfileRouter = createTRPCRouter({
  getProfile: authenticatedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db
      .select()
      .from(users)
      .where(eq(users.id, ctx.user.id))
      .limit(1);

    if (!user || user.length == 0) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }

    return user[0];
  }),

  updateProfile: authenticatedProcedure
    .input(
      z.object({
        bio: z.string().optional(),
        avatar_url: z.string().optional(),
        skills: z.string().optional(),
        linkedln_url: z.string().optional(),
        github_url: z.string().optional(),
        website_url: z.string().optional(),
        resume_url: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const updatedUser = await ctx.db
        .update(profile)
        .set({
          bio: input.bio,
          avatar_url: input.avatar_url,
          skills: input.skills,
          linkedln_url: input.linkedln_url,
          github_url: input.github_url,
          website_url: input.website_url,
          resume_url: input.resume_url,
        })
        .where(eq(users.id, ctx.user.id))
        .returning();

      return updatedUser[0];
    }),

  createPresignedUrlForProfilePicture: authenticatedProcedure.mutation(
    async ({ ctx }) => {
      let imageId;
      try {
        imageId = uuidv4();
      } catch {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to generate UUID",
        });
      }
      await ctx.db
        .update(profile)
        .set({ profileImageId: imageId })
        .where(eq(profile.user_id, ctx.user.id));

      return createPresignedPost(s3, {
        Bucket: env.AWS_S3_BUCKET_NAME,
        Key: imageId,
        Fields: {
          key: imageId,
        },
        Conditions: [
          ["starts-with", "$Content-Type", "image/"],
          ["content-length-range", 0, MAX_FILE_UPLOAD_SIZE],
        ],
      });
    },
  ),

  getProfilePictureURK: authenticatedProcedure.query(async ({ ctx }) => {
    const userProfile = await ctx.db
      .select()
      .from(profile)
      .where(eq(profile.user_id, ctx.user.id))
      .limit(1);

    if (
      !userProfile ||
      userProfile.length === 0 ||
      !userProfile[0]?.profileImageId
    ) {
      return null;
    }

    return `${env.AWS_ENDPOINT}/${env.AWS_S3_BUCKET_NAME}/${userProfile[0].profileImageId}`;
  }),
});
