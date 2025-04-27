import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import express from "express";
import * as dotenv from "dotenv";
import { z } from "zod";
import { getUserSummary, addUserSummary, updateUserSummary } from "./db/postgres.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
dotenv.config();
const addUserSummarySchema = {
    id: z.string().max(12).describe("The unique ID for the user"),
    academic: z.string().optional().describe("Academic summary information"),
    psycological: z.string().optional().describe("Psychological summary information"),
    interpersonal: z.string().optional().describe("Interpersonal summary information"),
    physical: z.string().optional().describe("Physical summary information"),
};
const updateUserSummarySchema = {
    id: z.string().max(12).describe("The unique ID of the user to update"),
    academic: z.string().optional().nullable().describe("New academic summary information (optional)"),
    psycological: z.string().optional().nullable().describe("New psychological summary information (optional)"),
    interpersonal: z.string().optional().nullable().describe("New interpersonal summary information (optional)"),
    physical: z.string().optional().nullable().describe("New physical summary information (optional)"),
};
const server = new McpServer({
    name: "Demo",
    version: "1.0.0",
}, { capabilities: { logging: {} } });
server.tool("add-user-summary", addUserSummarySchema, async (summaryData) => {
    const dataToInsert = {
        id: summaryData.id,
        academic: summaryData.academic ?? null,
        psycological: summaryData.psycological ?? null,
        interpersonal: summaryData.interpersonal ?? null,
        physical: summaryData.physical ?? null,
    };
    const newSummary = await addUserSummary(dataToInsert);
    return {
        content: [{ type: "text", text: JSON.stringify(newSummary ?? { error: "Failed to add user summary" }) }]
    };
});
server.tool("get-user-summary", { id: z.string().max(12).describe("The unique ID for the user") }, async ({ id }) => {
    const summary = await getUserSummary(id);
    return {
        content: [{ type: "text", text: JSON.stringify(summary ?? { error: "Failed to add user summary" }) }]
    };
});
server.tool("update-user-summary", updateUserSummarySchema, async ({ id, ...fieldsToUpdate }) => {
    const updatedSummary = await updateUserSummary(id, fieldsToUpdate);
    return {
        content: [{ type: "text", text: JSON.stringify(updatedSummary ?? { error: `Failed to update user summary for ID: ${id}` }) }]
    };
});
const app = express();
let transport = null;
app.get("/sse", (_req, res) => {
    transport = new SSEServerTransport("/messages", res);
    server.connect(transport);
});
app.post("/messages", (req, res) => {
    if (transport) {
        transport.handlePostMessage(req, res);
    }
});
app.listen(process.env.PORT ?? 3000);
