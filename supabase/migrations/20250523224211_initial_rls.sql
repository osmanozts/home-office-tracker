alter table "public"."employees" enable row level security;

alter table "public"."homeoffice_sessions" enable row level security;

alter table "public"."roles" enable row level security;

alter table "public"."user_roles" enable row level security;

create policy "Enable actions for authenticated users only"
on "public"."employees"
as permissive
for all
to authenticated
using (true)
with check (true);


create policy "Enable action for authenticated users"
on "public"."homeoffice_sessions"
as permissive
for all
to authenticated
using (true)
with check (true);


create policy "Enable action for authenticated users"
on "public"."roles"
as permissive
for all
to public
using (true)
with check (true);


create policy "Enable action for authenticated users"
on "public"."user_roles"
as permissive
for all
to authenticated
using (true)
with check (true);



