import { addSiteLink, getAllSites, getSiteById, updateSite, deleteSite } from "../../services/sites/site.services.js";

class SiteController {

  async add(req, res) {
    const { status, json } = await addSiteLink(
      { ...req.body, userId: req.user?.id }, 
      req.user?.role || "user"
    );
    return res.status(status).json(json);
  }

  async getAll(req, res) {
    const { status, json } = await getAllSites();
    return res.status(status).json(json);
  }

  async getById(req, res) {
    const { id } = req.params;
    const { status, json } = await getSiteById(id);
    return res.status(status).json(json);
  }

  async update(req, res) {
    const { id } = req.params;
    const { status, json } = await updateSite(id, req.body, req.user?.role || "user");
    return res.status(status).json(json);
  }

  async remove(req, res) {
    const { id } = req.params;
    const { status, json } = await deleteSite(id, req.user?.role || "user");
    return res.status(status).json(json);
  }
}

export const { add, getAll, getById, update, remove } = new SiteController();
