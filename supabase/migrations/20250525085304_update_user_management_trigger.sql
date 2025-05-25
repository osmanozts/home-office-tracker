drop function if exists "public"."handle_new_auth_user"();

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
  insert into public.employees (id, email)
  values (new.id, new.email);
  return new;
end;
$function$
;


