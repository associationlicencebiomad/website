<script lang="ts">
	import type {PageData} from './$types';
	import type {Professor, Ranking} from "src/types/database/Ranking.type";
	import RankingCard from "$lib/components/RankingCard/RankingCard.svelte";
	import SavePopup from "$lib/components/SavePopup/SavePopup.svelte";
	import {supabaseClient} from "$lib/supabase-client";
	import DragDropBox from "$lib/components/DragDropBox/DragDropBox.svelte";

	export let data: PageData;

	let user_ranking: Ranking[] = [...data.user_ranking];
	let available_professor: Professor[] = [...data.available_professor];

	let edited;
	let saving = false;

	$: edited = JSON.stringify(user_ranking) !== JSON.stringify(data.user_ranking), user_ranking;

	let hovering = null;

	const drop = (event, target) => {
		event.dataTransfer.dropEffect = 'move';

		const data = JSON.parse(event.dataTransfer.getData("text/plain"));
		const newTracklist = user_ranking


		const data_index = newTracklist.findIndex((item) => item.id === data.id);
		if (data_index === -1) {
			// insert at the target
			newTracklist.splice(target, 0, data);
			available_professor = available_professor.filter((item) => item.id !== data.id);
		} else {
			// move to target
			newTracklist.splice(target, 0, newTracklist.splice(data_index, 1)[0]);
		}

		user_ranking = newTracklist
		hovering = null
	}

	const dragstart = (event, data) => {
		event.dataTransfer.effectAllowed = 'move';
		event.dataTransfer.dropEffect = 'move';
		event.dataTransfer.setData('text/plain', JSON.stringify(data));
	}

	const removeFromRanking = (event) => {
		const data = JSON.parse(event.dataTransfer.getData("text/plain"));

		user_ranking = [...user_ranking.filter((item) => item.id !== data.id)];
		if (!available_professor.find((item) => item.id === data.id)) {
			available_professor = [...available_professor, data];
		}

	}

	async function save() {
		saving = true;
		try {
			const {error} = await supabaseClient
				.from<Ranking>('professors_ranking')
				.upsert([
					...user_ranking.map((item, index) => ({
						professor_id: item.id,
						user_id: data.session.user.id,
						ranking: index + 1
					}))
				], {
					onConflict: 'professor_id,user_id',
				});

			await supabaseClient.from<Ranking>('professors_ranking').delete().eq('user_id', data.session.user.id).not('professor_id', 'in', `(${user_ranking.map((item) => item.id).join(',')})`)

			data.user_ranking = [...user_ranking];
			data.available_professor = [...available_professor];


			if (error) throw error;
		} catch (err) {
			console.error(err);
		} finally {
			saving = false;
		}
	}
</script>

{#if edited}
	<SavePopup {saving} onSave={save}
			   onReset={async () => {
				user_ranking = [...data.user_ranking];
				available_professor = [...data.available_professor];
			}}/>
{/if}

<div class="editor">
	<div class="user_ranking">
		{#if !user_ranking.length}
			<DragDropBox
					on:drop={event => {drop(event, 0)}}
					ondragover="return false"
					on:dragleave={() => hovering = null}
					on:dragenter={() => hovering = -1} isActive={hovering === -1}/>
		{/if}

		{#each user_ranking as ranking, index}

			<RankingCard overflow={true} professor={ranking} index={index + 1}
						 data-index={index}
						 data-id={ranking.id}
						 draggable="true"
						 on:dragstart={event => dragstart(event, ranking)}
						 on:drop={event => {event.preventDefault(); drop(event, index)}}
						 ondragover="return false"
						 on:dragleave={() => hovering = null}
						 on:dragenter={() => hovering = index} isActive={hovering === index}
			/>
		{/each}

	</div>

	<div class="available_professor" on:drop={event => {event.preventDefault(); removeFromRanking(event)}}
		 ondragover="return false">
		<h2>{available_professor.length} professeurs non classé</h2>
		<div class="list">
			{#each available_professor as professor, index}
				<RankingCard professor={professor} data-index={index}
							 data-id={professor.id}
							 draggable="true"
							 on:dragstart={event => dragstart(event, professor)}
							 ondragover="hovering = null"/>
			{/each}
		</div>
	</div>

</div>


<style lang="scss">
  @use "src/scss/colors";

  .user_ranking {
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 15px;
    overflow: scroll;
    max-height: 100%;

    padding-top: 10px;
  }

  .available_professor {
    height: 100%;
    width: 100%;
    margin: 24px auto;
    padding: 12px;
    border-radius: 10px;
    background-color: colors.$black-1;
    overflow: scroll;

    .list {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 15px;
    }
  }

  .editor {
    height: 70vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 24px;
    gap: 24px;
    align-items: center;
  }

  h2 {
    font-size: 24px;
    text-align: center;
    margin-bottom: 12px;

  }
</style>
