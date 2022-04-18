BEGIN;

CREATE EXTENSION "uuid-ossp";

CREATE TABLE "users" (
  "id" uuid NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  "username" VARCHAR(30) NOT NULL UNIQUE,
  "password_hash" VARCHAR(30) NOT NULL,
  "email" VARCHAR NOT NULL UNIQUE,
  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  PRIMARY KEY ("id")
);

CREATE INDEX ON "users" (id);

CREATE INDEX ON "users" (username);

CREATE INDEX ON "users" (password_hash);

CREATE INDEX ON "users" (email);

CREATE INDEX ON "users" (created_at);

CREATE INDEX ON "users" (updated_at);

CREATE TABLE "posts" (
  "id" uuid NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  "user_id" uuid NOT NULL,
  "title" varchar(300) NOT NULL,
  "body" varchar(40000),
  "image" text,
  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  PRIMARY KEY ("id"),
  FOREIGN KEY ("user_id") REFERENCES users("id")
);

CREATE INDEX ON "posts" (id);

CREATE INDEX ON "posts" (user_id);

CREATE INDEX ON "posts" (title);

CREATE INDEX ON "posts" (body);

CREATE INDEX ON "posts" (image);

CREATE INDEX ON "posts" (created_at);

CREATE INDEX ON "posts" (updated_at);

CREATE TABLE "comments" (
  "id" uuid NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  "user_id" uuid NOT NULL,
  "post_id" uuid NOT NULL,
  "body" VARCHAR(10000),
  "image" TEXT,
  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  PRIMARY KEY ("id"),
  FOREIGN KEY ("user_id") REFERENCES users("id"),
  FOREIGN KEY ("post_id") REFERENCES posts("id")
);

CREATE INDEX ON "comments" (id);

CREATE INDEX ON "comments" (user_id);

CREATE INDEX ON "comments" (post_id);

CREATE INDEX ON "comments" (body);

CREATE INDEX ON "comments" (image);

CREATE INDEX ON "comments" (created_at);

CREATE INDEX ON "comments" (updated_at);

CREATE TABLE "user_post_votes" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "user_id" uuid NOT NULL,
  "post_id" uuid NOT NULL,
  "vote" BOOLEAN,
  PRIMARY KEY ("id"),
  FOREIGN KEY ("user_id") REFERENCES users("id"),
  FOREIGN KEY ("post_id") REFERENCES posts("id"),
  UNIQUE("user_id", "post_id")
);

CREATE INDEX ON "user_post_votes" (id);

CREATE INDEX ON "user_post_votes" (user_id);

CREATE INDEX ON "user_post_votes" (post_id);

CREATE INDEX ON "user_post_votes" (vote);

CREATE TABLE "user_comment_votes" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "user_id" uuid NOT NULL,
  "comment_id" uuid NOT NULL,
  "vote" BOOLEAN,
  PRIMARY KEY ("id"),
  FOREIGN KEY ("user_id") REFERENCES users("id"),
  FOREIGN KEY ("comment_id") REFERENCES comments("id"),
  UNIQUE("user_id", "comment_id")
);

CREATE INDEX ON "user_comment_votes" (id);

CREATE INDEX ON "user_comment_votes" (user_id);

CREATE INDEX ON "user_comment_votes" (comment_id);

CREATE INDEX ON "user_comment_votes" (vote);

COMMIT;