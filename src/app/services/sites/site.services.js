import { PrismaClient } from "@prisma/client";
import { successfulResponse, invalidResponse } from "../../../utils/index.js";

const prisma = new PrismaClient();
class SiteServices {

  async addSiteLink(body, userRole) {
    try {
      if (userRole !== "admin") {
        return {
          status: 403,
          json: invalidResponse("Only admins can add site links."),
        };
      }

      const { siteUrl, title, coverImage, description, category } = body;
   
      if (!siteUrl || !title || !description || !category) {
        return {
          status: 400,
          json: invalidResponse("Please provide siteUrl, title, description, and category."),
        };
      }
      const existingSite = await prisma.siteLink.findUnique({
        where: { siteUrl: siteUrl.trim() },
      });

      if (existingSite) {
        return {
          status: 400,
          json: invalidResponse("This website link already exists."),
        };
      }
      const site = await prisma.siteLink.create({
        data: {
          siteUrl: siteUrl.trim(),
          title: title.trim(),
          coverImage: coverImage || null,
          description: description.trim(),
          category: category.trim(),
           userId: body.userId || null,
        },
      });

      return {
        status: 201,
        json: successfulResponse("Site link added successfully!", { site }),
      };
    } catch (e) {
      console.error("Add Site Error:", e);
      return { status: 500, json: invalidResponse(e.message) };
    }
  }
  async getAllSites() {
    try {
      const sites = await prisma.siteLink.findMany({
        orderBy: { createdAt: "desc" },
      });

      return {
        status: 200,
        json: successfulResponse("All site links fetched successfully!", { sites }),
      };
    } catch (e) {
      console.error("Get Sites Error:", e);
      return { status: 500, json: invalidResponse(e.message) };
    }
  }

  async getSiteById(id) {
    try {
      const site = await prisma.SiteLink.findUnique({
        where: { id: Number(id) },
      });

      if (!site) {
        return { status: 404, json: invalidResponse("Site not found!") };
      }
      return {
        status: 200,
        json: successfulResponse("Site details fetched successfully!", { site }),
      };
    } catch (e) {
      console.error("Get Site By ID Error:", e);
      return { status: 500, json: invalidResponse(e.message) };
    }
  }
  async updateSite(id, body, userRole) {
    try {
      if (userRole !== "admin") {
        return {
          status: 403,
          json: invalidResponse("Only admins can update site links."),
        };
      }
      const { siteUrl, title, coverImage, description, category } = body;
      const site = await prisma.SiteLink.findUnique({
        where: { id: Number(id) },
      });

      if (!site) {
        return { status: 404, json: invalidResponse("Site not found!") };
      }

      const updatedSite = await prisma.SiteLink.update({
        where: { id: Number(id) },
        data: {
          siteUrl: siteUrl?.trim() || site.siteUrl,
          title: title?.trim() || site.title,
          coverImage: coverImage || site.coverImage,
          description: description?.trim() || site.description,
          category: category?.trim() || site.category,
        },
      });

      return {
        status: 200,
        json: successfulResponse("Site link updated successfully!", { updatedSite }),
      };
    } catch (e) {
      console.error("Update Site Error:", e);
      return { status: 500, json: invalidResponse(e.message) };
    }
  }
  async deleteSite(id, userRole) {
    try {
      if (userRole !== "admin") {
        return {
          status: 403,
          json: invalidResponse("Only admins can delete site links."),
        };
      }

      const site = await prisma.SiteLink.findUnique({
        where: { id: Number(id) },
      });

      if (!site) {
        return { status: 404, json: invalidResponse("Site not found!") };
      }

      await prisma.SiteLink.delete({
        where: { id: Number(id) },
      });

      return {
        status: 200,
        json: successfulResponse("Site link deleted successfully!"),
      };
    } catch (e) {
      console.error("Delete Site Error:", e);
      return { status: 500, json: invalidResponse(e.message) };
    }
  }
}

export const {
  addSiteLink,
  getAllSites,
  getSiteById,
  updateSite,
  deleteSite,
} = new SiteServices();
