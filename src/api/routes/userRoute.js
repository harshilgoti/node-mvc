exports.userRoutes = [
  {
    method: "GET",
    path: "/users",
    handler: "UserController.getAll",
  },
  {
    method: "POST",
    path: "/user",
    handler: "UserController.create",
  },
  //   {
  //     method: "GET",
  //     path: "/user/:user_id",
  //     handler: "UserController.getOne",
  //   },
  //   {
  //     method: "PUT",
  //     path: "/user/:user_id",
  //     handler: "UserController.update",
  //   },
  //   {
  //     method: "DELETE",
  //     path: "/user/:user_id",
  //     handler: "UserController.delete",
  //   },
];
