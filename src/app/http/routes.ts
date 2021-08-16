import { Request, Response, Router } from "express";

import { Container } from "../Container";

export const registerRoutes = (router: Router): void => {
  const container: Container = Container.getContainer();

  router.post("/transfers", (req: Request, res: Response) =>
    container.transferPostController.run(req, res)
  );
  router.get("/accounts/:id", (req: Request, res: Response) =>
    container.accountGetController.run(req, res)
  );
};
