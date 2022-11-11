import yup from "./validation/validator";

export const commentSchema = yup.object().shape({
  body: yup
    .object()
    .shape({
      name: yup.string().required().label("Name"),
      reason: yup.string().required().label("Reason"),
      message: yup.string().required().label("Message"),
    })
    .noUnknown(true),
});

export type CommentSchema = yup.TypeOf<typeof commentSchema>;
