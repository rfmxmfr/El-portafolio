import { defineStackbitConfig, SiteMapEntry } from "@stackbit/types";
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
  // ...
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ["content"],
      models: [
        {
          name: "Page",
          type: "page",
          // Static URL path derived from the "slug" field
          urlPath: "/{slug}",
          filePath: "content/pages/{slug}.json",
          fields: [
            { name: "title", type: "string", required: true },
            { name: "slug", type: "string", required: true }
          ]
        },
        {
          name: "BlogPost",
          type: "page",
          // Static URL path for blog posts
          urlPath: "/blog/{slug}",
          filePath: "content/blog/{slug}.json",
          fields: [
            { name: "title", type: "string", required: true },
            { name: "slug", type: "string", required: true },
            { name: "date", type: "date", required: true },
            { name: "author", type: "string" }
          ]
        },
        {
          name: "ProjectPage",
          type: "page",
          // Static URL path for project pages
          urlPath: "/projects/{slug}",
          filePath: "content/projects/{slug}.json",
          fields: [
            { name: "title", type: "string", required: true },
            { name: "slug", type: "string", required: true },
            { name: "category", type: "string" }
          ]
        },
        {
          name: "CategoryPage",
          type: "data",
          filePath: "content/categories/{slug}.json",
          fields: [
            { name: "title", type: "string", required: true },
            { name: "slug", type: "string", required: true },
            { name: "description", type: "string" }
          ]
        }
      ],
    })
  ],
  siteMap: ({ documents, models }) => {
    // 1. Filter all page models
    const pageModels = models.filter((m) => m.type === "page");
    
    // 2. Find the home page document
    const homePage = documents.find(doc => 
      doc.modelName === "Page" && doc.fields?.slug === "home"
    );

    // 3. Create site map entries for all page documents
    const pageEntries = documents
      .filter((doc) => pageModels.some(m => m.name === doc.modelName))
      .map((document) => {
        // Basic entry with standard URL path
        const entry: SiteMapEntry = {
          stableId: document.id,
          document,
          isHomePage: document === homePage
        };

        // Handle special URL cases
        if (document.modelName === "Page") {
          if (document.fields?.slug === "home") {
            entry.urlPath = "/";
          } else {
            entry.urlPath = `/${document.fields?.slug}`;
          }
        } else if (document.modelName === "BlogPost") {
          entry.urlPath = `/blog/${document.fields?.slug}`;
        } else if (document.modelName === "ProjectPage") {
          // For projects, include the category in the URL if available
          const category = document.fields?.category;
          if (category) {
            entry.urlPath = `/projects/${category}/${document.fields?.slug}`;
          } else {
            entry.urlPath = `/projects/${document.fields?.slug}`;
          }
        }

        return entry;
      });

    // 4. Create site map entries for category pages (which aren't page models but need URLs)
    const categoryEntries = documents
      .filter((doc) => doc.modelName === "CategoryPage")
      .map((document) => {
        return {
          stableId: document.id,
          urlPath: `/categories/${document.fields?.slug}`,
          document,
          isHomePage: false
        } as SiteMapEntry;
      });

    return [...pageEntries, ...categoryEntries];
  }
});