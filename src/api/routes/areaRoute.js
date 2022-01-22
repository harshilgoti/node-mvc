exports.areaRoutes = [
  {
    method: "GET",
    path: "/areas",
    handler: "AreaController.getAll",
  },
  {
    method: "POST",
    path: "/area",
    handler: "AreaController.create",
  },
  {
    method: "GET",
    path: "/area/:area_slug",
    handler: "AreaController.getOne",
  },
  {
    method: "PUT",
    path: "/area/:area_id",
    handler: "AreaController.update",
  },
  {
    method: "DELETE",
    path: "/area/:area_id",
    handler: "AreaController.delete",
  },
];
