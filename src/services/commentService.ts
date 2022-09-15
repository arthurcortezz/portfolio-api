class CommentService {
  async newComment(object) {
    console.log(
      "🚀 ~ file: commentService.ts ~ line 3 ~ CommentService ~ newComment ~ object",
      object
    );
    try {
      console.log("Fim");
    } catch (error) {}
  }
}
export default new CommentService();
