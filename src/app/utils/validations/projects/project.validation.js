import { body, query, param } from "express-validator";

export const createProjectValidation = [
  body("name").isString().withMessage("Name is required"),
  body("description").isString().withMessage("Description is required"),
  body("skills").isArray().withMessage("Skills must be an array"),
  body("githubUrl")
    .optional()
    .isURL()
    .withMessage("GitHub URL must be a valid URL"),
  body("websiteUrl")
    .optional()
    .isURL()
    .withMessage("Website URL must be a valid URL"),
  body("imageUrl")
    .optional()
    .isURL()
    .withMessage("Image URL must be a valid URL")
];

const ensureAtLeastOneUpdateField = (value) => {
  if (!value || typeof value !== "object") return false;
  const allowed = [
    "name",
    "description",
    "skills",
    "githubUrl",
    "websiteUrl",
    "imageUrl"
  ];
  return allowed.some((k) => Object.prototype.hasOwnProperty.call(value, k));
};

export const updateProjectValidation = [
  param("id").isUUID().withMessage("Invalid id"),
  body()
    .custom(ensureAtLeastOneUpdateField)
    .withMessage("At least one updatable field must be provided"),
  body("name").optional().isString().withMessage("Name must be a string"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  body("skills").optional().isArray().withMessage("Skills must be an array"),
  body("skills.*").optional().isString().withMessage("Skill must be a string"),
  body("githubUrl")
    .optional()
    .isURL()
    .withMessage("GitHub URL must be a valid URL"),
  body("websiteUrl")
    .optional()
    .isURL()
    .withMessage("Website URL must be a valid URL"),
  body("imageUrl")
    .optional()
    .isURL()
    .withMessage("Image URL must be a valid URL")
];

export const deleteProjectValidation = [
  param("id")
    .isUUID()
    .withMessage("Invalid id")
];
