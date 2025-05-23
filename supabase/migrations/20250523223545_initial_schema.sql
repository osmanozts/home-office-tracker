create extension if not exists "pgjwt" with schema "extensions";


create table "public"."employees" (
    "id" uuid not null,
    "email" text not null,
    "created_at" timestamp with time zone default now()
);


create table "public"."homeoffice_sessions" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "start_time" timestamp with time zone not null default now(),
    "end_time" timestamp with time zone,
    "created_at" timestamp with time zone default now()
);


create table "public"."roles" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null
);


create table "public"."user_roles" (
    "user_id" uuid not null,
    "role_id" uuid not null
);


CREATE UNIQUE INDEX employees_email_key ON public.employees USING btree (email);

CREATE UNIQUE INDEX employees_pkey ON public.employees USING btree (id);

CREATE UNIQUE INDEX homeoffice_sessions_pkey ON public.homeoffice_sessions USING btree (id);

CREATE UNIQUE INDEX roles_name_key ON public.roles USING btree (name);

CREATE UNIQUE INDEX roles_pkey ON public.roles USING btree (id);

CREATE UNIQUE INDEX user_roles_pkey ON public.user_roles USING btree (user_id, role_id);

alter table "public"."employees" add constraint "employees_pkey" PRIMARY KEY using index "employees_pkey";

alter table "public"."homeoffice_sessions" add constraint "homeoffice_sessions_pkey" PRIMARY KEY using index "homeoffice_sessions_pkey";

alter table "public"."roles" add constraint "roles_pkey" PRIMARY KEY using index "roles_pkey";

alter table "public"."user_roles" add constraint "user_roles_pkey" PRIMARY KEY using index "user_roles_pkey";

alter table "public"."employees" add constraint "employees_email_key" UNIQUE using index "employees_email_key";

alter table "public"."homeoffice_sessions" add constraint "homeoffice_sessions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES employees(id) ON DELETE CASCADE not valid;

alter table "public"."homeoffice_sessions" validate constraint "homeoffice_sessions_user_id_fkey";

alter table "public"."roles" add constraint "roles_name_key" UNIQUE using index "roles_name_key";

alter table "public"."user_roles" add constraint "user_roles_role_id_fkey" FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE not valid;

alter table "public"."user_roles" validate constraint "user_roles_role_id_fkey";

alter table "public"."user_roles" add constraint "user_roles_user_id_fkey" FOREIGN KEY (user_id) REFERENCES employees(id) ON DELETE CASCADE not valid;

alter table "public"."user_roles" validate constraint "user_roles_user_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  insert into employees (id, email)
  values (new.id, new.email);
  return new;
end;
$function$
;

grant delete on table "public"."employees" to "anon";

grant insert on table "public"."employees" to "anon";

grant references on table "public"."employees" to "anon";

grant select on table "public"."employees" to "anon";

grant trigger on table "public"."employees" to "anon";

grant truncate on table "public"."employees" to "anon";

grant update on table "public"."employees" to "anon";

grant delete on table "public"."employees" to "authenticated";

grant insert on table "public"."employees" to "authenticated";

grant references on table "public"."employees" to "authenticated";

grant select on table "public"."employees" to "authenticated";

grant trigger on table "public"."employees" to "authenticated";

grant truncate on table "public"."employees" to "authenticated";

grant update on table "public"."employees" to "authenticated";

grant delete on table "public"."employees" to "service_role";

grant insert on table "public"."employees" to "service_role";

grant references on table "public"."employees" to "service_role";

grant select on table "public"."employees" to "service_role";

grant trigger on table "public"."employees" to "service_role";

grant truncate on table "public"."employees" to "service_role";

grant update on table "public"."employees" to "service_role";

grant delete on table "public"."homeoffice_sessions" to "anon";

grant insert on table "public"."homeoffice_sessions" to "anon";

grant references on table "public"."homeoffice_sessions" to "anon";

grant select on table "public"."homeoffice_sessions" to "anon";

grant trigger on table "public"."homeoffice_sessions" to "anon";

grant truncate on table "public"."homeoffice_sessions" to "anon";

grant update on table "public"."homeoffice_sessions" to "anon";

grant delete on table "public"."homeoffice_sessions" to "authenticated";

grant insert on table "public"."homeoffice_sessions" to "authenticated";

grant references on table "public"."homeoffice_sessions" to "authenticated";

grant select on table "public"."homeoffice_sessions" to "authenticated";

grant trigger on table "public"."homeoffice_sessions" to "authenticated";

grant truncate on table "public"."homeoffice_sessions" to "authenticated";

grant update on table "public"."homeoffice_sessions" to "authenticated";

grant delete on table "public"."homeoffice_sessions" to "service_role";

grant insert on table "public"."homeoffice_sessions" to "service_role";

grant references on table "public"."homeoffice_sessions" to "service_role";

grant select on table "public"."homeoffice_sessions" to "service_role";

grant trigger on table "public"."homeoffice_sessions" to "service_role";

grant truncate on table "public"."homeoffice_sessions" to "service_role";

grant update on table "public"."homeoffice_sessions" to "service_role";

grant delete on table "public"."roles" to "anon";

grant insert on table "public"."roles" to "anon";

grant references on table "public"."roles" to "anon";

grant select on table "public"."roles" to "anon";

grant trigger on table "public"."roles" to "anon";

grant truncate on table "public"."roles" to "anon";

grant update on table "public"."roles" to "anon";

grant delete on table "public"."roles" to "authenticated";

grant insert on table "public"."roles" to "authenticated";

grant references on table "public"."roles" to "authenticated";

grant select on table "public"."roles" to "authenticated";

grant trigger on table "public"."roles" to "authenticated";

grant truncate on table "public"."roles" to "authenticated";

grant update on table "public"."roles" to "authenticated";

grant delete on table "public"."roles" to "service_role";

grant insert on table "public"."roles" to "service_role";

grant references on table "public"."roles" to "service_role";

grant select on table "public"."roles" to "service_role";

grant trigger on table "public"."roles" to "service_role";

grant truncate on table "public"."roles" to "service_role";

grant update on table "public"."roles" to "service_role";

grant delete on table "public"."user_roles" to "anon";

grant insert on table "public"."user_roles" to "anon";

grant references on table "public"."user_roles" to "anon";

grant select on table "public"."user_roles" to "anon";

grant trigger on table "public"."user_roles" to "anon";

grant truncate on table "public"."user_roles" to "anon";

grant update on table "public"."user_roles" to "anon";

grant delete on table "public"."user_roles" to "authenticated";

grant insert on table "public"."user_roles" to "authenticated";

grant references on table "public"."user_roles" to "authenticated";

grant select on table "public"."user_roles" to "authenticated";

grant trigger on table "public"."user_roles" to "authenticated";

grant truncate on table "public"."user_roles" to "authenticated";

grant update on table "public"."user_roles" to "authenticated";

grant delete on table "public"."user_roles" to "service_role";

grant insert on table "public"."user_roles" to "service_role";

grant references on table "public"."user_roles" to "service_role";

grant select on table "public"."user_roles" to "service_role";

grant trigger on table "public"."user_roles" to "service_role";

grant truncate on table "public"."user_roles" to "service_role";

grant update on table "public"."user_roles" to "service_role";


