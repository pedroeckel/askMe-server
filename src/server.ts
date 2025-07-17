import { fastifyCors } from "@fastify/cors";
import { fastify } from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { env } from "./env.ts";
import { createQuestionRoute } from "./http/routes/create-question.ts";
import { createRoomRoute } from "./http/routes/create-rooms.ts";
import { getRoomsRoute } from "./http/routes/get-rooms.ts";
import { getRoomQuestionsRoute } from "./http/routes/get-rooms-questions.ts";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: "http://localhost:5173",
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get("/health", () => {
  return "ok";
});

app.register(getRoomsRoute);
app.register(createRoomRoute);
app.register(getRoomQuestionsRoute);
app.register(createQuestionRoute);

app.listen({
  port: env.PORT,
});
