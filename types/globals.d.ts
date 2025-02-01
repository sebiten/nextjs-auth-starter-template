export {};

export type Roles = "admin" | "moderator";

declare global {
  interface CustomJWTSessionClaims {
    metadata: {
      role?: Roles | string;
    };
  }
}
