import { SvelteKitAuth } from "@auth/sveltekit";
import { DynamoDB, type DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { DynamoDBAdapter } from "@auth/dynamodb-adapter";
import Cognito from "@auth/sveltekit/providers/cognito";
import {
  AWS_ACCESS_KEY_ID,
  AWS_DEFAULT_REGION,
  AWS_SECRET_ACCESS_KEY,
  AUTH_COGNITO_ID,
  AUTH_COGNITO_SECRET,
  AUTH_COGNITO_ISSUER
} from "$env/static/private";

const config: DynamoDBClientConfig = {
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID!,
    secretAccessKey: AWS_SECRET_ACCESS_KEY!,
  },
  region: AWS_DEFAULT_REGION!,
};

const client = DynamoDBDocument.from(new DynamoDB(config), {
  marshallOptions: {
    convertEmptyValues: true,
    removeUndefinedValues: true,
    convertClassInstanceToMap: true,
  },
});

export const { handle, signIn, signOut } = SvelteKitAuth({
  providers: [
    Cognito({
      clientId: AUTH_COGNITO_ID,
      clientSecret: AUTH_COGNITO_SECRET,
      issuer: AUTH_COGNITO_ISSUER,
      redirectProxyUrl: "https://a3f67d70abaf.ngrok-free.app",
    }),
  ],
  adapter: DynamoDBAdapter(client, { tableName: "check-in-easy" }),
  pages: {
    signIn: "/",
  },
});
