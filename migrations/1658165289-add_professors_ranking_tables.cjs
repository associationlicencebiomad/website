exports.up = async client => {
	await client`
        create table public.professors
        (
            id        serial primary key,
            full_name text   not null,
            image_url text,
            courses   text[] not null
        );
	`

	await client`
        create table public.professors_ranking
        (
            id           serial primary key,
            professor_id int references public.professors (id) on delete cascade not null,
            user_id      uuid references public.profiles (id) on delete cascade  not null,
            ranking      numeric                                                 not null
        );
	`

	// await client`
	//     create table public.courses
	//     (
	//         id    serial primary key,
	//         name  text not null,
	//         uri   text not null,
	//         color text not null
	//     );
	// `

	// await client`
	//     create table public.courses_professors
	//     (
	//         id           serial primary key,
	//         course_id    int references public.courses (id) on delete cascade    not null,
	//         professor_id int references public.professors (id) on delete cascade not null
	//     );
	// `

	await client`
		create or replace function get_professors_ranking (
			param_user_id uuid default null
		  ) 
			   returns table (
					id int,
					full_name text,
					image_url text,
					courses text[],
					ranking numeric
			   ) 
			   language plpgsql
		  as $$
		  begin
		  
			   if param_user_id is NULL then
					return query
						 select
							  public.professors_ranking.professor_id as id,
							  public.professors.full_name,
							  public.professors.image_url,
							  public.professors.courses,
							  ((sum(public.professors_ranking.ranking)/(count(public.professors_ranking.ranking) * 1.0)) * ((select count(*) from public.profiles)/ (count(public.professors_ranking.ranking) * 1.0))) as ranking
						 from public.professors_ranking
						 inner join public.professors on public.professors_ranking.professor_id = public.professors.id
						 GROUP BY public.professors.full_name, public.professors.image_url, public.professors_ranking.professor_id, public.professors.courses
						 order by ranking ASC;
		  
			   else
					return query 
						 select
							  public.professors_ranking.professor_id as id,
							  public.professors.full_name,
							  public.professors.image_url,
							  public.professors.courses,
							  public.professors_ranking.ranking
						 from public.professors_ranking inner join public.professors on public.professors_ranking.professor_id = public.professors.id
						 where public.professors_ranking.user_id = param_user_id 
						 order by ranking ASC;
			   END if;
		  end;$$;
	`
};

exports.down = async client => {
	// await client`
	//     drop table public.courses_professors;
	// `
	//
	// await client`
	//     drop table public.courses;
	// `

	await client`
        drop table public.professors_ranking;
	`

	await client`
        drop table public.professors;
	`

	await client`
		drop function get_professors_ranking;
	`
};
