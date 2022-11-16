export { default as Login } from "./login";
export { default as Comment } from "./comment";
export { default as Notification } from "./notification";
import * as Router from ".";
export const Routes = [Router.Comment, Router.Notification, Router.Login];
