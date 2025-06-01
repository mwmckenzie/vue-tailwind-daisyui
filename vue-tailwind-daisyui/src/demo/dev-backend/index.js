import express from "express";
import cors from "cors";
import { randomUUID } from "crypto";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

// Determine __dirname in ESM:
const __dirname = dirname(fileURLToPath(import.meta.url));
const CATEGORIES_FILE = join(__dirname, "data", "categories.json");
const TOPICS_FILE     = join(__dirname, "data", "topics.json");


/**
 * Loads and parses JSON data from a specified file.
 *
 * @param {string} filePath - The path to the file to be loaded.
 * @return {Array|Object} Returns the parsed JSON data as an object or array. Returns an empty array if an error occurs.
 */
function loadData(filePath) {
    try {
        const raw = fs.readFileSync(filePath, "utf8");
        // Strip BOM (0xFEFF) if it’s at the very beginning
        const withoutBOM = raw.replace(/^\uFEFF/, "");
        return JSON.parse(withoutBOM);
    } catch (err) {
        console.error(`Failed to load ${filePath}:`, err);
        return [];
    }
}


/**
 * Saves the provided data to the specified file path in JSON format.
 *
 * @param {string} filePath - The path of the file where data should be saved.
 * @param {Object} data - The data to be saved in the file.
 * @returns {Promise<void>} A promise that resolves once the data has been successfully written to the file.
 */
function saveData(filePath, data) {
    return fs.promises.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
}

// In-memory stores (initialized from files):
let categories = loadData(CATEGORIES_FILE);
let topics     = loadData(TOPICS_FILE);

// Enable CORS so your Vite frontend (e.g. http://localhost:5173) can call this
app.use(
    cors({
        origin: ["http://localhost:5173"], // adjust to your Vite dev URL
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// Parse JSON bodies
app.use(express.json());

/**
 * ─── CATEGORIES ROUTES ───────────────────────────────────────────────────────────
 */

// GET /categories → return all categories
app.get("/categories", (req, res) => {
    return res.json(categories);
});

// GET /categories/:id → return single category
app.get("/categories/:id", (req, res) => {
    const { id } = req.params;
    const category = categories.find((c) => c.id === id);
    if (!category) {
        return res.status(404).json({ error: "Category not found" });
    }
    return res.json(category);
});

// POST /categories → create a new category
app.post("/categories", async (req, res) => {
    const { name } = req.body;
    if (!name || typeof name !== "string") {
        return res.status(400).json({ error: "Name is required" });
    }

    const newCategory = { id: randomUUID(), name: name.trim() };
    categories.push(newCategory);

    try {
        await saveData(CATEGORIES_FILE, categories);
        return res.status(201).json(newCategory);
    } catch (err) {
        console.error("Error saving categories.json:", err);
        return res.status(500).json({ error: "Failed to persist category" });
    }
});

// PUT /categories/:id → update a category
app.put("/categories/:id", async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if (!name || typeof name !== "string") {
        return res.status(400).json({ error: "Name is required" });
    }

    const index = categories.findIndex((c) => c.id === id);
    if (index === -1) {
        return res.status(404).json({ error: "Category not found" });
    }

    categories[index].name = name.trim();
    try {
        await saveData(CATEGORIES_FILE, categories);
        return res.json(categories[index]);
    } catch (err) {
        console.error("Error saving categories.json:", err);
        return res.status(500).json({ error: "Failed to persist category update" });
    }
});

// DELETE /categories/:id → delete a category (and its topics)
app.delete("/categories/:id", async (req, res) => {
    const { id } = req.params;
    const categoryIndex = categories.findIndex((c) => c.id === id);
    if (categoryIndex === -1) {
        return res.status(404).json({ error: "Category not found" });
    }

    // Remove the category
    categories.splice(categoryIndex, 1);
    // Also remove any topics that belonged to this category
    topics = topics.filter((t) => t.categoryId !== id);

    try {
        // Persist both changes
        await Promise.all([
            saveData(CATEGORIES_FILE, categories),
            saveData(TOPICS_FILE, topics),
        ]);
        return res.status(204).send();
    } catch (err) {
        console.error("Error persisting delete:", err);
        return res.status(500).json({ error: "Failed to delete category" });
    }
});

/**
 * ─── TOPICS ROUTES ────────────────────────────────────────────────────────────────
 */

// GET /categories/:categoryId/topics → all topics for one category
app.get("/categories/:categoryId/topics", (req, res) => {
    const { categoryId } = req.params;
    // Verify category exists
    const categoryExists = categories.some((c) => c.id === categoryId);
    if (!categoryExists) {
        return res.status(404).json({ error: "Category not found" });
    }

    const categoryTopics = topics.filter((t) => t.categoryId === categoryId);
    return res.json(categoryTopics);
});

// GET /topics/:id → single topic by ID
app.get("/topics/:id", (req, res) => {
    const { id } = req.params;
    const topic = topics.find((t) => t.id === id);
    if (!topic) {
        return res.status(404).json({ error: "Topic not found" });
    }
    return res.json(topic);
});

// POST /categories/:categoryId/topics → create a topic under a category
app.post("/categories/:categoryId/topics", async (req, res) => {
    const { categoryId } = req.params;
    const { title } = req.body;

    // Check that category exists
    const categoryExists = categories.some((c) => c.id === categoryId);
    if (!categoryExists) {
        return res.status(404).json({ error: "Category not found" });
    }
    if (!title || typeof title !== "string") {
        return res.status(400).json({ error: "Title is required" });
    }

    const newTopic = {
        id: randomUUID(),
        title: title.trim(),
        categoryId,
    };
    topics.push(newTopic);

    try {
        await saveData(TOPICS_FILE, topics);
        return res.status(201).json(newTopic);
    } catch (err) {
        console.error("Error saving topics.json:", err);
        return res.status(500).json({ error: "Failed to persist topic" });
    }
});

// PUT /topics/:id → update a topic
app.put("/topics/:id", async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    if (!title || typeof title !== "string") {
        return res.status(400).json({ error: "Title is required" });
    }

    const idx = topics.findIndex((t) => t.id === id);
    if (idx === -1) {
        return res.status(404).json({ error: "Topic not found" });
    }

    topics[idx].title = title.trim();
    try {
        await saveData(TOPICS_FILE, topics);
        return res.json(topics[idx]);
    } catch (err) {
        console.error("Error saving topics.json:", err);
        return res.status(500).json({ error: "Failed to persist topic update" });
    }
});

// DELETE /topics/:id → delete a topic
app.delete("/topics/:id", async (req, res) => {
    const { id } = req.params;
    const idx = topics.findIndex((t) => t.id === id);
    if (idx === -1) {
        return res.status(404).json({ error: "Topic not found" });
    }
    topics.splice(idx, 1);

    try {
        await saveData(TOPICS_FILE, topics);
        return res.status(204).send();
    } catch (err) {
        console.error("Error saving topics.json:", err);
        return res.status(500).json({ error: "Failed to persist topic deletion" });
    }
});

/**
 * ─── START SERVER ───────────────────────────────────────────────────────────────────
 */
app.listen(PORT, () => {
    console.log(`Dev backend running on http://localhost:${PORT}`);
});
